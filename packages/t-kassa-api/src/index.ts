import { generateSignature } from "./utils";

export interface TKassaOptions {
	server: string;
}

export class TKassa {
	terminalKey: string;
	password: string;

	constructor(terminalKey: string, password: string) {
		this.terminalKey = terminalKey;
		this.password = password;
	}

	private async request(
		url: string,
		data: Record<string, unknown>,
		method: "POST" | "GET" = "POST",
	) {
		const signature = generateSignature(data, this.password);

		const response = await fetch(url, {
			method,
			...(method === "POST"
				? {
						headers: {
							"content-type": "application/json",
						},
						body: JSON.stringify({
							Token: signature,
						}),
					}
				: {}),
		});
	}
}
