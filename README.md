# t-kassa-api

WIP. Библиотека для взаимодействия с [API Т-Кассы](https://www.tbank.ru/kassa/dev/payments/index.html).

```ts
import { TKassa } from "t-kassa-api";

const ткасса = new TKassa(process.env.TERMINAL_KEY, process.env.PASSWORD, {
    server: "https://rest-api-test.tinkoff.ru",
});

const result = await ткасса.init({
    Amount: 1000,
    OrderId: "12",
});

console.log(result);
```

### Фичи

-   Генерируется исходя из **OpenAPI** спецификации
-   Отличная документация кода с помощью **JSDoc** (сгенерировано из **OpenAPI**)
-   Современная и **type-safe**
-   Берёт работу с [подписью запроса](https://www.tbank.ru/kassa/dev/payments/index.html#section/Podpis-zaprosa) на себя

### TODO:

-   поддержать `application/x-www-form-urlencoded`
