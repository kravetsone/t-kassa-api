import type { paths, webhooks } from "./api-types";
import type {
	encryptCReq,
	encryptCardData,
	encryptThreeDSMethodData,
	servers,
} from "./utils";

/**
 * `CardData` интерфейс для {@link encryptCardData} функции
 */
export interface CardData {
	/**
	 * Номер карты
	 */
	PAN: number | string;
	/**
	 * Месяц и год срока действия карты в формате `MMYY`
	 */
	ExpDate: number | string;
	/**
	 * Имя и фамилия держателя карты (как на карте)
	 */
	CardHolder?: string;
	/**
	 * Код защиты (с обратной стороны карты). Для платежей по `Apple Pay` (с расшифровкой токена на своей стороне) не является обязательным
	 */
	CVV?: string | number;
	/**
	 * Electronic Commerce Indicator. Индикатор, показывающий степень защиты, применяемую при предоставлении клиентом своих данных ТСП
	 */
	ECI?: string;
	/**
	 * Cardholder Authentication Verification Value или Accountholder Authentication Value
	 */
	CAVV?: string;
}

/**
 * Интерфейс для {@link encryptThreeDSMethodData} функции
 */
export interface ThreeDSMethodData {
	/**
	 * Обратный адрес, на который будет отправлен запрос после прохождения `3DS Method`
	 */
	threeDSMethodNotificationURL: string;
	/**
	 * Идентификатор транзакции из ответа метода `Check3DSVersion`
	 */
	threeDSServerTransID: string;
}

/**
 * Интерфейс для {@link encryptCReq} функции
 */
export interface CReq {
	/** Идентификатор транзакции из ответа метода `FinishAuthorize` */
	threeDSServerTransID: string;
	/** Идентификатор транзакции, присвоенный ACS, полученный в ответе на FinishAuthorize */
	acsTransID: string;
	/**
	 * Размер экрана, на котором открыта страница ACS.Допустимые значения:
	 * - `01` = `250 x 400`
	 * - `02` = `390 x 400`
	 * - `03` = `500 x 600`
	 * - `04` = `600 x 400`
	 * - `05` = `Full screen`
	 */
	challengeWindowSize: "01" | "02" | "03" | "04" | "05";
	/** Передается фиксированное значение «`CReq`» */
	messageType: "CReq";
	/** Версия 3DS, полученная из ответа метода `Check3dsVersion` */
	messageVersion: string;
}

export interface ThreeDsPrepareDataV1 {
	/** Информация для идентификации платежной сессии на стороне торговой точки. Придет в ответе метода `FinishAuthorize` */
	MD: string;
	/** Запрос на аутентификацию плательщика, который содержит разные детали транзакции. Придет в ответе метода `FinishAuthorize` */
	PaReq: string;
	/** Адрес перенаправления после аутентификации 3DS. Должен содержать ссылку на обработчик на стороне Мерчанта, принимающий результаты прохождения 3-D Secure */
	TermURL: string;
}

type SoftString<T extends string> = T | (string & {});

export type Servers = (typeof servers)[number]["url"];
// Export SoftServers because we don't want to expose SoftString
export type SoftServers = SoftString<Servers>;

export type WebhookBody = NonNullable<
	webhooks["Notification"]["post"]["requestBody"]
>["content"]["application/json"];

export type Require<O extends Record<any, any>, K extends keyof O> = {
	[P in keyof O]-?: P extends K ? NonNullable<O[P]> : O[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

type UnionToIntersectionHelper<U> = (
	U extends unknown
		? (k: U) => void
		: never
) extends (k: infer I) => void
	? I
	: never;

export type UnionToIntersection<U> = boolean extends U
	? UnionToIntersectionHelper<Exclude<U, boolean>> & boolean
	: UnionToIntersectionHelper<U>;

export type Modify<Base, Mod> = Omit<Base, keyof Mod> & Mod;

export type GetRequestBody<
	Path extends keyof paths,
	Method extends "get" | "post",
	TerminalKey extends string = "",
	ContentType extends string = "application/json",
> = paths[Path] extends { [K in Method]: any }
	? paths[Path][Method] extends { requestBody?: { content: any } }
		? TerminalKey extends ""
			? Modify<
					Omit<
						NonNullable<
							paths[Path][Method]["requestBody"]
						>["content"][ContentType],
						"Token"
					>,
					{
						/**
						 * Пароль, который используется для генерации подписи запроса (он не попадёт в body запроса)
						 * @example 12312312
						 */
						Password: string;
					}
				>
			: Omit<
					NonNullable<
						paths[Path][Method]["requestBody"]
					>["content"][ContentType],
					"Token" | "TerminalKey"
				>
		: never
	: never;

export type GetResponse<
	Path extends keyof paths,
	Method extends "get" | "post",
> = paths[Path] extends { [K in Method]: any }
	? paths[Path][Method] extends {
			responses: {
				200: {
					content: {
						"application/json": any;
					};
				};
			};
		}
		? paths[Path][Method]["responses"][200]["content"]["application/json"]
		: never
	: never;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type MaybePromise<T> = Promise<T> | T;

export type RequestOptions = Omit<
	NonNullable<Parameters<typeof fetch>[1]>,
	"headers"
> & {
	mimeType?: "json" | "x-www-form-urlencoded";
	headers?: Record<string, string>;
};
