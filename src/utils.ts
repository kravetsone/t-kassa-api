import { constants, createHash, publicEncrypt } from "node:crypto";
import type { TKassa } from ".";
import type { paths, webhooks } from "./api-types";
import type { servers } from "./generated";

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
 * Функция, которая возвращает подпись для конкретного запроса
 */
export function generateSignature(
	data: Record<string, unknown>,
	terminalKey: string,
	password: string,
) {
	const signData: Record<string, unknown> = {
		...data,
		TerminalKey: terminalKey,
		Password: password,
	};

	const sign = Object.keys(signData)
		.filter((key) => typeof signData[key] !== "object")
		.sort()
		.map((key) => signData[key])
		.join("");

	return createHash("sha256").update(sign).digest("hex");
}

/**
 * Функция которая шифрует данные карты. Первым аргументом необходимо передать инстанс TKassa с переданным в параметрах X509Key.
 *
 * Объект CardData собирается в виде списка `ключ`=`значение` c разделителем `;`.
 * Объект зашифровывается открытым ключом (X509 RSA 2048), получившееся бинарное значение кодируется в `Base64`.
 * Открытый ключ генерируется Т‑Кассой и выдается при регистрации терминала.
 *
 * */
export function encryptCardData(tKassa: TKassa<any, any>, cardData: CardData) {
	if (!tKassa.publicKey)
		throw new Error("Не передан X509Key в настройки TKassa");

	console.log(
		Object.entries(cardData)
			.map(([key, data]) => `${key}=${data}`)
			.join(";"),
	);

	const encryptedBuffer = publicEncrypt(
		{ key: tKassa.publicKey, padding: constants.RSA_PKCS1_PADDING },
		Buffer.from(
			Object.entries(cardData)
				.map(([key, data]) => `${key}=${data}`)
				.join(";"),
			"utf-8",
		),
	);

	return encryptedBuffer.toString("base64");
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
 * Функция, для получения строкового значения `ThreeDSMethodData`
 */
export function encryptThreeDSMethodData(data: ThreeDSMethodData) {
	return atob(JSON.stringify(data));
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
