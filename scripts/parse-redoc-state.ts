import vm from "node:vm";
import type { OpenAPIV3_1 } from "@scalar/openapi-parser";
import { load } from "cheerio";

export async function parseRedocState() {
	const response = await fetch(
		"https://www.tbank.ru/kassa/dev/payments/index.html",
	);

	const $ = load(await response.text());
	const scriptHTML = $("script")
		.filter(function () {
			const filtered = $(this).html()?.includes("__redoc_state");
			if (!filtered) return false;

			return filtered;
		})
		.html();

	const scriptContent = scriptHTML
		?.replace(/const/g, "var")
		.match(/\n.*/)?.[0]
		?.trim();
	if (!scriptContent) throw new Error("");

	// @ts-expect-error
	const sandbox: Record<
		"__redoc_state",
		{ spec: { data: OpenAPIV3_1.Document } }
	> = {};
	vm.createContext(sandbox);
	vm.runInContext(scriptContent, sandbox);

	return sandbox.__redoc_state.spec.data;
}
