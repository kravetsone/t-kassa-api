import type { UnionToIntersection, WebhookBody } from "./utils";

export type UpdateFilter<Mod, Base = UnionToIntersection<WebhookBody>> = (
	context: Base,
) => Promise<boolean> | boolean | Mod;

export type ExtractModFromArray<Filters extends any[]> = Filters extends []
	? []
	: Filters extends [infer First, ...infer Others]
		? [
				First extends UpdateFilter<infer Mod> ? Mod : never,
				...ExtractModFromArray<Others>,
			]
		: never;

export function equal<
	Key extends keyof WebhookBody,
	Value extends WebhookBody[Key],
>(key: Key, value: Value) {
	return ((context) => context[key] === value) as UpdateFilter<{
		[K in Key]: Value;
	}>;
}

export function notNullable<Key extends keyof UnionToIntersection<WebhookBody>>(
	key: Key,
) {
	return ((context) =>
		context[key] !== null && context[key] !== undefined) as UpdateFilter<{
		[K in Key]: NonNullable<UnionToIntersection<WebhookBody>[K]>;
	}>;
}

export function and<const Fns extends UpdateFilter<any>[]>(...fns: Fns) {
	return (() => {}) as unknown as UpdateFilter<
		UnionToIntersection<ExtractModFromArray<Fns>[number]>
	>;
}
