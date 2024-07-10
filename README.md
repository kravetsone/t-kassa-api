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
-   Очень удобная работа с нотификацией (webhook) с умными фильтрами
-   Имеет в себе [webhook адаптеры для самых популярных фреймворков](#поддерживаемые-webhook-адаптеры)
-   Отличная документация кода с помощью **JSDoc** (сгенерировано из **OpenAPI**)
-   Современная и **type-safe**
-   0 зависимостей
-   Берёт работу с [подписью запроса](https://www.tbank.ru/kassa/dev/payments/index.html#section/Podpis-zaprosa) на себя
-   [Есть на JSR](https://jsr.io/@kravets/t-kassa-api)

### Webhook

Пример использования webhook с фреймворком [Hono](https://hono.dev/)

```ts
import { Hono } from "hono";
import { TKassa, webhookHandler, filters } from "t-kassa-api";

const ткасса = new TKassa(process.env.TERMINAL_KEY, process.env.PASSWORD);

ткасса.on(
    filters.and(
        filters.equal("Status", "SUCCESS"),
        filters.notNullable("RebillId")
    ),
    (context) => {
        // при этом типы понимают фильтры
    }
);

const app = new Hono();

app.get("/", webhookHandler("hono"));
```

### Поддерживаемые webhook адаптеры

-   [Elysia](https://elysiajs.com/)
-   [Fastify](https://fastify.dev/)
-   [Hono](https://hono.dev/)
-   [Express](https://expressjs.com/)
-   [Koa](https://koajs.com/)
-   [node:http](https://nodejs.org/api/http.html)
-   [Bun.serve](https://bun.sh/docs/api/http)
-   [std/http (Deno.serve)](https://docs.deno.com/runtime/manual/runtime/http_server_apis#http-server-apis)

или любой другой фреймворк

```ts
// a non-existing framework for the example
import { App } from "some-http-framework";
import { TKassa } from "t-kassa-api";

const ткасса = new TKassa(process.env.TERMINAL_KEY, process.env.PASSWORD, {
    server: "https://rest-api-test.tinkoff.ru",
});

const app = new App().post("/t-kassa", async (req) => {
    // req.body must be json equivalent to Webhook notification body
    await ткасса.emit(req.body);
});

app.listen(80);
```

### TODO:

-   поддержать `application/x-www-form-urlencoded`
