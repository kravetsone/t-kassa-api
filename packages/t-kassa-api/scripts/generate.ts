import { readFileSync, writeFileSync } from "node:fs";
import { type OpenAPIV3_1, openapi } from "@scalar/openapi-parser";
import { $ } from "bun";
import dedent from "ts-dedent";

const tKassaSchema = JSON.parse(String(readFileSync("./openapi.json")));

const result = await openapi().load(tKassaSchema).upgrade().get();

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const schema = result.specification as OpenAPIV3_1.Document<{}>;

const file = dedent`export const servers = ${JSON.stringify(schema.servers)} as const;`;

writeFileSync("./src/generated.ts", file);

await $`bun x @biomejs/biome check ./src/generated.ts --write`;
