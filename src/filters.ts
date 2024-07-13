/**
 * @module
 * Фильтрация webhook событий
 */

import type { UnionToIntersection, WebhookBody } from "./utils";

/**
 * @internal
 * Тип-утилита для фильтров
 */
export type UpdateFilter<Mod, Base = UnionToIntersection<WebhookBody>> = (
	context: Base,
) => Promise<boolean> | boolean | Mod;

type ExtractModFromArray<Filters extends any[]> = Filters extends []
	? []
	: Filters extends [infer First, ...infer Others]
		? [
				First extends UpdateFilter<infer Mod> ? Mod : never,
				...ExtractModFromArray<Others>,
			]
		: never;

/**
 * Фильтр, который проверяет равняется ли значение по ключу тому что вы передали
 */
export function equal<
	Key extends keyof WebhookBody,
	Value extends WebhookBody[Key],
>(key: Key, value: Value) {
	return ((context) => context[key] === value) as UpdateFilter<{
		[K in Key]: Value;
	}>;
}

/**
 * Фильтр, который проверяет не равняется ли значение по ключу `null` или `undefined`
 */
export function notNullable<Key extends keyof UnionToIntersection<WebhookBody>>(
	key: Key,
): UpdateFilter<{
	[K in Key]: NonNullable<UnionToIntersection<WebhookBody>[K]>;
}> {
	return (context) => context[key] !== null && context[key] !== undefined;
}

/**
 * Фильтр - логическое `И`. Помогает объединить условия
 */
export function and<const Fns extends UpdateFilter<any>[]>(
	...fns: Fns
): UpdateFilter<UnionToIntersection<ExtractModFromArray<Fns>[number]>> {
	return async (context) => {
		const results = await Promise.all(fns.map((fn) => fn(context)));
		return results.every(Boolean);
	};
}
