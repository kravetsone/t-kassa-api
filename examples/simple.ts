import { TKassa, filters } from "../src";

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
		filters.equal("ErrorCode", "1"),
		filters.notNullable("FnNumber"),
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
