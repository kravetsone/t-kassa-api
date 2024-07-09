# t-kassa-api

[![npm](https://img.shields.io/npm/v/t-kassa-api?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/t-kassa-api)
[![JSR](https://jsr.io/badges/@kravets/t-kassa-api)](https://jsr.io/@kravets/t-kassa-api)
[![JSR Score](https://jsr.io/badges/@kravets/t-kassa-api/score)](https://jsr.io/@kravets/t-kassa-api)

</div>

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
-   0 зависимостей
-   Берёт работу с [подписью запроса](https://www.tbank.ru/kassa/dev/payments/index.html#section/Podpis-zaprosa) на себя
-   [Есть на JSR](https://jsr.io/@kravets/t-kassa-api)

### TODO:

-   поддержать `application/x-www-form-urlencoded`
