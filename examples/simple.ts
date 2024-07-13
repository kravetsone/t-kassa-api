import { TKassa, filters, webhookHandler } from "../src";

const тк = new TKassa(() => {
	return {
		Password: "",
		custom: {
			ok: true,
		},
	};
});

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
	Amount: 0,
	OrderId: "",
});

console.log(result);

тк.on(
	filters.and(filters.equal("Status", "SUCCESS"), filters.notNullable("DATA")),
	(context) => {
		// ^?
	},
);

const a = webhookHandler(ткасса, "elysia");
