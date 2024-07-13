import type { Buffer } from "node:buffer";
import type { TKassa } from "./index";
import type { MaybePromise, WebhookBody } from "./utils";
const responseOK = new Response("OK");

interface FrameworkHandler {
	body: MaybePromise<WebhookBody>;
	response?: () => unknown;
}

type FrameworkAdapter = (...args: any[]) => FrameworkHandler;

const frameworks = {
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

/**
 * Функция, которая помогает зарегистрировать обработчик событий для подходящего вам фреймворка
 *
 * @example
 * ```ts
 * import { Hono } from "hono";
 * import { TKassa, webhookHandler, filters } from "t-kassa-api";
 *
 * const ткасса = new TKassa(process.env.TERMINAL_KEY, process.env.PASSWORD);
 *
 * ткасса.on(
 *     filters.and(
 *         filters.equal("Status", "SUCCESS"),
 *         filters.notNullable("RebillId")
 *     ),
 *     (context) => {
 *         // при этом типы понимают фильтры
 *     }
 * );
 *
 * const app = new Hono();
 *
 * app.get("/", webhookHandler("hono"));
 * ```
 */
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
	}) as unknown as ReturnType<(typeof frameworks)[Framework]> extends {
		response: () => any;
	}
		? (
				...args: Parameters<(typeof frameworks)[Framework]>
			) => ReturnType<ReturnType<(typeof frameworks)[Framework]>["response"]>
		: (...args: Parameters<(typeof frameworks)[Framework]>) => void;
}
