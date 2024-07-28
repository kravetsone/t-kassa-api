import { constants, createHash, publicEncrypt } from "node:crypto";
import type { KeyObject } from "node:crypto";
import { TKassa } from "./index";
import type { CardData, ThreeDSMethodData } from "./types";

export * from "./types";

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
		Token: undefined,
	};

	const sign = Object.keys(signData)
		.filter((key) => typeof signData[key] !== "object")
		.sort()
		.map((key) => signData[key])
		.join("");

	return createHash("sha256").update(sign).digest("hex");
}

/**
 * Функция которая шифрует данные карты. Первым аргументом необходимо передать инстанс {@link TKassa} с переданным в параметрах X509Key.
 *
 * Или создать KeyObject с помощью `node:crypto`
 *
 * ```ts
 * createPublicKey(
 * 	 `-----BEGIN PUBLIC KEY-----\n${"Сюда сам ключ"}\n-----END PUBLIC KEY-----`,
 * )
 * ```
 *
 * Объект {@link CardData} собирается в виде списка `ключ`=`значение` c разделителем `;`.
 * Объект зашифровывается открытым ключом (X509 RSA 2048), получившееся бинарное значение кодируется в `Base64`.
 * Открытый ключ генерируется Т‑Кассой и выдается при регистрации терминала.
 *
 * */
export function encryptCardData(
	tKassaOrPublicKey: TKassa<any, any> | KeyObject,
	cardData: CardData,
) {
	const publicKey =
		tKassaOrPublicKey instanceof TKassa
			? tKassaOrPublicKey.publicKey
			: tKassaOrPublicKey;

	if (!publicKey) throw new Error("Не передан X509Key в encryptCardData");

	console.log(
		Object.entries(cardData)
			.map(([key, data]) => `${key}=${data}`)
			.join(";"),
	);

	const encryptedBuffer = publicEncrypt(
		{ key: publicKey, padding: constants.RSA_PKCS1_PADDING },
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
 * Функция, для получения строкового значения `ThreeDSMethodData`
 */
export function encryptThreeDSMethodData(data: ThreeDSMethodData) {
	return atob(JSON.stringify(data));
}

/** @generated start-generate-utils */
export const servers = [
	{ url: "https://securepay.tinkoff.ru", description: "production" },
	{ url: "https://rest-api-test.tinkoff.ru", description: "test" },
] as const;
/** @generated stop-generate-utils */
