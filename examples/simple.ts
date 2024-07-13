import { TKassa, filters, webhookHandler } from "../src";

const тк = new TKassa();

const result1 = await тк.init({
	TerminalKey: "",
	Amount: 0,
	OrderId: "",
	Password: "",
});

console.log(result1);

const ткасса = new TKassa(
	process.env.TERMINAL_KEY as string,
	process.env.PASSWORD as string,
	{
		// server: "https://rest-api-test.tinkoff.ru",
	},
);

const result = await ткасса.init({
	TerminalKey: "",
	Amount: 0,
	OrderId: "",
	Password: "",
});

console.log(result);

ткасса.on(
	filters.and(
		filters.equal("Status", "SUCCESS"),
		filters.notNullable("RebillId"),
	),
	(context) => {
		// ^?
	},
);

const a = webhookHandler(ткасса, "elysia");
