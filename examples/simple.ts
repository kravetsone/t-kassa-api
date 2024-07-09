import { TKassa } from "../src";

const tkassa = new TKassa("", "", {
	server: "https://rest-api-test.tinkoff.ru",
});

const a = await tkassa.init();
