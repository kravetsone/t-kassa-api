import { TKassa, filters, webhookHandler } from "../src";

const ткасса = new TKassa(
	process.env.TERMINAL_KEY as string,
	process.env.PASSWORD as string,
	{
		server: "https://rest-api-test.tinkoff.ru",
	},
);

ткасса.on(
	filters.and(
		filters.equal("Status", "SUCCESS"),
		filters.notNullable("RebillId"),
	),
	(context) => {
		// ^?
	},
);

const result = await ткасса.init({
	Amount: 1000,
	OrderId: "12",
});

console.log(result);

const a = webhookHandler(ткасса, "elysia");
