import { createHash } from "node:crypto";
import type { servers } from "./generated";

export function generateSignature(
	data: Record<string, unknown>,
	password: string,
) {
	const signData: Record<string, unknown> = {
		...data,
		Password: password,
	};

	const sign = Object.keys(signData)
		.filter((key) => typeof signData[key] !== "object")
		.sort()
		.map((key) => signData[key])
		.join();

	return createHash("sha256").update(sign).digest("hex");
}

export type Servers = (typeof servers)[number]["url"];

export type Require<O, K extends keyof O> = { [P in K]-?: NonNullable<O[P]> };
