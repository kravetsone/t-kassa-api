/**
 * @module
 *
 * Библиотека для взаимодействия с [API Т-Кассы](https://www.tbank.ru/kassa/dev/payments/index.html).
 */

import type { paths } from "./api-types";
import type { UpdateFilter } from "./filters";
import {
	type GetRequestBody,
	type GetResponse,
	type Modify,
	type Require,
	type Servers,
	type WebhookBody,
	generateSignature,
} from "./utils";

/**
 * Фильтры
 */
export * as filters from "./filters";
export * from "./webhook";

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
	server?: Servers;
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
export class TKassa {
	terminalKey: string;
	password: string;
	options: Require<TKassaOptions, "server">;

	private listeners: ((context: WebhookBody) => unknown)[] = [];

	/** Создание инстанса Т-Кассы */
	constructor(terminalKey: string, password: string, options?: TKassaOptions) {
		this.terminalKey = terminalKey;
		this.password = password;

		this.options = {
			server: "https://securepay.tinkoff.ru",
			...options,
		};
	}

	private async request<T>(
		url: string,
		data?: Record<string, unknown>,
		method: "POST" | "GET" = "POST",
	) {
		const options: RequestInit & {
			headers: Record<string, string>;
		} = {
			method,
			headers: {
				"user-agent":
					"T-Kassa SDK for Node.js (https://github.com/kravetsone/t-kassa-api)",
			},
		};
		if (method === "POST" && data) {
			const signature = generateSignature(
				data,
				this.terminalKey,
				this.password,
			);
			options.headers["content-type"] = "application/json";
			options.body = JSON.stringify({
				...data,
				Token: signature,
				TerminalKey: this.terminalKey,
			});
		}

		const response = await fetch(this.options.server + url, options);

		if (!response.ok) throw new Error(`error${await response.text()}`);

		return response.json() as T;
	}

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
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	on<const Filter extends UpdateFilter<any>>(
		filters: Filter,
		handler: (
			context: Modify<
				WebhookBody,
				Filter extends UpdateFilter<infer Mod> ? Mod : never
			>,
		) => unknown,
	) {
		this.listeners.push((context) => {
			// @ts-expect-error
			if (filters(context) === true) return handler(context);
		});

		return this;
	}

	/**
	 * Рассказать о пришедшем событии
	 */
	async emit(data: WebhookBody) {
		const signature = generateSignature(data, this.terminalKey, this.password);
		if (signature !== data.Token) throw Error("token mismatch");

		for (const run of this.listeners) {
			await run(data);
		}
	}

	/** @generated start-generate-methods */
	/**
	 * Метод инициирует платежную сессию
	 *
	 *
	 * @tags Стандартный платеж, Оплата через YandexPay
	 * @summary Инициализация платежа
	 *
	 */
	init(body: GetRequestBody<"/v2/Init", "post">) {
		return this.request<GetResponse<"/v2/Init", "post">>(
			"/v2/Init",
			body,
			"POST",
		);
	}
	/**
                       
                        * 
                        * @tags Оплата через T‑Pay, Оплата через СБП
                        * @summary Инициировать платеж в виджете 
   *  
                        */
	initPayments(body: GetRequestBody<"/v2/InitPayments", "post">) {
		return this.request<GetResponse<"/v2/InitPayments", "post">>(
			"/v2/InitPayments",
			body,
			"POST",
		);
	}
	/**
	 * `Для Мерчантов с PCI DSS`
	 *  <br> Проверяет поддерживаемую версию 3DS протокола по карточным данным из входящих
	 *  параметров
	 *
	 *  При определении второй версии, возможно в ответе получение данных для прохождения
	 *  дополнительного метода `3DS Method`, который позволяет эмитенту собрать данные браузера
	 *  клиента — это может быть полезно при принятии решения в пользу **Frictionless Flow**
	 *  (аутентификация клиента без редиректа на страницу ACS) <br>
	 *
	 *
	 * @tags Стандартный платеж
	 * @summary Проверка версии 3DS
	 *
	 */
	check3dsVersion(body: GetRequestBody<"/v2/Check3dsVersion", "post">) {
		return this.request<GetResponse<"/v2/Check3dsVersion", "post">>(
			"/v2/Check3dsVersion",
			body,
			"POST",
		);
	}
	/**
	 * `Для Мерчантов с PCI DSS`
	 *  <br> Метод подтверждает платеж передачей реквизитов, а также списывает средства
	 *  с карты клиента при одностадийной оплате и блокирует указанную сумму при
	 *  двухстадийной. Используется, если у площадки есть сертификация PCI DSS и
	 *  собственная платежная форма
	 *
	 *
	 * @tags Стандартный платеж
	 * @summary Подтверждение платежа
	 *
	 */
	finishAuthorize(body: GetRequestBody<"/v2/FinishAuthorize", "post">) {
		return this.request<GetResponse<"/v2/FinishAuthorize", "post">>(
			"/v2/FinishAuthorize",
			body,
			"POST",
		);
	}
	/**
	 * Метод для списания заблокированных денежных средств. Используется при двухстадийном проведении платежа. Применим только к платежам в статусе **AUTHORIZED**. Статус транзакции перед разблокировкой
	 * выставляется в **CONFIRMING**. Сумма списания может быть меньше или равна сумме авторизации.
	 * > Подробнее про двухстадийный платеж можно прочитать в разделе [Сценарии платежа](https:\/\/www.tbank.ru\/kassa\/dev\/payments\/#tag\/Scenarii-oplaty-po-karte\/Scenarii-platezha) — "Двухстадийный платеж"
	 *
	 *
	 * @tags Двухстадийный платеж
	 * @summary Подтверждение платежа
	 *
	 */
	confirm(body: GetRequestBody<"/v2/Confirm", "post">) {
		return this.request<GetResponse<"/v2/Confirm", "post">>(
			"/v2/Confirm",
			body,
			"POST",
		);
	}
	/**
	 * Отменяет платежную сессию. В зависимости от статуса платежа переводит его в следующие состояния:
	 * * NEW — CANCELED
	 * * AUTHORIZED — PARTIAL_REVERSED — если отмена не на полную сумму;
	 * * AUTHORIZED — REVERSED — если отмена на полную сумму;
	 * * CONFIRMED — PARTIAL_REFUNDED — если отмена не на полную сумму;
	 * * CONFIRMED — REFUNDED — если отмена на полную сумму.
	 *
	 * Для платежей «в Рассрочку» отмена доступна только из статуса AUTHORIZED <br>
	 * Для платежей «Долями» если операция в статусе CONFIRMED или PARTIAL_REFUNDED будет осуществлен частичный либо полный возврат <br>
	 * Если платеж находился в статусе **AUTHORIZED** производится отмена холдирования средств на карте
	 * клиента. При переходе из статуса **CONFIRMED** — возврат денежных средств на карту клиента
	 *
	 *
	 * @tags Отмена платежа
	 * @summary Отмена платежа
	 *
	 */
	cancel(body: GetRequestBody<"/v2/Cancel", "post">) {
		return this.request<GetResponse<"/v2/Cancel", "post">>(
			"/v2/Cancel",
			body,
			"POST",
		);
	}
	/**
	 * # Схема проведения рекуррентного платежа
	 *
	 * ## Описание
	 *
	 * Осуществляет рекуррентный (повторный) платеж — безакцептное списание денежных средств со счета банковской карты клиента.
	 * Для возможности его использования клиент должен совершить хотя бы один платеж в пользу Мерчанта, который должен быть указан как рекуррентный (см. параметр Recurrent методе **Init**), фактически являющийся первичным. По завершении оплаты в нотификации на AUTHORIZED или CONFIRMED будет передан параметр `RebillId`.<br>
	 * В дальнейшем для совершения рекуррентного платежа Мерчант должен вызвать метод **Init**, указать нужную сумму для списания в параметре `Amount`, а затем без переадресации на PaymentURL вызвать метод **Charge** для оплаты по тем же самым реквизитам и передать параметр `RebillId`, полученный при совершении первичного платежа.<br>
	 * Метод **Charge** работает по одностадийной и двухстадийной схеме оплаты. Чтобы перейти на двухстадийную схему нужно переключить терминал в [Личном кабинете](https:\/\/business.tbank.ru\/oplata\/main), а также написать обращение на <acq_help@tinkoff.ru> с просьбой переключить схему рекуррентов.
	 *
	 * >По умолчанию метод Charge отключен. Для его включения на DEMO-терминале нужно написать обращение на <acq_help@tinkoff.ru>, а на боевом терминале — обратиться к своему персональному менеджеру
	 *
	 * При проведении рекуррентного платежа учитывать взаимосвязь атрибута RebillId в методе \/Charge с:
	 *   * Значением атрибута OperationInitiatorType в методе \/Init;
	 *   * Значением атрибута Reccurent в методе \/Init;
	 *   * Типом терминала, используемом для проведения операций (ECOM\/AFT).
	 *
	 * Наглядно допустимые сценарии взаимосвязи описаны в таблице:
	 * |CIT\/MIT|Тип операции|OperationInitiator в \/Init|RebillId в \/Charge|Recurrent в \/Init|AFT терминал|ECOM терминал|
	 * |---|---|---|---|---|---|---|
	 * |CIT|Credential-Not-Captured|0|null|N|Разрешено|Разрешено|
	 * |CIT|Credential-Captured|1|null|Y|Разрешено|Разрешено|
	 * |CIT|Credential-on-File|2|not null|N|Запрещено|Разрешено|
	 * |MIT|Credential-on-File, Recurring|R|not null|N|Запрещено|Разрешено|
	 * |MIT|Credential-on-File, Installment|I|not null|N|Разрешено|Запрещено|
	 *
	 * В случае передачи значений атрибутов не соответствующих таблице — MAPI вернет ошибку 1126
	 * (Несопоставимые значения rebillId или Recurrent с переданным значением OperationInitiatorType)
	 *
	 * ## Одностадийная оплата
	 *
	 * 1. Совершить родительский платеж путем вызова **Init** с указанием дополнительных параметров `Recurrent=Y` и `CustomerKey`.
	 * 2. Переадресовать клиента на `PaymentUrl` (только <span style="color:#900C3F">для Мерчантов без PCI DSS<\/span>).
	 * 3. После оплаты заказа клиентом в нотификации на статус **AUTHORIZED** или **CONFIRMED** будет передан параметр `RebillId`, который необходимо сохранить.
	 * 4. Спустя некоторое время для совершения рекуррентного платежа необходимо вызвать метод **Init** со стандартным набором параметров (параметры `Recurrent` и `CustomerKey` здесь не нужны).
	 * 5. Получить в ответ на **Init** параметр `PaymentId`.
	 * 6. Вызвать метод **Charge** с параметром `RebillId`, полученным в п.3, и параметром `PaymentId`, полученным в п.5. При успешном сценарии операция перейдет в статус CONFIRMED.
	 *
	 *
	 * ## Двухстадийная оплата
	 *
	 * 1. Совершить родительский платеж путем вызова **Init** с указанием дополнительных параметров `Recurrent=Y` и `CustomerKey`.
	 * 2. Переадресовать клиента на `PaymentUrl` (только <span style="color:#900C3F">для Мерчантов без PCI DSS<\/span>).
	 * 3. После оплаты заказа клиентом в нотификации на статус **AUTHORIZED** или **CONFIRMED** будет передан параметр RebillId, который необходимо сохранить.
	 * 4. Спустя некоторое время для совершения рекуррентного платежа необходимо вызвать метод **Init** со стандартным набором параметров (параметр `Recurrent` и `CustomerKey` здесь не нужны).
	 * 5. Получить в ответ на **Init** параметр `PaymentId`.
	 * 6. Вызвать метод **Charge** с параметром `RebillId`, полученным в п.3, и параметром `PaymentId`, полученным в п.5. При успешном сценарии операция перейдет в статус **AUTHORIZED**. Денежные средства будут заблокированы на карте клиента.
	 * 7. Вызвать метод **Confirm** для подтверждения платежа.
	 *
	 *
	 * @tags Рекуррентный платеж
	 * @summary Автоплатеж
	 *
	 */
	chargePCI(body: GetRequestBody<"/v2/Charge", "post">) {
		return this.request<GetResponse<"/v2/Charge", "post">>(
			"/v2/Charge",
			body,
			"POST",
		);
	}
	/**
	 * Метод возвращает статус платежа
	 *
	 *
	 * @tags Стандартный платеж
	 * @summary Получение статуса платежа
	 *
	 */
	getState(body: GetRequestBody<"/v2/GetState", "post">) {
		return this.request<GetResponse<"/v2/GetState", "post">>(
			"/v2/GetState",
			body,
			"POST",
		);
	}
	/**
	 * Регистрирует клиента в связке с терминалом
	 *
	 * > Возможна автоматическая привязка клиента и карты, по которой был совершен платеж, при
	 * передаче параметра `CustomerKey` в методе **Init**. Это можно использовать для сохранения и
	 * последующего отображения клиенту замаскированного номера карты, по которой будет совершен
	 * рекуррентный платеж
	 *
	 *
	 * @tags Методы работы с клиентами
	 * @summary Регистрация клиента
	 *
	 */
	addCustomer(body: GetRequestBody<"/v2/AddCustomer", "post">) {
		return this.request<GetResponse<"/v2/AddCustomer", "post">>(
			"/v2/AddCustomer",
			body,
			"POST",
		);
	}
	/**
	 * Возвращает данные клиента, сохраненные в связке с терминалом
	 *
	 *
	 * @tags Методы работы с клиентами
	 * @summary Получение данных клиента
	 *
	 */
	getCustomer(body: GetRequestBody<"/v2/GetCustomer", "post">) {
		return this.request<GetResponse<"/v2/GetCustomer", "post">>(
			"/v2/GetCustomer",
			body,
			"POST",
		);
	}
	/**
	 * Удаляет сохраненные данные клиента
	 *
	 *
	 * @tags Методы работы с клиентами
	 * @summary Удаление данных клиента
	 *
	 */
	removeCustomer(body: GetRequestBody<"/v2/RemoveCustomer", "post">) {
		return this.request<GetResponse<"/v2/RemoveCustomer", "post">>(
			"/v2/RemoveCustomer",
			body,
			"POST",
		);
	}
	/**
	 * `Для Мерчантов с PCI DSS`
	 *  <br> Метод инициирует привязку карты к клиенту.
	 *  В случае успешной привязки переадресует клиента на `Success Add Card URL`,
	 *  в противном случае на `Fail Add Card URL`.
	 *  Можно использовать форму Т‑Кассы, возможно заменить на кастомную форму.
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Инициализация привязки карты к клиенту
	 *
	 */
	addCard(body: GetRequestBody<"/v2/AddCard", "post">) {
		return this.request<GetResponse<"/v2/AddCard", "post">>(
			"/v2/AddCard",
			body,
			"POST",
		);
	}
	/**
	 * `Для Мерчантов с PCI DSS`
	 *  <br> Завершает привязку карты к клиенту.
	 *  В случае успешной привязки переадресует клиента на **Success Add Card URL**
	 *  в противном случае на **Fail Add Card URL**.
	 *  Для прохождения 3DS второй версии перед вызовом метода должен быть вызван **\/v2\/check3dsVersion**
	 *  и выполнен **3DS Method**, который является обязательным при прохождении **3DS** по протоколу версии
	 *  2.0.
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Привязка карты
	 *
	 */
	attachCard(body: GetRequestBody<"/v2/AttachCard", "post">) {
		return this.request<GetResponse<"/v2/AttachCard", "post">>(
			"/v2/AttachCard",
			body,
			"POST",
		);
	}
	/**
	 * `Для мерчантов с PCI DSS`
	 *  <br> Метод возвращает статус привязки карты
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Статус привязки карты
	 *
	 */
	getAddCardState(body: GetRequestBody<"/v2/GetAddCardState", "post">) {
		return this.request<GetResponse<"/v2/GetAddCardState", "post">>(
			"/v2/GetAddCardState",
			body,
			"POST",
		);
	}
	/**
	 * Возвращает список всех привязанных карт клиента, включая удаленные
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Список карт клиента
	 *
	 */
	getCardList(body: GetRequestBody<"/v2/GetCardList", "post">) {
		return this.request<GetResponse<"/v2/GetCardList", "post">>(
			"/v2/GetCardList",
			body,
			"POST",
		);
	}
	/**
	 * Метод удаляет привязанную карту клиента
	 *
	 *
	 * @tags Методы работы с картами
	 * @summary Удаление привязанной карты клиента
	 *
	 */
	removeCard(body: GetRequestBody<"/v2/RemoveCard", "post">) {
		return this.request<GetResponse<"/v2/RemoveCard", "post">>(
			"/v2/RemoveCard",
			body,
			"POST",
		);
	}
	/**
	 * Метод регистрирует QR и возвращает информацию о нем.
	 * Должен быть вызван после вызова метода **Init**
	 *
	 *
	 * @tags Оплата через СБП
	 * @summary Формирование QR
	 *
	 */
	getQr(body: GetRequestBody<"/v2/GetQr", "post">) {
		return this.request<GetResponse<"/v2/GetQr", "post">>(
			"/v2/GetQr",
			body,
			"POST",
		);
	}
	/**
	 * Метод предназначен для подтверждения карты путем блокировки случайной суммы
	 *
	 * @tags Методы работы с привязанными картами и клиентами
	 * @summary SubmitRandomAmount
	 * @deprecated
	 */
	submitRandomAmount(body: GetRequestBody<"/v2/SubmitRandomAmount", "post">) {
		return this.request<GetResponse<"/v2/SubmitRandomAmount", "post">>(
			"/v2/SubmitRandomAmount",
			body,
			"POST",
		);
	}
	/**
	 * `Для Мерчантов с PCI DSS`
	 *  <br> Осуществляет проверку результатов прохождения 3-D Secure и при успешном результате
	 *  прохождения 3-D Secure подтверждает инициированный платеж.
	 *  При использовании одностадийной оплаты осуществляет списание денежных средств с карты
	 *  клиента. <br>
	 *  При двухстадийной оплате осуществляет блокировку указанной суммы на карте клиента<br>
	 *
	 *  *Формат запроса*: `x-www-form-urlencoded` <br>
	 *
	 *  После получения на `TermUrl` мерчанта ответа ACS с результатами прохождения 3-D Secure необходимо
	 *  сформировать запрос к методу **Submit3DSAuthorization**
	 *
	 *
	 * @tags Прохождение 3DS
	 * @summary Подтверждение прохождения 3DS v1.0
	 *
	 */
	submit3DSAuthorization() {
		return this.request<GetResponse<"/v2/Submit3DSAuthorization", "post">>(
			"/v2/Submit3DSAuthorization",
			undefined,
			"POST",
		);
	}
	/**
	 * `Для Мерчантов с PCI DSS`
	 *  <br> Осуществляет проверку результатов прохождения 3-D Secure v2 и при успешном результате
	 *  прохождения 3-D Secure v2 подтверждает инициированный платеж.
	 *  При использовании одностадийной оплаты осуществляет списание денежных средств с карты
	 *  клиента.
	 *  При двухстадийной оплате осуществляет блокировку указанной суммы на карте клиента.
	 *
	 *  *Формат запроса*: `x-www-form-urlencoded` <br>
	 *
	 *  После получения на `cresCallbackUrl` Мерчанта ответа ACS с результатами прохождения 3-D Secure необходимо
	 *  сформировать запрос к методу **Submit3DSAuthorizationV2**
	 *
	 *
	 * @tags Прохождение 3DS
	 * @summary Подтверждение прохождения 3DS v2.1
	 *
	 */
	submit3DSAuthorizationV2() {
		return this.request<GetResponse<"/v2/Submit3DSAuthorizationV2", "post">>(
			"/v2/Submit3DSAuthorizationV2",
			undefined,
			"POST",
		);
	}
	/**
	 * Метод определения возможности проведения платежа T‑Pay на терминале и устройстве
	 *
	 *
	 * @tags Оплата через T‑Pay
	 * @summary Статус
	 *
	 */
	status(
		/** Платежный ключ, выдается Мерчанту при заведении
   терминала
    */ TerminalKey: paths["/v2/TinkoffPay/terminals/{TerminalKey}/status"]["get"]["parameters"]["path"]["TerminalKey"],
	) {
		return this.request<
			GetResponse<"/v2/TinkoffPay/terminals/{TerminalKey}/status", "get">
		>(`/v2/TinkoffPay/terminals/${TerminalKey}/status`, undefined, "GET");
	}
	/**
	 * Метод получения Link для безусловного редиректа на мобильных устройствах
	 *
	 *
	 * @tags Оплата через T‑Pay
	 * @summary Получение ссылки
	 *
	 */
	link(
		/** Идентификатор платежа в системе Т‑Кассы
		 */ paymentId: paths["/v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link"]["get"]["parameters"]["path"]["paymentId"],
		/** Версия T‑Pay, доступная на терминале:
		 * 2.0 (T‑Pay)
		 */ version: paths["/v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link"]["get"]["parameters"]["path"]["version"],
	) {
		return this.request<
			GetResponse<
				"/v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link",
				"get"
			>
		>(
			`/v2/TinkoffPay/transactions/${paymentId}/versions/{version}/link`,
			undefined,
			"GET",
		);
	}
	/**
	 * Метод получения QR для десктопов
	 *
	 *
	 * @tags Оплата через T‑Pay
	 * @summary Получение QR
	 *
	 */
	qR(
		/** Уникальный идентификатор транзакции в
   системе Т‑Кассы
    */ paymentId: paths["/v2/TinkoffPay/{paymentId}/QR"]["get"]["parameters"]["path"]["paymentId"],
	) {
		return this.request<GetResponse<"/v2/TinkoffPay/{paymentId}/QR", "get">>(
			`/v2/TinkoffPay/${paymentId}/QR`,
			undefined,
			"GET",
		);
	}
	/**
	 * Метод получения QR для десктопов
	 *
	 *
	 * @tags Оплата через SberPay
	 * @summary Получение QR
	 *
	 */
	sberPayQR(
		/** Уникальный идентификатор транзакции в
   системе Т‑Кассы
    */ paymentId: paths["/v2/SberPay/{paymentId}/QR"]["get"]["parameters"]["path"]["paymentId"],
	) {
		return this.request<GetResponse<"/v2/SberPay/{paymentId}/QR", "get">>(
			`/v2/SberPay/${paymentId}/QR`,
			undefined,
			"GET",
		);
	}
	/**
	 * Получение ссылки
	 *
	 *
	 * @tags Оплата через SberPay
	 * @summary Получение ссылки
	 *
	 */
	sberPaylink(
		/** Уникальный идентификатор транзакции в
   системе Т‑Кассы
    */ paymentId: paths["/v2/SberPay/transactions/{paymentId}/link"]["get"]["parameters"]["path"]["paymentId"],
	) {
		return this.request<
			GetResponse<"/v2/SberPay/transactions/{paymentId}/link", "get">
		>(`/v2/SberPay/transactions/${paymentId}/link`, undefined, "GET");
	}
	/**
	 * Передача уведомления о событии платежного виджета T‑Pay + T‑ID
	 *
	 * @tags Оплата через T‑Pay
	 * @summary Передача уведомления о событии
	 *
	 */
	tPayEvent(body: GetRequestBody<"/v2/TinkoffPayEvent", "post">) {
		return this.request<GetResponse<"/v2/TinkoffPayEvent", "post">>(
			"/v2/TinkoffPayEvent",
			body,
			"POST",
		);
	}
	/**
	 * Метод возвращает список участников куда может быть осуществлен возврат платежа, совершенного
	 * по QR
	 *
	 *
	 * @tags Оплата через СБП
	 * @summary Список банков-пользователей QR
	 *
	 */
	qrMembersList(body: GetRequestBody<"/v2/QrMembersList", "post">) {
		return this.request<GetResponse<"/v2/QrMembersList", "post">>(
			"/v2/QrMembersList",
			body,
			"POST",
		);
	}
	/**
	 * Метод инициирует привязку счета клиента к магазину
	 * и возвращает информацию о нем
	 *
	 *
	 * @tags Оплата через СБП
	 * @summary Привязка счёта к магазину
	 *
	 */
	addAccountQr(body: GetRequestBody<"/v2/AddAccountQr", "post">) {
		return this.request<GetResponse<"/v2/AddAccountQr", "post">>(
			"/v2/AddAccountQr",
			body,
			"POST",
		);
	}
	/**
	 * Метод возвращает статус привязки счета клиента по магазину
	 *
	 *
	 * @tags Оплата через СБП
	 * @summary Получение статуса привязки счета к магазину
	 *
	 */
	getAddAccountQrState(
		body?: GetRequestBody<"/v2/GetAddAccountQrState", "post">,
	) {
		return this.request<GetResponse<"/v2/GetAddAccountQrState", "post">>(
			"/v2/GetAddAccountQrState",
			body,
			"POST",
		);
	}
	/**
	 * Метод возвращает список привязанных счетов клиента по магазину
	 *
	 * @tags Оплата через СБП
	 * @summary Получение списка счетов, привязанных к магазину
	 *
	 */
	getAccountQrList(body?: GetRequestBody<"/v2/GetAccountQrList", "post">) {
		return this.request<GetResponse<"/v2/GetAccountQrList", "post">>(
			"/v2/GetAccountQrList",
			body,
			"POST",
		);
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
	 * @tags Оплата через СБП
	 * @summary Автоплатеж по QR
	 *
	 */
	chargeQr(body: GetRequestBody<"/v2/ChargeQr", "post">) {
		return this.request<GetResponse<"/v2/ChargeQr", "post">>(
			"/v2/ChargeQr",
			body,
			"POST",
		);
	}
	/**
	 * Тестовая платежная сессия с предопределенным статусом по СБП
	 *
	 * @tags Оплата через СБП
	 * @summary Создание тестовой платежной сессии
	 *
	 */
	sbpPayTest(body: GetRequestBody<"/v2/SbpPayTest", "post">) {
		return this.request<GetResponse<"/v2/SbpPayTest", "post">>(
			"/v2/SbpPayTest",
			body,
			"POST",
		);
	}
	/**
	 * Возвращает статус возврата платежа по СБП
	 *
	 *
	 * @tags Оплата через СБП
	 * @summary Получение статуса возврата
	 *
	 */
	getQRState(body: GetRequestBody<"/v2/GetQRState", "post">) {
		return this.request<GetResponse<"/v2/GetQRState", "post">>(
			"/v2/GetQRState",
			body,
			"POST",
		);
	}
	/**
	 * Метод возвращает статус заказа
	 *
	 *
	 * @tags Стандартный платеж
	 * @summary Получение статуса заказа
	 *
	 */
	checkOrder(body: GetRequestBody<"/v2/CheckOrder", "post">) {
		return this.request<GetResponse<"/v2/CheckOrder", "post">>(
			"/v2/CheckOrder",
			body,
			"POST",
		);
	}
	/**
	 * Метод позволяет отправить закрывающий чек в кассу.
	 * Условия работы метода:
	 * 1. Закрывающий чек может быть отправлен если платежная сессия по первому чеку находится в
	 *   статусе **CONFIRMED**.
	 * 2. В платежной сессии был передан объект `Receipt`.
	 * 3. В объекте `Receipt` был передан хотя бы один объект `Receipt.Items.PaymentMethod` =
	 *   `full_prepayment` или `prepayment` или `advance`.
	 *
	 *
	 * @tags Методы работы с чеками
	 * @summary Закрывающий чек в кассу
	 *
	 */
	sendClosingReceipt(
		body: GetRequestBody<"/cashbox/SendClosingReceipt", "post">,
	) {
		return this.request<GetResponse<"/cashbox/SendClosingReceipt", "post">>(
			"/cashbox/SendClosingReceipt",
			body,
			"POST",
		);
	}
	/**
	 * Получение deeplink с включенным подписанным JWT-токеном. Предназначен для запроса по API
	 *
	 * @tags Оплата через MirPay
	 * @summary Получить DeepLink
	 *
	 */
	getDeepLink(body: GetRequestBody<"/v2/GetDeepLink", "post">) {
		return this.request<GetResponse<"/v2/GetDeepLink", "post">>(
			"/v2/GetDeepLink",
			body,
			"POST",
		);
	}
	/**
	 * Метод определяет доступность методов оплаты на терминале для SDK и API. Запрос не шифруется токеном
	 *
	 * @tags Оплата через MirPay
	 * @summary Проверить доступность методов на SDK
	 *
	 */
	getTerminalPayMethods(
		body: GetRequestBody<"/v2/GetTerminalPayMethods", "get">,
	) {
		return this.request<GetResponse<"/v2/GetTerminalPayMethods", "get">>(
			"/v2/GetTerminalPayMethods",
			body,
			"GET",
		);
	}
	/**
	 * Справку по конкретной операции можно получить на: <br> 1. URL-сервиса, развернутого на своей стороне. <br> 2. Электронную почту. <br> Для формирования токена необходимо использовать только <b>PASSWORD<\/b> и <b>TERMINAL_KEY<\/b>
	 *
	 * @tags Стандартный платеж
	 * @summary Получение справки по операции
	 *
	 */
	getConfirmOperation(
		body?: GetRequestBody<"/v2/getConfirmOperation", "post">,
	) {
		return this.request<GetResponse<"/v2/getConfirmOperation", "post">>(
			"/v2/getConfirmOperation",
			body,
			"POST",
		);
	}
	/** @generated stop-generate-methods */
}
