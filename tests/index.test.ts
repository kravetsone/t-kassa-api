import { describe, expect, test } from "bun:test";
import { type Servers, TKassa } from "../src";

describe("TKassa()", () => {
	test("TKassa", async () => {
		let isAborted = false;
		using server = Bun.serve({
			port: 9888,
			fetch: async () => {
				await Bun.sleep(1000);

				return Response.json({});
			},
		});

		const signal = AbortSignal.timeout(100);

		signal.addEventListener("abort", () => {
			console.log("abort");
			isAborted = true;
		});

		const tkassa = new TKassa(
			(body) => {
				return {
					Password: "s" as string,
					custom: {},
				};
			},
			{
				server: server.url.href as Servers,
			},
		);
		await tkassa
			.getQr(
				{
					TerminalKey: "test",
					Password: "test",
					PaymentId: 1,
					DataType: "PAYLOAD",
				},
				{
					signal,
				},
			)
			.catch(async () => {});

		expect(isAborted).toBe(true);
	});
});
