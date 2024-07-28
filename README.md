# t-kassa-api

[![npm](https://img.shields.io/npm/v/t-kassa-api?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/t-kassa-api)
[![JSR](https://jsr.io/badges/@kravets/t-kassa-api)](https://jsr.io/@kravets/t-kassa-api)
[![JSR Score](https://jsr.io/badges/@kravets/t-kassa-api/score)](https://jsr.io/@kravets/t-kassa-api)

</div>

Библиотека для взаимодействия с [API Т-Кассы](https://www.tbank.ru/kassa/dev/payments/index.html).

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

[API Reference](https://jsr.io/@kravets/t-kassa-api/doc)

### Фичи

-   Генерируется исходя из **OpenAPI** спецификации
-   Очень удобная работа с нотификацией (webhook) с умными фильтрами
-   Имеет в себе [webhook адаптеры для самых популярных фреймворков](#поддерживаемые-webhook-адаптеры)
-   Удобна и для [нескольких касс](#режим-мульти-кассы)
-   Отличная документация кода с помощью **JSDoc** (сгенерировано из **OpenAPI**)
-   Современная и с **умнейшими** типами
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

### Режим мульти-кассы

Не всегда бывает удобным передача параметров одной кассы в конструктор класса, поэтому и появился режим мульти-кассы. Он позволяет вам не указывать `TerminalKey` и `Password`.

```ts
import { TKassa } from "t-kassa-api";

const ткасса = new TKassa();

const result = await ткасса.init({
    Amount: 1000,
    OrderId: "12",
    TerminalKey: "12312sf",
    Password: "123123231",
});

console.log(result);
```

И как вы можете заметить, теперь требуется указывать `TerminalKey` и `Password` в теле запроса. И в типах это тоже выражено! Магия? Не иначе.

Но как тогда получать webhook события? (нотификацию)

Для этого вам понадобится указать функцию первым аргументом конструктора.

```ts
import { TKassa } from "t-kassa-api";

const ткасса = new TKassa((body) => {
    const [kassa] = await db
        .select()
        .from(kassaTable)
        .where(eq(kassaTable.terminalKey, body.TerminalKey));

    if (!kassa) throw new Error("Касса не найдена");

    return {
        Password: kassa.password,
        custom: { kassa },
    };
});

ткасса.on(
    filters.and(
        filters.equal("Status", "SUCCESS"),
        filters.notNullable("RebillId")
    ),
    (context, { kassa }) => {
        // и тут появляется вторым аргументов переданное вами значение в custom
    }
);
```

И типы опять же совсем не глупы и делают вам благое дело, указывая верный путь.

### Функции-хелперы

##### [`generateSignature`](https://jsr.io/@kravets/t-kassa-api/doc/~/generateSignature)

Генерирует подпись для запроса.

```ts
const signature = generateSignature(
    { body: "OK" },
    process.env.TERMINAL_KEY,
    process.env.PASSWORD
);
```

##### [`encryptCardData`](https://jsr.io/@kravets/t-kassa-api/doc/~/encryptCardData)

Шифрует данные карты.

```ts
const cardData = encryptCardData(тк, {
    PAN: "4000000000000101",
    ExpDate: "1230",
    CVV: "111",
});

const tds = await тк.check3dsVersion({
    PaymentId: response.PaymentId,
    CardData: cardData,
});
```

##### [`fetchACSUrl`](https://jsr.io/@kravets/t-kassa-api/doc/~/fetchACSUrl)

Функция, которая отправляет запрос в сервис аутентификации банка (по `ACSUrl`) в зависимости от версии `3D-Secure`. Возвращает [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) с HTML формочкой, которую браузер сабмитнет сразу. Вместо этого метода рекомендуется использовать элемент `form` в `<body onload="document.form.submit()">`.

```ts
const response = await fetchACSUrl(finishAuthorize.ACSUrl, threeDS.version, {
    MD: finishAuthorize.MD,
    PaReq: finishAuthorize.PaReq,
    TermURL: "https://example.com",
    // other data
});
```

[Подробнее](https://www.tbank.ru/kassa/dev/payments/index.html#tag/Scenarii-oplaty-po-karte/Scenarii-platezha)

##### [`encryptCReq`](https://jsr.io/@kravets/t-kassa-api/doc/~/encryptCReq)

Функция для получения строкового представления `creq` (нужен для 3DS 2.0)

```ts
const str = encryptCReq({
    threeDSServerTransID: data.threeDSServerTransID,
    acsTransID: data.acsTransID,
    challengeWindowSize: data.challengeWindowSize,
    messageType: "CReq",
    messageVersion: threeDS.version,
});
```

##### [`encryptThreeDSMethodData`](https://jsr.io/@kravets/t-kassa-api/doc/~/encryptThreeDSMethodData)

Функция для получения строкового представления `ThreeDSMethodData`

```ts
const tds = await тк.check3dsVersion({
    PaymentId: response.PaymentId,
    CardData: CardData,
});

if (tds.ThreeDSMethodURL && tds.TdsServerTransID) {
    const data = encryptThreeDSMethodData({
        threeDSMethodNotificationURL: tds.ThreeDSMethodURL,
        threeDSServerTransID: tds.TdsServerTransID,
    });
}
```

### TODO:

-   поддержать `application/x-www-form-urlencoded`
