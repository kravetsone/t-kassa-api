import type { TKassa } from "./index";
import type { WebhookBody } from "./utils";

const responseOK = new Response("OK");

export interface FrameworkHandler {
	body: Promise<WebhookBody> | WebhookBody;
	response?: () => unknown;
}

export type FrameworkAdapter = (...args: any[]) => FrameworkHandler;

export const frameworks = {
	elysia: ({ body }) => ({ body, response: () => responseOK }),
	fastify: (request, reply) => ({
		body: request.body,
		response: () => reply.send("OK"),
	}),
	hono: (c) => ({ body: c.req.json(), response: () => c.text("OK") }),
	express: (req, res) => ({ body: req.body, response: () => res.send("OK") }),
	koa: (ctx) => ({
		body: ctx.request.body,
		response: () => {
			ctx.body = "OK";
		},
	}),
	http: (req, res) => ({
		body: new Promise((resolve) => {
			let body = "";

			req.on("data", (chunk: Buffer) => {
				body += chunk.toString();
			});

			req.on("end", () => resolve(JSON.parse(body)));
		}),
		response: () => res.writeHead(200).end("OK"),
	}),
	"std/http": (req) => ({ body: req.json(), response: () => responseOK }),
	"Bun.serve": (req) => ({ body: req.json(), response: () => responseOK }),
} satisfies Record<string, FrameworkAdapter>;

export function webhookHandler<Framework extends keyof typeof frameworks>(
	tKassa: TKassa,
	framework: Framework,
) {
	const frameworkAdapter = frameworks[framework];

	return (async (...args: any[]) => {
		const { body, response } = frameworkAdapter(
			// @ts-expect-error
			...args,
		);

		await tKassa.emit(await body);

		if (response) return response();
	}) as ReturnType<(typeof frameworks)[Framework]> extends {
		response: () => any;
	}
		? (
				...args: Parameters<(typeof frameworks)[Framework]>
			) => ReturnType<ReturnType<(typeof frameworks)[Framework]>["response"]>
		: (...args: Parameters<(typeof frameworks)[Framework]>) => void;
}
