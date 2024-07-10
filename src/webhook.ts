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
} satisfies Record<string, FrameworkAdapter>;

export function webhookHandler<Framework extends keyof typeof frameworks>(
	tKassa: TKassa,
	framework: Framework,
) {
	const frameworkAdapter = frameworks[framework];

	return async (...args: any[]) => {
		const { body, response } = frameworkAdapter(
			// @ts-expect-error
			...args,
		);

		await tKassa.emit(await body);

		if (response) return response();
	};
	// as unknown as ReturnType<(typeof frameworks)[Framework]> extends {
	// 	response: () => any;
	// }
	// 	? (
	// 			...args: Parameters<(typeof frameworks)[Framework]>
	// 		) => ReturnType<ReturnType<(typeof frameworks)[Framework]>["response"]>
	// 	: (...args: Parameters<(typeof frameworks)[Framework]>) => void;
}
