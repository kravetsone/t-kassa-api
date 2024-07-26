import { type OpenAPIV3_1, openapi } from "@scalar/openapi-parser";
import { $ } from "bun";
import openapiTS, { astToString } from "openapi-typescript";
import dedent from "ts-dedent";
import { parseRedocState } from "./parse-redoc-state";
import {
	fromPascalToCamelCase,
	getLinkToMethod,
	httpMethods,
	insertMultilineJSDoc,
} from "./utils";

const tKassaSchema = await parseRedocState();

await Bun.write("openapi.json", JSON.stringify(tKassaSchema, null, 2));
// Приколы потому что Т-Банк имеет OpenAPI 3.0.3, а вебхуки заехали только в 3.1.0

if (!tKassaSchema.webhooks) tKassaSchema.webhooks = {};

// @ts-expect-error
tKassaSchema.webhooks.Notification = tKassaSchema.paths["/v2/Notification"];

// @ts-expect-error
tKassaSchema.paths["/v2/Notification"] = undefined;

const result = await openapi().load(tKassaSchema).upgrade().get();

await Bun.write(
	"modern-openapi.json",
	JSON.stringify(result.specification, null, 2),
);

const schema = result.specification as OpenAPIV3_1.Document;

if (!schema.paths || !schema.servers || !schema.openapi)
	throw new Error("missed");

// @ts-ignore
const ast = await openapiTS(schema, {
	transform(schemaObject) {
		// @ts-expect-error Какие-то пиколы у генератора типов с экзамплами по 3.1 спекеююю
		if ("examples" in schemaObject && "default" in schemaObject.examples)
			schemaObject.example = schemaObject?.examples?.default;
	},
});
const contents = astToString(ast);

await Bun.write(
	"./src/api-types.ts",
	dedent /* js */`
	/**
	 * @module
	 * 
	 * Сгенерированные TypeScript типы для [API Т-Кассы](https://www.tbank.ru/kassa/dev/payments/index.html).
	 */

	${contents
		.replace(/(.*): never;/gi, "")
		.replace(/(.*): {(\s*)};/gim, "")
		.replace(/export type (.*) = Record<string, never>;/, "")
		.replace(
			/export interface (.*) {/gi,
			dedent /* js */`
		/**
		 * Сгенерированные из OpenAPI типы для \`$1\`
		 */
		 export interface $1 {`,
		)}`,
);
await $`bun x @biomejs/biome check ./src/api-types.ts --write --unsafe`;

let utilsSource = await Bun.file("./src/utils.ts").text();

utilsSource = utilsSource.replace(
	/\/\*\* @generated start-generate-utils \*\/\s?(.*)\s?\/\*\* @generated stop-generate-utils \*\//gis,
	dedent`/** @generated start-generate-utils */
	 export const servers = ${JSON.stringify(schema.servers)} as const;
	 /** @generated stop-generate-utils */
	 `,
);

await Bun.write("./src/utils.ts", utilsSource);

//! generate methods

let indexSource = await Bun.file("./src/index.ts").text();

indexSource = indexSource.replace(
	/\/\*\* @generated start-generate-methods \*\/\s?(.*)\s?\/\*\* @generated stop-generate-methods \*\//gis,
	dedent`
    /** @generated start-generate-methods */
    ${Object.entries(schema.paths)
			.filter(([path, value]) => value !== undefined)
			.map(([path, value]) =>
				httpMethods
					.filter((x) => value![x])
					.map((method) => {
						const operation = value![method]!;

						const pathParameters =
							operation.parameters?.filter((x) => x.in === "path") || [];

						const body = (operation.requestBody?.content["application/json"] ||
							[]) as OpenAPIV3_1.MediaTypeObject;

						const parameters = pathParameters
							.map(
								(x) =>
									`/** ${x.description} */ ${x.name}: paths["${path}"]["${method}"]["parameters"]["path"]["${x.name}"]`,
							)
							.concat(
								body?.schema
									? [
											`body${
												// 	3 метода у тинькофф без required хотя там токен...
												""
												// operation.requestBody?.required ||
												// (typeof body.schema === "object" &&
												// 	body.schema.required)
												// 	? ""
												// 	: "?"
											}: GetRequestBody<"${path}", "${method}", TerminalKey>`,
										]
									: [],
							)
							.join(", ");

						return dedent /* js */`
                            /**
                            ${operation.description ? insertMultilineJSDoc(operation.description) : "*"}
                             * 
                             * @tags ${operation.tags?.join(", ")}
                             * @summary ${operation.summary} 
							 * ${operation.deprecated ? "@deprecated" : ""} 
							 * [Documentation](${getLinkToMethod(operation.tags || [], operation.operationId || "")})
                             */
                            ${fromPascalToCamelCase(operation.operationId!)}(${parameters}): Promise<GetResponse<"${path}", "${method}">> {
                                return this.request(\`${path.replaceAll(/{/gi, "${")}\`, ${body?.schema ? "body" : "undefined"}, "${method.toUpperCase()}")
                            }
                        `;
					})
					.join("\n\n"),
			)
			.join("\n")}
	/** @generated stop-generate-methods */`,
);

await Bun.write("./src/index.ts", indexSource);

await $`bunx @biomejs/biome check --write --unsafe`;
