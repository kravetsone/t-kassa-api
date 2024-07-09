import { TKassa } from "../src";

const ткасса = new TKassa(
	process.env.TERMINAL_KEY as string,
	process.env.PASSWORD as string,
	{
		server: "https://rest-api-test.tinkoff.ru",
	},
);

const result = await ткасса.init({
	Amount: 1000,
	OrderId: "12",
});

console.log(result);
