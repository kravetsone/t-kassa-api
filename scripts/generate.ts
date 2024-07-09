import { readFileSync, writeFileSync } from "node:fs";
import { type OpenAPIV3_1, openapi } from "@scalar/openapi-parser";
import { $ } from "bun";
import dedent from "ts-dedent";
import {
	fromPascalToCamelCase,
	httpMethods,
	insertMultilineJSDoc,
} from "./utils";

const tKassaSchema = JSON.parse(String(readFileSync("./openapi.json")));

const result = await openapi().load(tKassaSchema).upgrade().get();

Bun.write("modern-openapi.json", JSON.stringify(result.specification));

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const schema = result.specification as OpenAPIV3_1.Document<{}>;

if (!schema.paths || !schema.servers) throw new Error("missed");

const file = dedent`export const servers = ${JSON.stringify(schema.servers)} as const;`;

writeFileSync("./src/generated.ts", file);

await $`bun x @biomejs/biome check ./src/generated.ts --write`;

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

						return dedent /* js */`
                            /**
                             * ${operation.description ? insertMultilineJSDoc(operation.description) : ""}
                             * 
                             * @tags ${operation.tags?.join(", ")}
                             * @summary ${operation.summary}
                             */
                            ${fromPascalToCamelCase(operation.operationId!)}() {
                                return 1
                            }
                        `;
					})
					.join("\n\n"),
			)
			.join("\n")}
	/** @generated stop-generate-methods */`,
);

await Bun.write("./src/index.ts", indexSource);

await $`bun x @biomejs/biome check ./src/index.ts --write`;