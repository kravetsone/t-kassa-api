import slugify from "slugify";
export const httpMethods = ["get", "post"] as const;

export function insertMultilineJSDoc(value: string) {
	return value
		.split("\n")
		.map((x) => `* ${x.replaceAll("/", "\\/")}`)
		.join("\n");
}

export function fromPascalToCamelCase(value: string) {
	return value.charAt(0).toLowerCase() + value.substring(1).replaceAll("-", "");
}

export function getLinkToMethod(tags: string[], operationId: string) {
	return `https://www.tbank.ru/kassa/dev/payments/index.html#tag/${slugify(tags.at(0) || "")}/operation/${operationId}`;
}
