import type { paths, webhooks } from "./api-types";
import type {
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

export type Servers = (typeof servers)[number]["url"];
export type WebhookBody = NonNullable<
	webhooks["Notification"]["post"]["requestBody"]
>["content"]["application/json"];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Require<O extends Record<any, any>, K extends keyof O> = {
	[P in keyof O]-?: P extends K ? NonNullable<O[P]> : O[P];
};

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
> = paths[Path] extends { [K in Method]: any }
	? paths[Path][Method] extends { requestBody?: { content: any } }
		? TerminalKey extends ""
			? Modify<
					Omit<
						NonNullable<
							paths[Path][Method]["requestBody"]
						>["content"]["application/json"],
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
					>["content"]["application/json"],
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
