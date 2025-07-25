/**
 * @module
 *
 * Библиотека для взаимодействия с [API Т-Кассы](https://www.tbank.ru/kassa/dev/payments/index.html).
 */

import { type KeyObject, createPublicKey } from "node:crypto";
import type { paths } from "./api-types";
import type { UpdateFilter } from "./filters";
import {
	type GetRequestBody,
	type GetResponse,
	type MaybePromise,
	type Modify,
	type RequestOptions,
	type RequiredFields,
	type SoftServers,
	type WebhookBody,
	generateSignature,
	servers,
} from "./utils";

/**
 * Фильтры
 */
export * as filters from "./filters";
export * from "./webhook";
export * from "./utils";
/**
 * Параметры для настройки поведения {@link TKassa}
 */
export interface TKassaOptions {
	/**
	 * Сервер, куда будут отправляться запросы.
	 *
	 * * `https://securepay.tinkoff.ru` - продакшн
	 * * `https://rest-api-test.tinkoff.ru` - тестовая среда
	 *
	 * @default "https://securepay.tinkoff.ru"
	 */
	server?: SoftServers;

	x509Key?: string;

	requestOptions?: RequestOptions;
}

/**
 * Главный класс библиотеки.
 *
 * @example
 * ```ts
 * const ткасса = new TKassa(process.env.TERMINAL_KEY, process.env.PASSWORD, {
 *     server: "https://rest-api-test.tinkoff.ru",
 * });
 *
 * const result = await ткасса.init({
 *     Amount: 1000,
 *     OrderId: "12",
 * });
 * ```
 */
export class TKassa<
	TerminalKey extends string = "",
	EventInject extends { Password: string; custom?: any } = never,
> {
	terminalKey!: TerminalKey extends "" ? string | undefined : string;
	password!: TerminalKey extends "" ? string | undefined : string;
	publicKey?: KeyObject;
	options: TKassaOptions & { server: NonNullable<TKassaOptions["server"]> };

	private inject:
		| ((body: WebhookBody) => MaybePromise<EventInject>)
		| undefined;
	private listeners: ((context: WebhookBody, custom: any) => unknown)[] = [];

	constructor(options?: TKassaOptions);
	constructor(
		inject?: (body: WebhookBody) => MaybePromise<EventInject>,
		options?: TKassaOptions,
	);
	constructor(
		// https://github.com/microsoft/TypeScript/issues/27594#issuecomment-2226888043 использую дженерик тут ибо TypeScript не умеет в ReturnType у конструкторов
		terminalKey: TerminalKey,
		password: string,
		options?: TKassaOptions,
	);

	/** Создание инстанса Т-Кассы */
	constructor(
		terminalKeyOrOptionsOrInject?:
			| string
			| TKassaOptions
			| ((body: WebhookBody) => MaybePromise<EventInject>),
		passwordOrOptions?: string | TKassaOptions,
		kassaOptions?: TKassaOptions,
	) {
		const options =
			typeof terminalKeyOrOptionsOrInject === "object"
				? terminalKeyOrOptionsOrInject
				: typeof passwordOrOptions === "object"
					? passwordOrOptions
					: kassaOptions;

		if (
			typeof terminalKeyOrOptionsOrInject === "string" &&
			typeof passwordOrOptions === "string"
		) {
			this.terminalKey = terminalKeyOrOptionsOrInject;
			this.password = passwordOrOptions;
		}

		if (typeof terminalKeyOrOptionsOrInject === "function")
			this.inject = terminalKeyOrOptionsOrInject;
		if (options?.x509Key)
			this.publicKey = createPublicKey(
				`-----BEGIN PUBLIC KEY-----\n${options.x509Key}\n-----END PUBLIC KEY-----`,
			);

		this.options = {
			server: servers[0].url,
			...options,
		};
	}

	private async request<T>(
		path: string,
		data?: TerminalKey extends ""
			? { [key: string]: unknown; TerminalKey: string; Password: string }
			: Record<string, unknown>,
		// method: "POST" | "GET" = "POST",
		options?: RequestOptions,
	): Promise<T> {
		const requestOptions: RequiredFields<RequestOptions, "headers"> = {
			method: "POST",
			mimeType: "json",
			...this.options.requestOptions,
			...options,
			headers: {
				"user-agent":
					"T-Kassa SDK for Node.js (https://github.com/kravetsone/t-kassa-api)",
				...this.options.requestOptions?.headers,
				...options?.headers,
			},
		};
		if (requestOptions.method === "POST" && data) {
			const terminalKey =
				typeof data.TerminalKey === "string"
					? data.TerminalKey
					: this.terminalKey;
			const password =
				typeof data.Password === "string" ? data.Password : this.password;

			if (!terminalKey || !password)
				throw new Error(
					`Не указан пароль или ключ терминала. Значения: TerminalKey = ${terminalKey}, Password = ${password}`,
				);

			const signature = generateSignature(data, terminalKey, password);
			requestOptions.headers["content-type"] =
				`application/${requestOptions.mimeType}`;

			requestOptions.body =
				requestOptions.mimeType === "json"
					? JSON.stringify({
							...data,
							Password: undefined,
							Token: signature,
							TerminalKey: terminalKey,
						})
					: new URLSearchParams({
							...data,
							// @ts-expect-error
							Password: undefined,
							Token: signature,
							TerminalKey: terminalKey,
						});
		}
		requestOptions.mimeType = undefined;
		const response = await fetch(this.options.server + path, requestOptions);

		if (!response.ok) {
			if (response.status === 403 && this.options.server === servers[1].url)
				throw new Error(
					"Вы используете тестовую среду, но ваш IP не добавлен в список разрешенных (подробнее - https://www.tbank.ru/kassa/dev/payments/#tag/Testovye-karty )",
				);

			throw new Error(`${response.status} ${await response.text()}`);
		}

		return response.json() as T;
	}
	/**
	 * Слушатель webhook события (нотификации)
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Notifikacii-Merchanta-ob-operaciyah)
	 * */
	on(
		handler: (context: WebhookBody, custom: EventInject["custom"]) => unknown,
	): this;
	/**
	 * Слушатель webhook события (нотификации)
	 *
	 * @example
	 * ```ts
	 * ткасса.on(
	 *     filters.and(
	 *         filters.equal("Status", "SUCCESS"),
	 *         filters.notNullable("RebillId")
	 *     ),
	 *     (context) => {
	 *         // при этом типы понимают фильтры
	 *     }
	 * );
	 * ```
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Notifikacii-Merchanta-ob-operaciyah)
	 */
	on<const Filter extends UpdateFilter<any>>(
		filters: Filter,
		handler: (
			context: Modify<
				WebhookBody,
				Filter extends UpdateFilter<infer Mod> ? Mod : never
			>,
			custom: EventInject["custom"],
		) => unknown,
	): this;

	on<const Filter extends UpdateFilter<any>>(
		filtersOrHandler:
			| Filter
			| ((
					context: Modify<
						WebhookBody,
						Filter extends UpdateFilter<infer Mod> ? Mod : never
					>,
					custom: EventInject["custom"],
			  ) => unknown),
		handler?: (
			context: Modify<
				WebhookBody,
				Filter extends UpdateFilter<infer Mod> ? Mod : never
			>,
			custom: EventInject["custom"],
		) => unknown,
	) {
		if (!this.inject && !this.password)
			throw new Error(
				"Чтобы принимать нотификацию вам необходимо добавить функцию первым аргументов конструктора (читайте README)",
			);

		if (!handler && typeof filtersOrHandler === "function")
			// @ts-expect-error
			this.listeners.push(handler);

		if (typeof handler === "function" && typeof filtersOrHandler === "function")
			this.listeners.push(async (context, custom) => {
				// @ts-expect-error
				if ((await filtersOrHandler(context)) === true)
					// @ts-expect-error
					return handler(context, custom);
			});

		return this;
	}

	/**
	 * Рассказать о пришедшем событии
	 */
	async emit(data: WebhookBody) {
		const terminalKey = this.terminalKey || data.TerminalKey;
		if (!terminalKey)
			throw Error("Ключ терминала не передан. Нотификация невозможна");

		const { Password, custom } = this.inject
			? await this.inject(data)
			: { Password: this.password, custom: undefined };

		if (!Password)
			throw new Error(
				"Чтобы принимать нотификацию вам необходимо добавить функцию первым аргументов конструктора (читайте README)",
			);

		const signature = generateSignature(data, terminalKey, Password);
		if (signature !== data.Token) throw Error("Токены не равны");

		for (const run of this.listeners) {
			await run(data, custom);
		}
	}

	/** @generated start-generate-methods */
	/**
	 * Метод инициирует платежную сессию.
	 *
	 *
	 * @tags Стандартный платеж, Методы использующиеся в webview
	 * @summary Инициировать платеж
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/Init)
	 */
	init(
		body: GetRequestBody<"/v2/Init", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/Init", "post">> {
		return this.request("/v2/Init", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 *  <br><br> Метод возвращает версию протокола 3DS, по которому может аутентифицироваться карта.
	 *
	 *  При определении 3DS v2.1 возможно получение данных для прохождения дополнительного метода [3DS Method](#tag\/Standartnyj-platezh\/operation\/3DSMethod). Он позволяет эмитенту собрать данные браузера клиента, что может быть полезно при принятии решения в пользу Frictionless Flow (аутентификация клиента без редиректа на страницу ACS).
	 *
	 *
	 * @tags Стандартный платеж
	 * @summary Проверить версию 3DS
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/Check3dsVersion)
	 */
	check3dsVersion(
		body: GetRequestBody<"/v2/Check3dsVersion", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/Check3dsVersion", "post">> {
		return this.request("/v2/Check3dsVersion", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 *
	 * <br>Метод используется для сбора информации ACS-ом о девайсе. Обязателен, если для 3DSv2.1 в ответе метода [Check3dsVersion](#tag\/Standartnyj-platezh\/operation\/Check3dsVersion) был получен параметр `ThreeDSMethodURL`.<br><br>Условия выполнения:<br>• В скрытом iframe на стороне браузера<br>• С таймаутом ожидания ответа на запрос - 10 секунд"
	 *
	 *
	 * @tags Стандартный платеж
	 * @summary Прохождение этапа “3DS Method”
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/3DSMethod)
	 */
	threeDSMethod(
		body: GetRequestBody<
			"/v2/3DSMethod",
			"post",
			TerminalKey,
			"application/x-www-form-urlencoded"
		>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/3DSMethod", "post">> {
		return this.request("/v2/3DSMethod", body as any, {
			method: "POST",
			mimeType: "x-www-form-urlencoded",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 * <br><br> Метод подтверждает платеж передачей реквизитов. При одностадийной оплате — списывает средства
	 * с карты клиента, при двухстадийной — блокирует указанную сумму. Используется, если у площадки есть сертификация PCI DSS и
	 * собственная платежная форма.
	 *
	 *
	 * @tags Стандартный платеж
	 * @summary Подтвердить платеж
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/FinishAuthorize)
	 */
	finishAuthorize(
		body: GetRequestBody<"/v2/FinishAuthorize", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/FinishAuthorize", "post">> {
		return this.request("/v2/FinishAuthorize", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * <br><br> Метод инициирует привязку карты к клиенту.
	 * При успешной привязке переадресует клиента на `Success Add Card URL`,
	 * при неуспешной — на `Fail Add Card URL`.
	 * Можно использовать форму Т‑Бизнес или заменить ее на кастомную.
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Инициировать привязку карты к клиенту
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-kartami/operation/AddCard)
	 */
	addCard(
		body: GetRequestBody<"/v2/AddCard", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/AddCard", "post">> {
		return this.request("/v2/AddCard", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 *
	 *  <br> Завершает привязку карты к клиенту.
	 *  В случае успешной привязки переадресует клиента на **Success Add Card URL**
	 *  в противном случае на **Fail Add Card URL**.
	 *  Для прохождения 3DS второй версии перед вызовом метода должен быть вызван [Check3dsVersion](#tag\/Standartnyj-platezh\/operation\/Check3dsVersion)
	 *  и выполнен [3DS Method](#tag\/Standartnyj-platezh\/operation\/3DSMethod), который является обязательным при прохождении 3DS по протоколу версии
	 *  2.0.
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Привязать карту
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-kartami/operation/AttachCard)
	 */
	attachCard(
		body: GetRequestBody<"/v2/AttachCard", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/AttachCard", "post">> {
		return this.request("/v2/AttachCard", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 *
	 * <br>`ACSUrl` возвращается в ответе метода [FinishAuthorize](#tag\/Standartnyj-platezh\/operation\/FinishAuthorize).<br>Если в ответе метода [FinishAuthorize](#tag\/Standartnyj-platezh\/operation\/FinishAuthorize) возвращается статус `3DS_CHECKING`, то мерчанту необходимо сформировать запрос на URL ACS банка, выпустившего карту (параметр `ACSUrl`).<br>
	 * **Для 3DS v2.1**: Компонент ACS использует пары сообщений `CReq` и `CRes` для выполнения проверки (Challenge). В ответ на полученное сообщение `CReq` компонент ACS формирует сообщение `CRes`, которое запрашивает держателя карты ввести данные для аутентификации. <br> <br> **Формат ответа:** `Cres`, полученный по `NotificationUrl` из запроса [FinishAuthorize](#tag\/Standartnyj-platezh\/operation\/FinishAuthorize). <br>
	 * При успешном результате прохождения 3-D Secure подтверждается инициированный платеж с помощью методов [Submit3DSAuthorization](#tag\/Prohozhdenie-3DS\/operation\/Submit3DSAuthorization) или [Submit3DSAuthorizationV2](#tag\/Prohozhdenie-3DS\/operation\/Submit3DSAuthorizationV2) в зависимости от версии 3DS<br>
	 * **URL**: `ACSUrl` (возвращается в ответе метода [FinishAuthorize](#tag\/Standartnyj-platezh\/operation\/FinishAuthorize)).
	 *
	 *
	 * @tags Стандартный платеж, Методы работы с картами
	 * @summary Запрос в банк-эмитент для прохождения 3DS
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/ACSUrl)
	 */
	aCSUrl(
		body: GetRequestBody<
			"/v2/ACSUrl",
			"post",
			TerminalKey,
			"application/x-www-form-urlencoded"
		>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/ACSUrl", "post">> {
		return this.request("/v2/ACSUrl", body as any, {
			method: "POST",
			mimeType: "x-www-form-urlencoded",
			...options,
		});
	}
	/**
	 * Метод для списания заблокированных денежных средств. Используется при двухстадийном проведении платежа. Применим
	 * только к платежам в статусе `AUTHORIZED`. Статус транзакции перед разблокировкой
	 * — `CONFIRMING`. Сумма списания может быть меньше или равна сумме авторизации.
	 *
	 *
	 * [Подробнее про двухстадийный платеж](https:\/\/www.tbank.ru\/kassa\/dev\/payments\/#tag\/Scenarii-oplaty-po-karte\/Scenarii-platezha)
	 *
	 *
	 * @tags Двухстадийный платеж
	 * @summary Подтвердить платеж
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Dvuhstadijnyj-platezh/operation/Confirm)
	 */
	confirm(
		body: GetRequestBody<"/v2/Confirm", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/Confirm", "post">> {
		return this.request("/v2/Confirm", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Отменяет платежную сессию. В зависимости от статуса платежа, переводит его в следующие состояния:
	 * * `NEW` — `CANCELED`;
	 * * `AUTHORIZED` — `PARTIAL_REVERSED`, если отмена не на полную сумму;
	 * * `AUTHORIZED` — `REVERSED`, если отмена на полную сумму;
	 * * `CONFIRMED` — `PARTIAL_REFUNDED`, если возврат не на полную сумму;
	 * * `CONFIRMED` — `REFUNDED`, если возврат на полную сумму.
	 *
	 * При оплате в рассрочку платеж можно отменить только в статусе `AUTHORIZED`.
	 * При оплате «Долями» делается частичный или полный возврат, если операция в статусе `CONFIRMED` или `PARTIAL_REFUNDED`.
	 *
	 * Если платеж находился в статусе `AUTHORIZED`, холдирование средств на карте
	 * клиента отменяется. При переходе из статуса `CONFIRMED` денежные средства возвращаются на карту клиента.
	 *
	 *
	 * @tags Отмена платежа
	 * @summary Отменить платеж
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Otmena-platezha/operation/Cancel)
	 */
	cancel(
		body: GetRequestBody<"/v2/Cancel", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/Cancel", "post">> {
		return this.request("/v2/Cancel", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * ## Схема проведения рекуррентного платежа
	 *
	 * Метод проводит рекуррентный (повторный) платеж — безакцептное списание денежных средств со счета банковской карты клиента.
	 * Чтобы его использовать, клиент должен совершить хотя бы один платеж в пользу мерчанта, который должен быть указан как рекуррентный
	 * (параметр `Recurrent` методе **Init**), но фактически являющийся первичным.
	 *
	 * После завершения оплаты в уведомлении на `AUTHORIZED` или `CONFIRMED` будет передан параметр `RebillId`.
	 *
	 * В дальнейшем для проведения рекуррентного платежа мерчант должен вызвать метод **Init**, указать нужную сумму для списания
	 * в параметре `Amount`, а затем без переадресации на `PaymentURL` вызвать метод **Charge** для оплаты по тем же реквизитам
	 * и передать параметр `RebillId`, полученный при совершении первичного платежа.
	 *
	 * Метод **Charge** работает по одностадийной и двухстадийной схеме оплаты. Чтобы перейти на двухстадийную схему, нужно
	 * переключить терминал в [личном кабинете](https:\/\/business.tbank.ru\/oplata\/main) и написать на <acq_help@tbank.ru> с просьбой переключить схему рекуррентов.
	 *
	 * >По умолчанию метод **Charge** отключен. Чтобы его включить:
	 * >- на DEMO-терминале — напишите на <acq_help@tbank.ru>;
	 * >- на боевом терминале — обратитесь к своему персональному менеджеру.
	 *
	 * При проведении рекуррентного платежа учитывайте взаимосвязь атрибута `RebillId` метода **Charge**:
	 * * Со значениями атрибутов `OperationInitiatorType` и `Recurrent` метода **Init**;
	 * * С типом терминала, который используется для проведения операций — ECOM или AFT.
	 *
	 * Допустимые сценарии взаимосвязи:
	 *
	 * |CIT\/MIT|Тип операции|`OperationInitiator` в **Init**|`RebillId` в **Charge**|`Recurrent` в **Init**| AFT-терминал | ECOM-терминал |
	 * |---|---|---|---|---|--------------|---------------|
	 * |CIT|Credential-Not-Captured|0|null|N| Разрешено    | Разрешено     |
	 * |CIT|Credential-Captured|1|null|Y| Разрешено    | Разрешено     |
	 * |CIT|Credential-on-File|2|not null|N| Запрещено    | Разрешено     |
	 * |MIT|Credential-on-File, Recurring|R|not null|N| Запрещено    | Разрешено     |
	 * |MIT|Credential-on-File, Installment|I|not null|N| Разрешено    | Запрещено     |
	 *
	 * Если передавать значения атрибутов, которые не соответствуют значениям в таблице, MAPI вернет ошибку `1126` —
	 * несопоставимые значения `RebillId` или `Recurrent` с переданным значением `OperationInitiatorType`.
	 *
	 * ## Одностадийная оплата
	 *
	 * 1. Проведите родительский платеж через метод **Init** с указанием дополнительных параметров `Recurrent=Y` и `CustomerKey`.
	 * 2. Только для `мерчантов без PCI DSS` — переадресуйте клиента на `PaymentUrl`.
	 * 3. После того как клиент оплатит заказ, в уведомлении о статусе `AUTHORIZED` или `CONFIRMED` будет передан параметр `RebillId`.
	 * Сохраните его.
	 * 4. Через некоторое время для выполнения рекуррентного платежа вызовите метод **Init** со стандартными параметрами —
	 * параметры `Recurrent` и `CustomerKey` в этом случае не нужны. Вернется параметр `PaymentId` — сохраните его.
	 * 5. Вызовите метод **Charge** с параметром `RebillId` из пункта 3 и `PaymentId` из пункта 4.
	 * При успешном сценарии операция перейдет в статус `CONFIRMED`.
	 *
	 *
	 * ## Двухстадийная оплата
	 *
	 * 1. Проведите родительский платеж через метод **Init** с указанием дополнительных параметров `Recurrent=Y` и `CustomerKey`.
	 * 2. Только для `мерчантов без PCI DSS` — переадресуйте клиента на `PaymentUrl`.
	 * 3. После того как клиент оплатит заказ, в уведомлении о статусе `AUTHORIZED` или `CONFIRMED` будет передан параметр `RebillId`.
	 * Сохраните его.
	 * 4. Через некоторое время для выполнения рекуррентного платежа вызовите метод **Init** со стандартными параметрами —
	 * параметры `Recurrent` и `CustomerKey` в этом случае не нужны. Вернется параметр `PaymentId` — сохраните его.
	 * 5. Вызовите метод **Charge** с параметром `RebillId` из пункта 3 и `PaymentId` из пункта 4.
	 * 6. Вызовите метод **Confirm** для подтверждения платежа.
	 *
	 *
	 * @tags Рекуррентный платеж
	 * @summary Автоплатеж
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Rekurrentnyj-platezh/operation/ChargePCI)
	 */
	chargePCI(
		body: GetRequestBody<"/v2/Charge", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/Charge", "post">> {
		return this.request("/v2/Charge", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод возвращает статус платежа.
	 *
	 *
	 * @tags Стандартный платеж, Методы использующиеся в webview
	 * @summary Получить статуса платежа
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/GetState)
	 */
	getState(
		body: GetRequestBody<"/v2/GetState", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetState", "post">> {
		return this.request("/v2/GetState", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Регистрирует клиента в связке с терминалом.
	 *
	 * >Можно автоматически связать клиента с картой, которой был произведен платеж, если в методе **Init** передать параметр `CustomerKey`.
	 * Это позволит сохранить и позже показывать клиенту замаскированный номер карты, по которой будет совершен рекуррентный платеж.
	 *
	 *
	 * @tags Методы работы с клиентами
	 * @summary Зарегистрировать клиента
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-klientami/operation/AddCustomer)
	 */
	addCustomer(
		body: GetRequestBody<"/v2/AddCustomer", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/AddCustomer", "post">> {
		return this.request("/v2/AddCustomer", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Возвращает данные клиента, сохраненные в связке с терминалом
	 *
	 *
	 * @tags Методы работы с клиентами
	 * @summary Получить данные клиента
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-klientami/operation/GetCustomer)
	 */
	getCustomer(
		body: GetRequestBody<"/v2/GetCustomer", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetCustomer", "post">> {
		return this.request("/v2/GetCustomer", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод для удаления сохраненных данных клиента.
	 *
	 *
	 * @tags Методы работы с клиентами
	 * @summary Удалить данные клиента
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-klientami/operation/RemoveCustomer)
	 */
	removeCustomer(
		body: GetRequestBody<"/v2/RemoveCustomer", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/RemoveCustomer", "post">> {
		return this.request("/v2/RemoveCustomer", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 *
	 * <br> Метод возвращает статус привязки карты
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Получить статус привязки карты
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-kartami/operation/GetAddCardState)
	 */
	getAddCardState(
		body: GetRequestBody<"/v2/GetAddCardState", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetAddCardState", "post">> {
		return this.request("/v2/GetAddCardState", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Возвращает список всех привязанных карт клиента, включая удаленные
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Получить список карт клиента
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-kartami/operation/GetCardList)
	 */
	getCardList(
		body: GetRequestBody<"/v2/GetCardList", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetCardList", "post">> {
		return this.request("/v2/GetCardList", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод для удаления привязанной карты клиента.
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Удалить привязанную карту клиента
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-kartami/operation/RemoveCard)
	 */
	removeCard(
		body: GetRequestBody<"/v2/RemoveCard", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/RemoveCard", "post">> {
		return this.request("/v2/RemoveCard", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод регистрирует QR и возвращает информацию о нем.
	 * Вызывается после метода **Init**.
	 *
	 *
	 * @tags СБП
	 * @summary Сформировать QR
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/GetQr)
	 */
	getQr(
		body: GetRequestBody<"/v2/GetQr", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetQr", "post">> {
		return this.request("/v2/GetQr", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод для подтверждения карты путем блокировки случайной суммы.
	 *
	 * @tags Методы работы с привязанными картами и клиентами
	 * @summary SubmitRandomAmount
	 * @deprecated
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-privyazannymi-kartami-i-klientami/operation/SubmitRandomAmount)
	 */
	submitRandomAmount(
		body: GetRequestBody<"/v2/SubmitRandomAmount", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/SubmitRandomAmount", "post">> {
		return this.request("/v2/SubmitRandomAmount", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 *
	 *  Проверяет результаты прохождения 3-D Secure и при успешном прохождении
	 *  подтверждает инициированный платеж.
	 *  При использовании:
	 *  - одностадийной оплаты — списывает денежные средства с карты
	 *  клиента;
	 *  - двухстадийной оплаты — блокирует указанную сумму на карте клиента.
	 *
	 *  Формат запроса — `x-www-form-urlencoded`.
	 *
	 *
	 *  После того, как мерчант получит ответ ACS с результатами прохождения 3-D Secure на `TermUrl`, нужно
	 *  отправить запрос через метод **Submit3DSAuthorization**.
	 *
	 *
	 * @tags Прохождение 3DS
	 * @summary Подтвердить прохождение 3DS v1.0
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Prohozhdenie-3DS/operation/Submit3DSAuthorization)
	 */
	submit3DSAuthorization(
		body: GetRequestBody<
			"/v2/Submit3DSAuthorization",
			"post",
			TerminalKey,
			"application/x-www-form-urlencoded"
		>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/Submit3DSAuthorization", "post">> {
		return this.request("/v2/Submit3DSAuthorization", body as any, {
			method: "POST",
			mimeType: "x-www-form-urlencoded",
			...options,
		});
	}
	/**
	 * `Для мерчантов c PCI DSS и собственной платежной формой`
	 *
	 *  Проверяет результаты прохождения 3-D Secure и при успешном прохождении
	 *  подтверждает инициированный платеж.
	 *  При использовании:
	 *  - одностадийной оплаты — списывает денежные средства с карты
	 *  клиента;
	 *  - двухстадийной оплаты — блокирует указанную сумму на карте клиента.
	 *
	 *  Формат запроса — `x-www-form-urlencoded`.
	 *
	 *  После того, как мерчант получит ответ ACS с результатами прохождения 3-D Secure на `cresCallbackUrl`, нужно
	 *  отправить запрос через метод **Submit3DSAuthorizationV2**.
	 *
	 *
	 * @tags Прохождение 3DS
	 * @summary Подтвердить прохождение 3DS v2.1
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Prohozhdenie-3DS/operation/Submit3DSAuthorizationV2)
	 */
	submit3DSAuthorizationV2(
		body: GetRequestBody<
			"/v2/Submit3DSAuthorizationV2",
			"post",
			TerminalKey,
			"application/x-www-form-urlencoded"
		>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/Submit3DSAuthorizationV2", "post">> {
		return this.request("/v2/Submit3DSAuthorizationV2", body as any, {
			method: "POST",
			mimeType: "x-www-form-urlencoded",
			...options,
		});
	}
	/**
	 * Метод для определения возможности проведения платежа T‑Pay на терминале и устройстве.
	 *
	 *
	 * @tags T‑Pay
	 * @summary Определить возможность проведения платежа
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/TPay/operation/Status)
	 */
	status(
		/** Платежный ключ, выдается мерчанту при заведении
   терминала.
    */ TerminalKey: paths["/v2/TinkoffPay/terminals/{TerminalKey}/status"]["get"]["parameters"]["path"]["TerminalKey"],
		options?: RequestOptions,
	): Promise<
		GetResponse<"/v2/TinkoffPay/terminals/{TerminalKey}/status", "get">
	> {
		return this.request(
			`/v2/TinkoffPay/terminals/${TerminalKey}/status`,
			undefined,
			{ method: "GET", ...options },
		);
	}
	/**
	 * Метод получения Link для безусловного редиректа на мобильных устройствах
	 *
	 *
	 * @tags T‑Pay
	 * @summary Получить ссылку
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/TPay/operation/Link)
	 */
	link(
		/** Идентификатор платежа в системе Т‑Бизнес
		 */ paymentId: paths["/v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link"]["get"]["parameters"]["path"]["paymentId"],
		/** Версия T‑Pay, доступная на терминале:
		 * 2.0 (T‑Pay)
		 */ version: paths["/v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link"]["get"]["parameters"]["path"]["version"],
		options?: RequestOptions,
	): Promise<
		GetResponse<
			"/v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link",
			"get"
		>
	> {
		return this.request(
			`/v2/TinkoffPay/transactions/${paymentId}/versions/${version}/link`,
			undefined,
			{ method: "GET", ...options },
		);
	}
	/**
	 * Метод получения QR для десктопов.
	 *
	 *
	 * @tags T‑Pay
	 * @summary Получить QR
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/TPay/operation/QR)
	 */
	qR(
		/** Уникальный идентификатор транзакции в
   системе Т‑Бизнес.
    */ paymentId: paths["/v2/TinkoffPay/{paymentId}/QR"]["get"]["parameters"]["path"]["paymentId"],
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/TinkoffPay/{paymentId}/QR", "get">> {
		return this.request(`/v2/TinkoffPay/${paymentId}/QR`, undefined, {
			method: "GET",
			...options,
		});
	}
	/**
	 * Метод получения QR для десктопов.
	 *
	 *
	 * @tags SberPay
	 * @summary Получить QR
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SberPay/operation/SberPayQR)
	 */
	sberPayQR(
		/** Уникальный идентификатор транзакции в
   системе Т‑Бизнес.
    */ paymentId: paths["/v2/SberPay/{paymentId}/QR"]["get"]["parameters"]["path"]["paymentId"],
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/SberPay/{paymentId}/QR", "get">> {
		return this.request(`/v2/SberPay/${paymentId}/QR`, undefined, {
			method: "GET",
			...options,
		});
	}
	/**
	 * Метод для получения ссылки SberPay.
	 *
	 *
	 * @tags SberPay
	 * @summary Получить ссылку
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SberPay/operation/SberPaylink)
	 */
	sberPaylink(
		/** Уникальный идентификатор транзакции в
   системе Т‑Бизнес.
    */ paymentId: paths["/v2/SberPay/transactions/{paymentId}/link"]["get"]["parameters"]["path"]["paymentId"],
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/SberPay/transactions/{paymentId}/link", "get">> {
		return this.request(
			`/v2/SberPay/transactions/${paymentId}/link`,
			undefined,
			{ method: "GET", ...options },
		);
	}
	/**
	 * Метод возвращает список участников куда может быть осуществлен возврат платежа, совершенного
	 * по QR.
	 *
	 *
	 * @tags СБП
	 * @summary Получить список банков-пользователей QR
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/QrMembersList)
	 */
	qrMembersList(
		body: GetRequestBody<"/v2/QrMembersList", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/QrMembersList", "post">> {
		return this.request("/v2/QrMembersList", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод инициирует привязку счета клиента к магазину
	 * и возвращает информацию о нем
	 *
	 *
	 * @tags СБП
	 * @summary Привязать счёт к магазину
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/AddAccountQr)
	 */
	addAccountQr(
		body: GetRequestBody<"/v2/AddAccountQr", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/AddAccountQr", "post">> {
		return this.request("/v2/AddAccountQr", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод возвращает статус привязки счета клиента по магазину
	 *
	 *
	 * @tags СБП
	 * @summary Получить статус привязки счета к магазину
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/GetAddAccountQrState)
	 */
	getAddAccountQrState(
		body: GetRequestBody<"/v2/GetAddAccountQrState", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetAddAccountQrState", "post">> {
		return this.request("/v2/GetAddAccountQrState", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод возвращает список привязанных счетов клиента по магазину
	 *
	 * @tags СБП
	 * @summary Получить список счетов, привязанных к магазину
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/GetAccountQrList)
	 */
	getAccountQrList(
		body: GetRequestBody<"/v2/GetAccountQrList", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetAccountQrList", "post">> {
		return this.request("/v2/GetAccountQrList", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Проведение платежа по привязанному счету по QR через СБП.
	 * Для возможности его использования клиент должен совершить успешную привязку счета с
	 * помощью метода **AddAccountQr**. После вызова метода будет отправлена нотификация на Notification
	 * URL о привязке счета , в которой будет указан AccountToken.
	 * Для совершения платежа по привязанному счету Мерчант должен вызвать метод **Init**, в котором поля
	 * **Recurrent= Y** и **DATA= {“QR”:“true”}**, а затем вызвать метод **ChargeQr** для оплаты по тем же самым
	 * реквизитам и передать параметр **AccountToken**, полученный после привязки счета по QR в
	 * нотификации.
	 *
	 *
	 * @tags СБП
	 * @summary Автоплатеж по QR
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/ChargeQr)
	 */
	chargeQr(
		body: GetRequestBody<"/v2/ChargeQr", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/ChargeQr", "post">> {
		return this.request("/v2/ChargeQr", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Тестовая платежная сессия с предопределенным статусом по СБП.
	 *
	 * @tags СБП
	 * @summary Создать тестовую платежную сессию
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/SbpPayTest)
	 */
	sbpPayTest(
		body: GetRequestBody<"/v2/SbpPayTest", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/SbpPayTest", "post">> {
		return this.request("/v2/SbpPayTest", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Возвращает статус возврата платежа по СБП
	 *
	 *
	 * @tags СБП
	 * @summary Получить статус возврата
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/SBP/operation/GetQrState)
	 */
	getQrState(
		body: GetRequestBody<"/v2/GetQrState", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetQrState", "post">> {
		return this.request("/v2/GetQrState", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод возвращает статус заказа.
	 *
	 *
	 * @tags Стандартный платеж, Методы использующиеся в webview
	 * @summary Получить статус заказа
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/CheckOrder)
	 */
	checkOrder(
		body: GetRequestBody<"/v2/CheckOrder", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/CheckOrder", "post">> {
		return this.request("/v2/CheckOrder", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод позволяет отправить закрывающий чек в кассу.
	 * Условия работы метода:
	 * - Закрывающий чек может быть отправлен, если платежная сессия по первому чеку находится в
	 *   статусе `CONFIRMED`.
	 * - В платежной сессии был передан объект `Receipt`.
	 * - В объекте `Receipt` был передан хотя бы один объект — `Receipt.Items.PaymentMethod` =
	 *   `full_prepayment`, `prepayment` или `advance`.
	 *
	 *
	 * @tags Методы работы с чеками
	 * @summary Отправить закрывающий чек в кассу
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Metody-raboty-s-chekami/operation/SendClosingReceipt)
	 */
	sendClosingReceipt(
		body: GetRequestBody<"/cashbox/SendClosingReceipt", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/cashbox/SendClosingReceipt", "post">> {
		return this.request("/cashbox/SendClosingReceipt", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Получение deeplink с включенным подписанным JWT-токеном. Предназначен для запроса по API
	 *
	 * @tags MirPay
	 * @summary Получить DeepLink
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/MirPay/operation/GetDeepLink)
	 */
	getDeepLink(
		body: GetRequestBody<"/v2/MirPay/GetDeepLink", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/MirPay/GetDeepLink", "post">> {
		return this.request("/v2/MirPay/GetDeepLink", body as any, {
			method: "POST",
			...options,
		});
	}
	/**
	 * Метод определяет доступность методов оплаты на терминале для SDK и API. Запрос не шифруется токеном
	 *
	 * @tags undefined
	 * @summary Проверить доступность методов на SDK
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag//operation/GetTerminalPayMethods)
	 */
	getTerminalPayMethods(
		body: GetRequestBody<"/v2/GetTerminalPayMethods", "get", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/GetTerminalPayMethods", "get">> {
		return this.request("/v2/GetTerminalPayMethods", body as any, {
			method: "GET",
			...options,
		});
	}
	/**
	 * Справку по конкретной операции можно получить на: <br><ul><li> URL-сервиса, который развернут на вашей стороне в формате `base64`;<\/li><li> электронную почту.<\/li><\/ul> Чтобы сформировать токен, нужно использовать только <code>PASSWORD<\/code> и <code>TERMINAL_KEY<\/code>.
	 *
	 * @tags Стандартный платеж
	 * @summary Получить справку по операции
	 *
	 * [Documentation](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Standartnyj-platezh/operation/GetConfirmOperation)
	 */
	getConfirmOperation(
		body: GetRequestBody<"/v2/getConfirmOperation", "post", TerminalKey>,
		options?: RequestOptions,
	): Promise<GetResponse<"/v2/getConfirmOperation", "post">> {
		return this.request("/v2/getConfirmOperation", body as any, {
			method: "POST",
			...options,
		});
	}
	/** @generated stop-generate-methods */
}
