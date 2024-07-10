import { createHash } from "node:crypto";
import type { paths, webhooks } from "./api-types";
import type { servers } from "./generated";

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
> = paths[Path] extends { [K in Method]: any }
	? paths[Path][Method] extends { requestBody?: { content: any } }
		? Omit<
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
