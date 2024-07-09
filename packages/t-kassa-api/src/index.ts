import { type Require, type Servers, generateSignature } from "./utils";

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

export class TKassa {
	terminalKey: string;
	password: string;
	options: Require<TKassaOptions, "server">;

	constructor(terminalKey: string, password: string, options?: TKassaOptions) {
		this.terminalKey = terminalKey;
		this.password = password;

		this.options = {
			server: "https://securepay.tinkoff.ru",
			...options,
		};
	}

	private async request(
		url: string,
		data: Record<string, unknown>,
		method: "POST" | "GET" = "POST",
	) {
		const signature = generateSignature(data, this.password);

		const response = await fetch(this.options.server + url, {
			method,
			...(method === "POST"
				? {
						headers: {
							"content-type": "application/json",
							"user-agent":
								"Т-Касса SDK for Node.js (https://github.com/kravetsone/t-kassa-api)",
						},
						body: JSON.stringify({
							Token: signature,
						}),
					}
				: {}),
		});
	}
}
