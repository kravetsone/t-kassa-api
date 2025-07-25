/**
 * @module
 *
 * Сгенерированные TypeScript типы для [API Т-Кассы](https://www.tbank.ru/kassa/dev/payments/index.html).
 */

/**
 * Сгенерированные из OpenAPI типы для `paths`
 */
export interface paths {
	"/v2/Init": {
		/**
		 * Инициировать платеж
		 * @description Метод инициирует платежную сессию.
		 *
		 */
		post: operations["Init"];
	};
	"/v2/Check3dsVersion": {
		/**
		 * Проверить версию 3DS
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *      <br><br> Метод возвращает версию протокола 3DS, по которому может аутентифицироваться карта.
		 *
		 *      При определении 3DS v2.1 возможно получение данных для прохождения дополнительного метода [3DS Method](#tag/Standartnyj-platezh/operation/3DSMethod). Он позволяет эмитенту собрать данные браузера клиента, что может быть полезно при принятии решения в пользу Frictionless Flow (аутентификация клиента без редиректа на страницу ACS).
		 *
		 */
		post: operations["Check3dsVersion"];
	};
	"/v2/3DSMethod": {
		/**
		 * Прохождение этапа “3DS Method”
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *
		 *     <br>Метод используется для сбора информации ACS-ом о девайсе. Обязателен, если для 3DSv2.1 в ответе метода [Check3dsVersion](#tag/Standartnyj-platezh/operation/Check3dsVersion) был получен параметр `ThreeDSMethodURL`.<br><br>Условия выполнения:<br>• В скрытом iframe на стороне браузера<br>• С таймаутом ожидания ответа на запрос - 10 секунд"
		 *
		 */
		post: operations["3DSMethod"];
	};
	"/v2/FinishAuthorize": {
		/**
		 * Подтвердить платеж
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *     <br><br> Метод подтверждает платеж передачей реквизитов. При одностадийной оплате — списывает средства
		 *     с карты клиента, при двухстадийной — блокирует указанную сумму. Используется, если у площадки есть сертификация PCI DSS и
		 *     собственная платежная форма.
		 *
		 */
		post: operations["FinishAuthorize"];
	};
	"/v2/AddCard": {
		/**
		 * Инициировать привязку карты к клиенту
		 * @description <br><br> Метод инициирует привязку карты к клиенту.
		 *     При успешной привязке переадресует клиента на `Success Add Card URL`,
		 *     при неуспешной — на `Fail Add Card URL`.
		 *     Можно использовать форму Т‑Бизнес или заменить ее на кастомную.
		 *
		 */
		post: operations["AddCard"];
	};
	"/v2/AttachCard": {
		/**
		 * Привязать карту
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *
		 *      <br> Завершает привязку карты к клиенту.
		 *      В случае успешной привязки переадресует клиента на **Success Add Card URL**
		 *      в противном случае на **Fail Add Card URL**.
		 *      Для прохождения 3DS второй версии перед вызовом метода должен быть вызван [Check3dsVersion](#tag/Standartnyj-platezh/operation/Check3dsVersion)
		 *      и выполнен [3DS Method](#tag/Standartnyj-platezh/operation/3DSMethod), который является обязательным при прохождении 3DS по протоколу версии
		 *      2.0.
		 *
		 */
		post: operations["AttachCard"];
	};
	"/v2/ACSUrl": {
		/**
		 * Запрос в банк-эмитент для прохождения 3DS
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *
		 *     <br>`ACSUrl` возвращается в ответе метода [FinishAuthorize](#tag/Standartnyj-platezh/operation/FinishAuthorize).<br>Если в ответе метода [FinishAuthorize](#tag/Standartnyj-platezh/operation/FinishAuthorize) возвращается статус `3DS_CHECKING`, то мерчанту необходимо сформировать запрос на URL ACS банка, выпустившего карту (параметр `ACSUrl`).<br>
		 *     **Для 3DS v2.1**: Компонент ACS использует пары сообщений `CReq` и `CRes` для выполнения проверки (Challenge). В ответ на полученное сообщение `CReq` компонент ACS формирует сообщение `CRes`, которое запрашивает держателя карты ввести данные для аутентификации. <br> <br> **Формат ответа:** `Cres`, полученный по `NotificationUrl` из запроса [FinishAuthorize](#tag/Standartnyj-platezh/operation/FinishAuthorize). <br>
		 *     При успешном результате прохождения 3-D Secure подтверждается инициированный платеж с помощью методов [Submit3DSAuthorization](#tag/Prohozhdenie-3DS/operation/Submit3DSAuthorization) или [Submit3DSAuthorizationV2](#tag/Prohozhdenie-3DS/operation/Submit3DSAuthorizationV2) в зависимости от версии 3DS<br>
		 *     **URL**: `ACSUrl` (возвращается в ответе метода [FinishAuthorize](#tag/Standartnyj-platezh/operation/FinishAuthorize)).
		 *
		 */
		post: operations["ACSUrl"];
	};
	"/v2/Confirm": {
		/**
		 * Подтвердить платеж
		 * @description Метод для списания заблокированных денежных средств. Используется при двухстадийном проведении платежа. Применим
		 *     только к платежам в статусе `AUTHORIZED`. Статус транзакции перед разблокировкой
		 *     — `CONFIRMING`. Сумма списания может быть меньше или равна сумме авторизации.
		 *
		 *
		 *     [Подробнее про двухстадийный платеж](https://www.tbank.ru/kassa/dev/payments/#tag/Scenarii-oplaty-po-karte/Scenarii-platezha)
		 *
		 */
		post: operations["Confirm"];
	};
	"/v2/Cancel": {
		/**
		 * Отменить платеж
		 * @description Отменяет платежную сессию. В зависимости от статуса платежа, переводит его в следующие состояния:
		 *     * `NEW` — `CANCELED`;
		 *     * `AUTHORIZED` — `PARTIAL_REVERSED`, если отмена не на полную сумму;
		 *     * `AUTHORIZED` — `REVERSED`, если отмена на полную сумму;
		 *     * `CONFIRMED` — `PARTIAL_REFUNDED`, если возврат не на полную сумму;
		 *     * `CONFIRMED` — `REFUNDED`, если возврат на полную сумму.
		 *
		 *     При оплате в рассрочку платеж можно отменить только в статусе `AUTHORIZED`.
		 *     При оплате «Долями» делается частичный или полный возврат, если операция в статусе `CONFIRMED` или `PARTIAL_REFUNDED`.
		 *
		 *     Если платеж находился в статусе `AUTHORIZED`, холдирование средств на карте
		 *     клиента отменяется. При переходе из статуса `CONFIRMED` денежные средства возвращаются на карту клиента.
		 *
		 */
		post: operations["Cancel"];
	};
	"/v2/Charge": {
		/**
		 * Автоплатеж
		 * @description ## Схема проведения рекуррентного платежа
		 *
		 *     Метод проводит рекуррентный (повторный) платеж — безакцептное списание денежных средств со счета банковской карты клиента.
		 *     Чтобы его использовать, клиент должен совершить хотя бы один платеж в пользу мерчанта, который должен быть указан как рекуррентный
		 *     (параметр `Recurrent` методе **Init**), но фактически являющийся первичным.
		 *
		 *     После завершения оплаты в уведомлении на `AUTHORIZED` или `CONFIRMED` будет передан параметр `RebillId`.
		 *
		 *     В дальнейшем для проведения рекуррентного платежа мерчант должен вызвать метод **Init**, указать нужную сумму для списания
		 *     в параметре `Amount`, а затем без переадресации на `PaymentURL` вызвать метод **Charge** для оплаты по тем же реквизитам
		 *     и передать параметр `RebillId`, полученный при совершении первичного платежа.
		 *
		 *     Метод **Charge** работает по одностадийной и двухстадийной схеме оплаты. Чтобы перейти на двухстадийную схему, нужно
		 *     переключить терминал в [личном кабинете](https://business.tbank.ru/oplata/main) и написать на <acq_help@tbank.ru> с просьбой переключить схему рекуррентов.
		 *
		 *     >По умолчанию метод **Charge** отключен. Чтобы его включить:
		 *     >- на DEMO-терминале — напишите на <acq_help@tbank.ru>;
		 *     >- на боевом терминале — обратитесь к своему персональному менеджеру.
		 *
		 *     При проведении рекуррентного платежа учитывайте взаимосвязь атрибута `RebillId` метода **Charge**:
		 *     * Со значениями атрибутов `OperationInitiatorType` и `Recurrent` метода **Init**;
		 *     * С типом терминала, который используется для проведения операций — ECOM или AFT.
		 *
		 *     Допустимые сценарии взаимосвязи:
		 *
		 *     |CIT/MIT|Тип операции|`OperationInitiator` в **Init**|`RebillId` в **Charge**|`Recurrent` в **Init**| AFT-терминал | ECOM-терминал |
		 *     |---|---|---|---|---|--------------|---------------|
		 *     |CIT|Credential-Not-Captured|0|null|N| Разрешено    | Разрешено     |
		 *     |CIT|Credential-Captured|1|null|Y| Разрешено    | Разрешено     |
		 *     |CIT|Credential-on-File|2|not null|N| Запрещено    | Разрешено     |
		 *     |MIT|Credential-on-File, Recurring|R|not null|N| Запрещено    | Разрешено     |
		 *     |MIT|Credential-on-File, Installment|I|not null|N| Разрешено    | Запрещено     |
		 *
		 *     Если передавать значения атрибутов, которые не соответствуют значениям в таблице, MAPI вернет ошибку `1126` —
		 *     несопоставимые значения `RebillId` или `Recurrent` с переданным значением `OperationInitiatorType`.
		 *
		 *     ## Одностадийная оплата
		 *
		 *     1. Проведите родительский платеж через метод **Init** с указанием дополнительных параметров `Recurrent=Y` и `CustomerKey`.
		 *     2. Только для `мерчантов без PCI DSS` — переадресуйте клиента на `PaymentUrl`.
		 *     3. После того как клиент оплатит заказ, в уведомлении о статусе `AUTHORIZED` или `CONFIRMED` будет передан параметр `RebillId`.
		 *     Сохраните его.
		 *     4. Через некоторое время для выполнения рекуррентного платежа вызовите метод **Init** со стандартными параметрами —
		 *     параметры `Recurrent` и `CustomerKey` в этом случае не нужны. Вернется параметр `PaymentId` — сохраните его.
		 *     5. Вызовите метод **Charge** с параметром `RebillId` из пункта 3 и `PaymentId` из пункта 4.
		 *     При успешном сценарии операция перейдет в статус `CONFIRMED`.
		 *
		 *
		 *     ## Двухстадийная оплата
		 *
		 *     1. Проведите родительский платеж через метод **Init** с указанием дополнительных параметров `Recurrent=Y` и `CustomerKey`.
		 *     2. Только для `мерчантов без PCI DSS` — переадресуйте клиента на `PaymentUrl`.
		 *     3. После того как клиент оплатит заказ, в уведомлении о статусе `AUTHORIZED` или `CONFIRMED` будет передан параметр `RebillId`.
		 *     Сохраните его.
		 *     4. Через некоторое время для выполнения рекуррентного платежа вызовите метод **Init** со стандартными параметрами —
		 *     параметры `Recurrent` и `CustomerKey` в этом случае не нужны. Вернется параметр `PaymentId` — сохраните его.
		 *     5. Вызовите метод **Charge** с параметром `RebillId` из пункта 3 и `PaymentId` из пункта 4.
		 *     6. Вызовите метод **Confirm** для подтверждения платежа.
		 *
		 */
		post: operations["ChargePCI"];
	};
	"/v2/GetState": {
		/**
		 * Получить статуса платежа
		 * @description Метод возвращает статус платежа.
		 *
		 */
		post: operations["GetState"];
	};
	"/v2/AddCustomer": {
		/**
		 * Зарегистрировать клиента
		 * @description Регистрирует клиента в связке с терминалом.
		 *
		 *     >Можно автоматически связать клиента с картой, которой был произведен платеж, если в методе **Init** передать параметр `CustomerKey`.
		 *     Это позволит сохранить и позже показывать клиенту замаскированный номер карты, по которой будет совершен рекуррентный платеж.
		 *
		 */
		post: operations["AddCustomer"];
	};
	"/v2/GetCustomer": {
		/**
		 * Получить данные клиента
		 * @description Возвращает данные клиента, сохраненные в связке с терминалом
		 *
		 */
		post: operations["GetCustomer"];
	};
	"/v2/RemoveCustomer": {
		/**
		 * Удалить данные клиента
		 * @description Метод для удаления сохраненных данных клиента.
		 *
		 */
		post: operations["RemoveCustomer"];
	};
	"/v2/GetAddCardState": {
		/**
		 * Получить статус привязки карты
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *
		 *     <br> Метод возвращает статус привязки карты
		 *
		 */
		post: operations["GetAddCardState"];
	};
	"/v2/GetCardList": {
		/**
		 * Получить список карт клиента
		 * @description Возвращает список всех привязанных карт клиента, включая удаленные
		 *
		 */
		post: operations["GetCardList"];
	};
	"/v2/RemoveCard": {
		/**
		 * Удалить привязанную карту клиента
		 * @description Метод для удаления привязанной карты клиента.
		 *
		 */
		post: operations["RemoveCard"];
	};
	"/v2/GetQr": {
		/**
		 * Сформировать QR
		 * @description Метод регистрирует QR и возвращает информацию о нем.
		 *     Вызывается после метода **Init**.
		 *
		 */
		post: operations["GetQr"];
	};
	"/v2/SubmitRandomAmount": {
		/**
		 * SubmitRandomAmount
		 * @deprecated
		 * @description Метод для подтверждения карты путем блокировки случайной суммы.
		 */
		post: operations["SubmitRandomAmount"];
	};
	"/v2/Submit3DSAuthorization": {
		/**
		 * Подтвердить прохождение 3DS v1.0
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *
		 *      Проверяет результаты прохождения 3-D Secure и при успешном прохождении
		 *      подтверждает инициированный платеж.
		 *      При использовании:
		 *      - одностадийной оплаты — списывает денежные средства с карты
		 *      клиента;
		 *      - двухстадийной оплаты — блокирует указанную сумму на карте клиента.
		 *
		 *      Формат запроса — `x-www-form-urlencoded`.
		 *
		 *
		 *      После того, как мерчант получит ответ ACS с результатами прохождения 3-D Secure на `TermUrl`, нужно
		 *      отправить запрос через метод **Submit3DSAuthorization**.
		 *
		 */
		post: operations["Submit3DSAuthorization"];
	};
	"/v2/Submit3DSAuthorizationV2": {
		/**
		 * Подтвердить прохождение 3DS v2.1
		 * @description `Для мерчантов c PCI DSS и собственной платежной формой`
		 *
		 *      Проверяет результаты прохождения 3-D Secure и при успешном прохождении
		 *      подтверждает инициированный платеж.
		 *      При использовании:
		 *      - одностадийной оплаты — списывает денежные средства с карты
		 *      клиента;
		 *      - двухстадийной оплаты — блокирует указанную сумму на карте клиента.
		 *
		 *      Формат запроса — `x-www-form-urlencoded`.
		 *
		 *      После того, как мерчант получит ответ ACS с результатами прохождения 3-D Secure на `cresCallbackUrl`, нужно
		 *      отправить запрос через метод **Submit3DSAuthorizationV2**.
		 *
		 */
		post: operations["Submit3DSAuthorizationV2"];
	};
	"/v2/TinkoffPay/terminals/{TerminalKey}/status": {
		/**
		 * Определить возможность проведения платежа
		 * @description Метод для определения возможности проведения платежа T‑Pay на терминале и устройстве.
		 *
		 */
		get: operations["Status"];
	};
	"/v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link": {
		/**
		 * Получить ссылку
		 * @description Метод получения Link для безусловного редиректа на мобильных устройствах
		 *
		 */
		get: operations["Link"];
	};
	"/v2/TinkoffPay/{paymentId}/QR": {
		/**
		 * Получить QR
		 * @description Метод получения QR для десктопов.
		 *
		 */
		get: operations["QR"];
	};
	"/v2/SberPay/{paymentId}/QR": {
		/**
		 * Получить QR
		 * @description Метод получения QR для десктопов.
		 *
		 */
		get: operations["SberPayQR"];
	};
	"/v2/SberPay/transactions/{paymentId}/link": {
		/**
		 * Получить ссылку
		 * @description Метод для получения ссылки SberPay.
		 *
		 */
		get: operations["SberPaylink"];
	};
	"/v2/QrMembersList": {
		/**
		 * Получить список банков-пользователей QR
		 * @description Метод возвращает список участников куда может быть осуществлен возврат платежа, совершенного
		 *     по QR.
		 *
		 */
		post: operations["QrMembersList"];
	};
	"/v2/AddAccountQr": {
		/**
		 * Привязать счёт к магазину
		 * @description Метод инициирует привязку счета клиента к магазину
		 *     и возвращает информацию о нем
		 *
		 */
		post: operations["AddAccountQr"];
	};
	"/v2/GetAddAccountQrState": {
		/**
		 * Получить статус привязки счета к магазину
		 * @description Метод возвращает статус привязки счета клиента по магазину
		 *
		 */
		post: operations["GetAddAccountQrState"];
	};
	"/v2/GetAccountQrList": {
		/**
		 * Получить список счетов, привязанных к магазину
		 * @description Метод возвращает список привязанных счетов клиента по магазину
		 */
		post: operations["GetAccountQrList"];
	};
	"/v2/ChargeQr": {
		/**
		 * Автоплатеж по QR
		 * @description Проведение платежа по привязанному счету по QR через СБП.
		 *     Для возможности его использования клиент должен совершить успешную привязку счета с
		 *     помощью метода **AddAccountQr**. После вызова метода будет отправлена нотификация на Notification
		 *     URL о привязке счета , в которой будет указан AccountToken.
		 *     Для совершения платежа по привязанному счету Мерчант должен вызвать метод **Init**, в котором поля
		 *     **Recurrent= Y** и **DATA= {“QR”:“true”}**, а затем вызвать метод **ChargeQr** для оплаты по тем же самым
		 *     реквизитам и передать параметр **AccountToken**, полученный после привязки счета по QR в
		 *     нотификации.
		 *
		 */
		post: operations["ChargeQr"];
	};
	"/v2/SbpPayTest": {
		/**
		 * Создать тестовую платежную сессию
		 * @description Тестовая платежная сессия с предопределенным статусом по СБП.
		 */
		post: operations["SbpPayTest"];
	};
	"/v2/GetQrState": {
		/**
		 * Получить статус возврата
		 * @description Возвращает статус возврата платежа по СБП
		 *
		 */
		post: operations["GetQrState"];
	};
	"/v2/CheckOrder": {
		/**
		 * Получить статус заказа
		 * @description Метод возвращает статус заказа.
		 *
		 */
		post: operations["CheckOrder"];
	};
	"/cashbox/SendClosingReceipt": {
		/**
		 * Отправить закрывающий чек в кассу
		 * @description Метод позволяет отправить закрывающий чек в кассу.
		 *     Условия работы метода:
		 *     - Закрывающий чек может быть отправлен, если платежная сессия по первому чеку находится в
		 *       статусе `CONFIRMED`.
		 *     - В платежной сессии был передан объект `Receipt`.
		 *     - В объекте `Receipt` был передан хотя бы один объект — `Receipt.Items.PaymentMethod` =
		 *       `full_prepayment`, `prepayment` или `advance`.
		 *
		 */
		post: operations["SendClosingReceipt"];
	};
	"/v2/MirPay/GetDeepLink": {
		/**
		 * Получить DeepLink
		 * @description Получение deeplink с включенным подписанным JWT-токеном. Предназначен для запроса по API
		 */
		post: operations["GetDeepLink"];
	};
	"/v2/GetTerminalPayMethods": {
		/**
		 * Проверить доступность методов на SDK
		 * @description Метод определяет доступность методов оплаты на терминале для SDK и API. Запрос не шифруется токеном
		 */
		get: operations["GetTerminalPayMethods"];
	};
	"/v2/getConfirmOperation": {
		/**
		 * Получить справку по операции
		 * @description Справку по конкретной операции можно получить на: <br><ul><li> URL-сервиса, который развернут на вашей стороне. Файл со справкой придет в формате `base64`;</li><li> электронную почту.</li></ul> Чтобы сформировать токен, нужно использовать только <code>PASSWORD</code> и <code>TERMINAL_KEY</code>.
		 */
		post: operations["GetConfirmOperation"];
	};
}
/**
 * Сгенерированные из OpenAPI типы для `webhooks`
 */
export interface webhooks {
	Notification: {
		/**
		 * Уведомления
		 * @description Метод для получения уведомлений об изменении статуса платежа. Реализуется на стороне мерчанта.
		 *
		 *     **Уведомление о привязке (NotificationAddCard)**
		 *
		 *     `Для мерчантов c PCI DSS и собственной платежной формой`
		 *
		 *     Уведомления магазину о статусе выполнения метода привязки карты — **AttachCard**.
		 *     После успешного выполнения метода **AttachCard** Т‑Бизнес отправляет POST-запрос с информацией о привязке карты.
		 *     Уведомление отправляется на ресурс мерчанта на адрес `Notification URL` синхронно и ожидает ответа в течение 10 секунд.
		 *     После получения ответа или не получения его за заданное время сервис переадресует клиента на `Success AddCard URL`
		 *     или `Fail AddCard URL` — в зависимости от результата привязки карты.
		 *     В случае успешной обработки нотификации мерчант должен вернуть ответ с телом сообщения `OK` — без тегов, заглавными английскими буквами.
		 *
		 *     Если тело сообщения отлично от `OK`, любая нотификация считается неуспешной, и сервис будет повторно отправлять
		 *     нотификацию раз в час в течение 24 часов. Если за это время нотификация так и не доставлена, она складывается в дамп.
		 *
		 *
		 *     **Нотификация о фискализации (NotificationFiscalization)**
		 *     <br><br> Если используется подключенная онлайн касса, по результату фискализации будет
		 *     отправлена нотификация с фискальными данными. Такие нотификации не отправляются маркетплейсам.
		 *
		 *
		 *     **Нотификация о статусе привязки счета по QR (NotificationQr)**
		 *     <br><br> После привязки счета по QR магазину отправляется статус привязки и токен.
		 *     Нотификация будет приходить по статусам `ACTIVE` и `INACTIVE`.
		 *
		 */
		post: operations["Notification"];
	};
}
/**
 * Сгенерированные из OpenAPI типы для `components`
 */
export interface components {
	schemas: {
		Common: {
			additionalProperties?: string;
			/**
			 * @description Признак инициатора операции:
			 *     * `0` — оплата без сохранения реквизитов карты для последующего использования. Сценарий «0 — CIT, Credential-Not-Captured».
			 *     * `1` — используется, если мерчант сохраняет карту. Сценарий «1 — Consumer-Initiated, Credential-Captured».
			 *     * `2` — операция по ранее сохранённой карте, инициирована клиентом. Сценарий «2 — Consumer-Initiated, Credential-on-File».
			 *     * `R` — повторяющаяся операция по сохранённой карте без графика. Является Merchant Initiated сценарием — «R = Merchant-Initiated, Credential-on-File, Recurring».
			 *     * `I` — повторяющаяся операция по сохраненной карте в соответствии с графиком платежей для погашения кредита. Является Merchant Initiated сценарием — «I = Merchant-Initiated, Credential-on-File, Installment».
			 *
			 *     При передаче в объекте `DATA` атрибута `OperationInitiatorType` учитывайте взаимосвязь его значений:
			 *       * со значением атрибута `Recurrent` в методе **Init**;
			 *       * со значением атрибута `RebillId` в методе **Charge**;
			 *       * с типом терминала, используемом для проведения операций — ECOM или AFT.
			 *
			 *       Подробная таблица — в разделе [Передача признака инициатора операции](#section/Peredacha-priznaka-iniciatora-operacii)
			 *
			 *       Если передавать значения атрибутов, которые не соответствуют таблице, MAPI вернет ошибку 1126 —  несопоставимые
			 *       значения `rebillId` или `Recurrent` с переданным значением `OperationInitiatorType`.
			 *
			 * @enum {string}
			 */
			OperationInitiatorType?: "0" | "1" | "2" | "R" | "I";
		};
		"T-Pay": {
			/**
			 * @description Тип устройства:
			 *     * `SDK` — вызов из мобильных приложений;
			 *     * `Desktop` — вызов из браузера с десктопа;
			 *     * `Mobile` — вызов из браузера с мобильных устройств.
			 *
			 * @example Desktop
			 * @enum {string}
			 */
			Device?: "SDK" | "Desktop" | "Mobile";
			/**
			 * @description ОС устройства.
			 * @example iOS
			 */
			DeviceOs?: string;
			/**
			 * @description Признак открытия в WebView.
			 * @example true
			 */
			DeviceWebView?: boolean;
			/**
			 * @description Браузер.
			 * @example Safari
			 */
			DeviceBrowser?: string;
			/**
			 * @description Признак проведения операции через T‑Pay по API.
			 * @example true
			 */
			TinkoffPayWeb?: boolean;
		};
		LongPay1: {
			/** @description Номера билетов с контрольной цифрой для всех пассажиров, летящих по одному маршруту. В качестве разделителя используйте `;`.
			 *
			 *     Необязателен, если передан параметр `ticketReservationNumber`.
			 *      */
			ticketNumber?: string;
			/** @description Номера билетов с контрольной цифрой для всех пассажиров, летящих по одному маршруту. В качестве разделителя используйте `;`.
			 *
			 *     Необязателен, если передан параметр `ticketNumber`.
			 *      */
			ticketReservationNumber?: string;
			/** @description Код системы продажи. */
			ticketSystem?: string;
			/** @description Код агентства. */
			ticketAgencyCode?: string;
			/** @description Название агентства. */
			ticketAgencyName?: string;
			/** @description Ограничения билета:
			 *     * `0` — без ограничений,
			 *     * `1` — невозвратный.
			 *      */
			ticketRestricted?: string;
		};
		/** @description `%` — порядковый номер пассажира от 1 до 4.
		 *      */
		LongPay2: {
			/** @description Фамилия латиницей. */
			"ticketPassengerSurname%": string;
			/** @description Имя латиницей. */
			"ticketPassengerFirstname%": string;
			/** @description Серия и номер паспорта. */
			"passengerPassport%"?: string;
			/** @description Гражданство по стандарту `ISO 3166-1 alpha-3`. */
			"passengerCountry%"?: string;
			/** @description Дата рождения в формате `YYYY-DD-MM`. */
			"ticketPassengerBirthDate%"?: string;
		};
		/** @description \`#` — порядковый номер пассажира от 1 до 4. */
		LongPay3: {
			/** @description Дата вылета в формате` YYYY-DD-MM`. */
			"triplegDate#": string;
			/** @description Время вылета в формате `hh24:mm:ss`. */
			"triplegTime#"?: string;
			/** @description Код перевозчика `ИАТА`. */
			"triplegCarrier#": string;
			/** @description Номер рейса. */
			"triplegFlightNumber#"?: string;
			/** @description Класс перелета. */
			"triplegClass#"?: string;
			/** @description Код аэропорта вылета ИАТА. */
			"triplegDestinationFrom#": string;
			/** @description Код аэропорта прилета ИАТА. */
			"triplegDestinationTo#": string;
			/** @description Код страны вылета по стандарту `ISO 3166-1 numeric`. */
			"triplegCountryFrom#"?: string;
			/** @description Код страны прилета по стандарту `ISO 3166-1 numeric`. */
			"triplegCountryTo#"?: string;
			/** @description Остановка при пересадке:
			 *     * `0` — разрешена,
			 *     * `X` — запрещена.
			 *      */
			"triplegStopover#"?: string;
			/** @description Код тарифа. */
			"triplegFareBasisCode#"?: string;
		};
		/** @description Расширенный набор параметров авиабилета передается при создании платежа (метод **Init**) в параметре `DATA`. */
		LongPay: {
			"\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0431\u0438\u043B\u0435\u0442\u0430"?: components["schemas"]["LongPay1"];
			"\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0430"?: components["schemas"]["LongPay2"];
			"\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u0435\u0440\u0435\u043B\u0435\u0442\u0430"?: components["schemas"]["LongPay3"];
		};
		/** @description Данные агента. Обязателен, если используется агентская схема.
		 *      */
		AgentData: {
			/**
			 * @description `Тег ФФД: 1222`
			 *
			 *
			 *     Признак агента. Возможные значения:
			 *     * `bank_paying_agent` — банковский платежный агент,
			 *     * `bank_paying_subagent` — банковский платежный субагент,
			 *     * `paying_agent` — платежный агент,
			 *     * `paying_subagent` — платежный субагент,
			 *     * `attorney` — поверенный,
			 *     * `commission_agent` — комиссионер,
			 *     * `another` — другой тип агента.
			 *
			 * @example paying_agent
			 */
			AgentSign?: string;
			/**
			 * @description `Тег ФФД: 1044`
			 *
			 *
			 *     Наименование операции.
			 *     Параметр обязательный, если `AgentSign` передан в значениях:
			 *     * `bank_paying_agent`,
			 *     * `bank_paying_subagent`.
			 *
			 * @example Позиция чека
			 */
			OperationName?: string;
			/**
			 * @description `Тег ФФД: 1073`
			 *
			 *
			 *     Телефоны платежного агента в формате `+{Ц}`.
			 *     Параметр обязательный, если в `AgentSign` передан в значениях:
			 *     * `bank_paying_agent`,
			 *     * `bank_paying_subagent`,
			 *     * `paying_agent`,
			 *     * `paying_subagent`.
			 *
			 * @example [
			 *       "+790912312398"
			 *     ]
			 */
			Phones?: string[];
			/**
			 * @description `Тег ФФД: 1074`
			 *
			 *
			 *     Телефоны оператора по приему платежей в формате `+{Ц}`.
			 *     Параметр обязательный, если в `AgentSign` передан в значениях:
			 *     * `paying_agent`,
			 *     * `paying_subagent`.
			 *
			 * @example [
			 *       "+79221210697",
			 *       "+79098561231"
			 *     ]
			 */
			ReceiverPhones?: unknown;
			/**
			 * @description `Тег ФФД: 1075`
			 *
			 *
			 *     Телефоны оператора перевода в формате `+{Ц}`.
			 *     Параметр обязательный, если в `AgentSign` передан в значениях:
			 *     * `bank_paying_agent`,
			 *     * `bank_paying_subagent`.
			 *
			 * @example [
			 *       "+79221210697"
			 *     ]
			 */
			TransferPhones?: unknown;
			/**
			 * @description `Тег ФФД: 1026`
			 *
			 *
			 *     Наименование оператора перевода.
			 *     Параметр обязательный, если в `AgentSign` передан в значениях:
			 *     * `bank_paying_agent`,
			 *     * `bank_paying_subagent`.
			 *
			 * @example Tinkoff
			 */
			OperatorName?: string;
			/**
			 * @description `Тег ФФД: 1005`
			 *
			 *
			 *     Адрес оператора перевода.
			 *     Параметр обязательный, если в `AgentSign` передан в значениях:
			 *     * `bank_paying_agent`,
			 *     * `bank_paying_subagent`.
			 *
			 * @example г. Тольятти
			 */
			OperatorAddress?: string;
			/**
			 * @description `Тег ФФД: 1016`
			 *
			 *
			 *     ИНН оператора перевода.
			 *     Параметр обязательный, если в `AgentSign` передан в значениях:
			 *     * `bank_paying_agent`,
			 *     * `bank_paying_subagent`.
			 *
			 * @example 7710140679
			 */
			OperatorInn?: string;
		};
		/** @description Данные поставщика платежного агента.
		 *     Обязателен, если передается значение `AgentSign` в объекте `AgentData`.
		 *      */
		SupplierInfo: {
			/**
			 * @description `Тег ФФД: 1171`
			 *
			 *
			 *     Телефон поставщика, в формате `+{Ц}`.
			 *     Атрибут обязателен, если передается значение `AgentSign`
			 *     в объекте `AgentData`.
			 *
			 * @example [
			 *       "+79221210697",
			 *       "+79098561231"
			 *     ]
			 */
			Phones?: string[];
			/**
			 * @description `Тег ФФД: 1225`
			 *
			 *
			 *     Наименование поставщика.
			 *     Атрибут обязателен, если передается значение `AgentSign`
			 *     в объекте `AgentData`.
			 *     Внимание: в эти 239 символов включаются телефоны поставщика
			 *     + 4 символа на каждый телефон.
			 *
			 *
			 *     Например, если передано два телефона поставщика длиной 12 и 14 символов,
			 *     максимальная длина наименования поставщика будет
			 *     239 – (12 + 4) – (14 + 4) = 205 символов.
			 *
			 * @example ООО Вендор товара
			 */
			Name?: string;
			/**
			 * @description `Тег ФФД: 1226`
			 *
			 *
			 *     ИНН поставщика в формате `ЦЦЦЦЦЦЦЦЦЦ`.
			 *     Атрибут обязателен, если передается значение `AgentSign`
			 *     в объекте `AgentData`.
			 *
			 * @example 7710140679
			 */
			Inn?: string;
		};
		Items_FFD_105: {
			/**
			 * @description `Тег ФФД: 1030`
			 *
			 *
			 *     Наименование товара.
			 *
			 * @example Наименование товара 1
			 */
			Name: string;
			/**
			 * @description `Тег ФФД: 1078`
			 *
			 *
			 *     Цена в копейках.
			 *
			 * @example 10000
			 */
			Price: number;
			/**
			 * @description `Тег ФФД: 1023`
			 *
			 *
			 *     Количество или вес товара.
			 *     Максимальное количество символов — 8, где целая часть — не больше 5 знаков, дробная — не больше 3 знаков для АТОЛ,
			 *     и 2 знаков для CloudPayments.
			 *
			 * @example 1
			 */
			Quantity: number;
			/**
			 * @description `Тег ФФД: 1043`
			 *
			 *
			 *     Стоимость товара в копейках.
			 *     Произведение `Quantity` и `Price`.
			 *
			 * @example 10000
			 */
			Amount: number;
			/**
			 * @description `Тег ФФД: 1214`
			 *
			 *
			 *     Возможные значения:
			 *     * `full_prepayment` — предоплата 100%,
			 *     * `prepayment` — предоплата,
			 *     * `advance` — аванс,
			 *     * `full_payment` — полный расчет,
			 *     * `partial_payment` — частичный расчет и кредит,
			 *     * `credit` — передача в кредит,
			 *     * `credit_payment` — оплата кредита.
			 *
			 *
			 *     Если значение не
			 *     передано, по умолчанию в онлайн-кассу
			 *     передается признак способа расчёта
			 *     `full_payment`.
			 *
			 * @default full_payment
			 * @enum {string}
			 */
			PaymentMethod:
				| "full_prepayment"
				| "prepayment"
				| "advance"
				| "full_payment"
				| "partial_payment"
				| "credit"
				| "credit_payment";
			/**
			 * @description `Тег ФФД: 1212`
			 *
			 *
			 *     Признак предмета расчета.
			 *     Возможные значения:
			 *     * `commodity` — товар,
			 *     * `excise` — подакцизный товар,
			 *     * `job` — работа,
			 *     * `service` — услуга,
			 *     * `gambling_bet` — ставка азартной игры,
			 *     * `gambling_prize` — выигрыш азартной игры,
			 *     * `lottery` — лотерейный билет,
			 *     * `lottery_prize` — выигрыш лотереи,
			 *     * `intellectual_activity` — предоставление результатов интеллектуальной деятельности,
			 *     * `payment` — платеж,
			 *     * `agent_commission` — агентское вознаграждение,
			 *     * `composite` — составной предмет расчета,
			 *     * `another` — иной предмет расчета,
			 *
			 *
			 *     Если значение не передано, по умолчанию в онлайн-кассу
			 *     отправляется признак предмета расчёта `commodity`.
			 *
			 * @default commodity
			 * @enum {string}
			 */
			PaymentObject:
				| "commodity"
				| "excise"
				| "job"
				| "service"
				| "gambling_bet"
				| "gambling_prize"
				| "lottery"
				| "lottery_prize"
				| "intellectual_activity"
				| "payment"
				| "agent_commission"
				| "composite"
				| "another";
			/**
			 * @description `Тег ФФД: 1199`
			 *
			 *
			 *     Ставка НДС.
			 *     Перечисление со значениями:
			 *     * `none` — без НДС,
			 *     * `vat0` — НДС по ставке 0%,
			 *     * `vat5` — НДС по ставке 5%,
			 *     * `vat7` — НДС по ставке 7%,
			 *     * `vat10` — НДС по ставке 10%,
			 *     * `vat20` — НДС по ставке 20%,
			 *     * `vat105` — НДС чека по расчетной ставке 5/105,
			 *     * `vat107` — НДС чека по расчетной ставке 7/107,
			 *     * `vat110` — НДС чека по расчетной ставке 10/110,
			 *     * `vat120` — НДС чека по расчетной ставке 20/120.
			 *
			 * @example vat10
			 * @enum {string}
			 */
			Tax:
				| "none"
				| "vat0"
				| "vat5"
				| "vat7"
				| "vat10"
				| "vat20"
				| "vat105"
				| "vat107"
				| "vat110"
				| "vat120";
			/**
			 * @description `Тег ФФД: 1162`
			 *
			 *
			 *     Штрих-код в требуемом формате. В зависимости от
			 *     типа кассы требования могут отличаться:
			 *     * АТОЛ Онлайн — шестнадцатеричное
			 *     представление с пробелами. Максимальная
			 *     длина – 32 байта (^[a-fA-F0-9]{2}$)|(^([afA-F0-9]{2}\\s){1,31}[a-fA-F0-9]{2}$).
			 *
			 *     Пример:
			 *     `00 00 00 01 00 21 FA 41 00 23 05 41 00
			 *     00 00 00 00 00 00 00 00 00 00 00 00 00
			 *     00 00 12 00 AB 00`
			 *
			 *     * CloudKassir — длина строки: четная, от 8 до
			 *     150 байт. То есть от 16 до 300 ASCII символов
			 *     ['0' - '9' , 'A' - 'F' ] шестнадцатеричного
			 *     представления кода маркировки товара.
			 *
			 *     Пример:
			 *     `303130323930303030630333435`
			 *
			 *
			 *     * OrangeData — строка, содержащая `base64`-
			 *     кодированный массив от 8 до 32 байт.
			 *
			 *     Пример:
			 *     `igQVAAADMTIzNDU2Nzg5MDEyMwAAAAAAAQ==`
			 *
			 *     Если в запросе передается параметр Ean13, не
			 *     прошедший валидацию, возвращается неуспешный
			 *     ответ с текстом ошибки в параметре `message` =
			 *     `Неверный параметр Ean13`.
			 *
			 * @example 0123456789
			 */
			Ean13?: string;
			/**
			 * @description Код магазина. Для параметра `ShopСode`
			 *     нужно использовать значение параметра
			 *     `Submerchant_ID`, который возвращается в ответн при
			 *     регистрации магазинов через XML. Если XML не
			 *     используется, передавать поле не нужно.
			 *
			 * @example 12345
			 */
			ShopCode?: string;
			/** @description Данные агента.
			 *     Используется при работе по агентской схеме.
			 *      */
			AgentData?: components["schemas"]["AgentData"];
			/** @description Данные поставщика платежного агента.
			 *     Обязателен, если передается значение `AgentSign` в объекте `AgentData`.
			 *      */
			SupplierInfo?: components["schemas"]["SupplierInfo"];
		};
		/** @description Детали платежа.
		 *
		 *
		 *     Если объект не передан, автоматически указывается итоговая сумма чека с видом оплаты «Безналичный».
		 *
		 *     Если передан объект `receipt.Payments`, значение в `Electronic` должно быть равно итоговому значению `Amount` в методе **Init**.
		 *     При этом сумма введенных значений по всем видам оплат, включая `Electronic`, должна быть равна сумме (**Amount**) всех товаров,
		 *     переданных в объекте `receipt.Items`.
		 *      */
		Payments: {
			/**
			 * @description `Тег ФФД: 1031.`<br>
			 *
			 *     Вид оплаты «Наличные».
			 *     Сумма к оплате в копейках.
			 *
			 * @example 90000
			 */
			Cash?: number;
			/**
			 * @description `Тег ФФД: 1081.`<br>
			 *
			 *     Вид оплаты «Безналичный».
			 *
			 * @example 50000
			 */
			Electronic: number;
			/**
			 * @description `Тег ФФД: 1215.`<br>
			 *
			 *     Вид оплаты «Предварительная оплата (Аванс)».
			 *
			 * @example 0
			 */
			AdvancePayment?: number;
			/**
			 * @description `Тег ФФД: 1216.`<br>
			 *
			 *     Вид оплаты «Постоплата (Кредит)».
			 *
			 * @example 0
			 */
			Credit?: number;
			/**
			 * @description `Тег ФФД: 1217.`<br>
			 *
			 *     Вид оплаты «Иная форма оплаты».
			 *
			 * @example 0
			 */
			Provision?: number;
		};
		/** @description Объект с информацией о видах суммы платежа. Если объект не передан, автоматически указывается итоговая сумма чека с видом оплаты «Безналичная». */
		Receipt_FFD_105: {
			/** @description Массив позиций чека с информацией о товарах (не более 100 позиций). */
			Items: components["schemas"]["Items_FFD_105"][];
			/**
			 * @description Версия ФФД. Возможные значения:
			 *     * FfdVersion: `1.2`,
			 *     * FfdVersion: `1.05`.
			 *
			 *     Версия ФФД по умолчанию — `1.05`.
			 *
			 * @default 1.05
			 */
			FfdVersion: string;
			/**
			 * Format: email
			 * @description `Тег ФФД: 1008.`<br>
			 *
			 *     Электронная почта клиента.
			 *     Параметр должен быть заполнен, если не передано значение
			 *     в параметре `Phone`.
			 *
			 * @example a@test.ru
			 */
			Email?: string;
			/**
			 * @description `Тег ФФД: 1008.`<br>
			 *
			 *     Телефон клиента в формате `+{Ц}`.
			 *     Параметр должен быть заполнен, если не передано значение
			 *     в параметре `Email`.
			 *
			 * @example +79031234567
			 */
			Phone?: string;
			/**
			 * @description `Тег ФФД: 1055.`
			 *
			 *
			 *     Система налогообложения. Возможные значения:
			 *     * `osn` — общая СН;
			 *     * `usn_income` — упрощенная СН (доходы);
			 *     * `usn_income_outcome` — упрощенная СН (доходы минус расходы);
			 *     * `esn` — единый сельскохозяйственный налог;
			 *     * `patent` — патентная СН.
			 *
			 * @example osn
			 * @enum {string}
			 */
			Taxation: "osn" | "usn_income" | "usn_income_outcome" | "esn" | "patent";
			/** @description Объект c информацией о видах суммы платежа.
			 *     Смотрите структуру объекта `Payments`.
			 *     - Если объект не передан, автоматически указывается итоговая
			 *     сумма чека с видом оплаты «Безналичный».
			 *     - Если передан объект `receipt.Payments`, значение в `Electronic`
			 *     должно быть равно итоговому значению `Amount` в методе **Init**.
			 *     При этом сумма введенных значений по всем видам оплат,
			 *     включая `Electronic`, должна быть равна сумме (**Amount**) всех товаров,
			 *     переданных в объекте `receipt.Items`.
			 *      */
			Payments?: components["schemas"]["Payments"];
		};
		/** @description Информация по клиенту.
		 *      */
		ClientInfo: {
			/** @description `Тег ФФД: 1243`
			 *
			 *
			 *     Дата рождения клиента в формате `ДД.ММ.ГГГГ`.
			 *      */
			Birthdate?: string;
			/** @description `Тег ФФД: 1244`
			 *
			 *
			 *     Числовой код страны, гражданином которой является
			 *     клиент. Код страны указывается в соответствии с
			 *     Общероссийским классификатором стран мира [ОКСМ](https://classifikators.ru/oksm).
			 *      */
			Citizenship?: string;
			/**
			 * @description `Тег ФФД: 1245`
			 *
			 *
			 *     Числовой код вида документа, удостоверяющего
			 *     личность.
			 *
			 *     Может принимать только следующие значения:
			 *
			 *     |Код|Описание|
			 *     |---|---|
			 *     | 21 | Паспорт гражданина Российской Федерации|
			 *     | 22 | Паспорт гражданина Российской Федерации, дипломатический паспорт, служебный паспорт, удостоверяющие личность гражданина Российской Федерации за пределами Российской Федерации|
			 *     | 26 | Временное удостоверение личности гражданина Российской Федерации, выдаваемое на период оформления паспорта гражданина Российской Федерации|
			 *     | 27 | Свидетельство о рождении гражданина Российской Федерации — для граждан Российской Федерации в возрасте до 14 лет|
			 *     | 28 | Иные документы, признаваемые документами, удостоверяющими личность гражданина Российской Федерации в соответствии с законодательством Российской Федерации|
			 *     | 31 | Паспорт иностранного гражданина|
			 *     | 32 | Иные документы, признаваемые документами, удостоверяющими личность иностранного гражданина в соответствии с законодательством Российской Федерации и международным договором Российской Федерации|
			 *     | 33 | Документ, выданный иностранным государством и признаваемый в соответствии с международным договором Российской Федерации в качестве документа, удостоверяющего личность лица безгражданства.|
			 *     | 34 | Вид на жительство — для лиц без гражданства|
			 *     | 35 | Разрешение на временное проживание — для лиц без гражданства|
			 *     | 36 | Свидетельство о рассмотрении ходатайства о признании лица без гражданства беженцем на территории Российской Федерации по существу|
			 *     | 37 | Удостоверение беженца|
			 *     | 38 | Иные документы, признаваемые документами, удостоверяющими личность лиц без гражданства в соответствии с законодательством Российской Федерации и международным договором Российской Федерации|
			 *     | 40 | Документ, удостоверяющий личность лица, не имеющего действительного документа, удостоверяющего личность, на период рассмотрения заявления о признании гражданином Российской Федерации или о приеме в гражданство Российской Федерации|
			 *
			 * @example 21
			 */
			"Document\u0421ode"?: string;
			/** @description `Тег ФФД: 1246`
			 *
			 *
			 *     Реквизиты документа, удостоверяющего личность — например, серия и номер паспорта.
			 *      */
			DocumentData?: string;
			/** @description `Тег ФФД: 1254`
			 *
			 *
			 *     Адрес клиента-грузополучателя.
			 *      */
			Address?: string;
		};
		/** @description Код маркировки в машиночитаемой форме,
		 *     представленный в виде одного из видов кодов,
		 *     формируемых в соответствии с требованиями,
		 *     предусмотренными правилами, для нанесения
		 *     на потребительскую упаковку, или на товары,
		 *     или на товарный ярлык
		 *
		 *
		 *     Включается в чек, если предметом расчета является товар, подлежащий обязательной маркировке средством идентификации — соответствующий
		 *     код в поле `paymentObject`.
		 *      */
		MarkCode: {
			/**
			 * @description Тип штрих кода.
			 *     Возможные значения:
			 *     * `UNKNOWN` — код товара, формат которого не
			 *     идентифицирован, как один из реквизитов;
			 *     * `EAN8` — код товара в формате EAN-8;
			 *     * `EAN13` — код товара в формате EAN-13;
			 *     * `ITF14` — код товара в формате ITF-14;
			 *     * `GS10` — код товара в формате GS1,
			 *     нанесенный на товар, не подлежащий
			 *     маркировке;
			 *     * `GS1M` — код товара в формате GS1,
			 *     нанесенный на товар, подлежащий
			 *     маркировке;
			 *     * `SHORT` — код товара в формате короткого кода
			 *     маркировки, нанесенный на товар;
			 *     * `FUR` — контрольно-идентификационный знак
			 *     мехового изделия;
			 *     * `EGAIS20` — код товара в формате ЕГАИС-2.0;
			 *     * `EGAIS30` — код товара в формате ЕГАИС-3.0;
			 *     * `RAWCODE` — код маркировки, как он был прочитан сканером.
			 *
			 * @example EAN8
			 */
			MarkCodeType: string;
			/**
			 * @description Код маркировки.
			 *
			 * @example 12345678
			 */
			Value: string;
		};
		/** @description Реквизит «дробное количество маркированного товара».
		 *     Передается, только если расчет осуществляется
		 *     за маркированный товар — соответствующий код в поле
		 *     `paymentObject`, и значение в поле `measurementUnit`
		 *     равно `0`.
		 *
		 *     `MarkQuantity` не является обязательным объектом, в том числе для товаров с маркировкой. Этот объект можно передавать,
		 *      если товар с маркировкой. То есть даже при ФФД 1.2 этот объект не является обязательным.
		 *
		 *
		 *     Пример:
		 *     ```
		 *           {
		 *           "numenator": "1"
		 *           "denominator" "2"
		 *           }
		 *     ```
		 *      */
		MarkQuantity: {
			/**
			 * @description `Тег ФФД: 1293`
			 *
			 *
			 *     Числитель дробной части предмета расчета.
			 *     Значение должно быть строго меньше
			 *     значения реквизита «знаменатель».
			 *
			 * @example 1
			 */
			Numerator?: number;
			/**
			 * @description `Тег ФФД: 1294`
			 *
			 *
			 *     Знаменатель дробной части предмета расчета.
			 *     Значение равно количеству товара в партии (упаковке),
			 *     имеющей общий код маркировки товара.
			 *
			 * @example 2
			 */
			Denominator?: number;
		};
		/** @description Отраслевой реквизит предмета расчета. Указывается только для товаров подлежащих обязательной маркировке средством
		 *     идентификации. Включение этого реквизита предусмотрено НПА отраслевого регулирования для
		 *     соответствующей товарной группы.
		 *      */
		SectoralItemProps: {
			/**
			 * @description `Тег ФФД: 1262`
			 *
			 *
			 *     Идентификатор ФОИВ — федеральный орган
			 *     исполнительной власти.
			 *
			 * @example 001
			 */
			FederalId: string;
			/**
			 * Format: date
			 * @description `Тег ФФД: 1263`
			 *
			 *
			 *     Дата нормативного акта ФОИВ.
			 *
			 * @example 21.11.2020
			 */
			Date: string;
			/**
			 * @description `Тег ФФД: 1264`
			 *
			 *
			 *     Номер нормативного акта ФОИВ.
			 *
			 * @example 123/43
			 */
			Number: string;
			/**
			 * @description `Тег ФФД: 1265`
			 *
			 *
			 *     Состав значений, определенных нормативным актом ФОИВ.
			 *
			 * @example test value SectoralItemProps
			 */
			Value: string;
		};
		Items_FFD_12: {
			AgentData?: components["schemas"]["AgentData"];
			SupplierInfo?: components["schemas"]["SupplierInfo"];
			/**
			 * @description `Тег ФФД: 1030`
			 *
			 *
			 *     Наименование товара.
			 *
			 * @example Наименование товара 1
			 */
			Name: string;
			/**
			 * @description `Тег ФФД: 1079`
			 *
			 *
			 *     Цена в копейках.
			 *
			 * @example 10000
			 */
			Price: number;
			/**
			 * @description `Тег ФФД: 1023`
			 *
			 *
			 *     Количество или вес товара.
			 *     * Максимальное количество символов — 8, где целая часть — не больше 5 знаков, дробная — не больше 3 знаков для Атол и
			 *     2 знаков для CloudPayments.
			 *     * Значение `1`, если передан объект `MarkCode`.
			 *
			 * @example 1
			 */
			Quantity: number;
			/**
			 * @description `Тег ФФД: 1043`
			 *
			 *
			 *     Стоимость товара в копейках.
			 *     Произведение `Quantity` и `Price`.
			 *
			 * @example 10000
			 */
			Amount: number;
			/**
			 * @description `Тег ФФД: 1199`
			 *
			 *
			 *     Ставка НДС.
			 *     Возможные значения:
			 *     * `none` — без НДС,
			 *     * `vat0` — НДС по ставке 0%;
			 *     * `vat5` — НДС по ставке 5%;
			 *     * `vat7` — НДС по ставке 7%;
			 *     * `vat10` — НДС по ставке 10%;
			 *     * `vat20` — НДС по ставке 20%;
			 *     * `vat105` — НДС чека по расчетной ставке 5/105;
			 *     * `vat107` — НДС чека по расчетной ставке 7/107;
			 *     * `vat110` — НДС чека по расчетной ставке 10/110;
			 *     * `vat120` — НДС чека по расчетной ставке 20/120.
			 *
			 * @example vat10
			 * @enum {string}
			 */
			Tax:
				| "none"
				| "vat0"
				| "vat5"
				| "vat7"
				| "vat10"
				| "vat20"
				| "vat105"
				| "vat107"
				| "vat110"
				| "vat120";
			/**
			 * @description `Тег ФФД: 1214`
			 *
			 *
			 *     Возможные значения:
			 *      * `full_prepayment` — предоплата 100%,
			 *      * `prepayment` — предоплата,
			 *      * `advance` — аванс,
			 *      * `full_payment` — полный расчет,
			 *      * `partial_payment` — частичный расчет и кредит,
			 *      * `credit` — передача в кредит,
			 *      * `credit_payment` — оплата кредита.
			 *
			 *
			 *     Если значение не передано, по умолчанию в онлайн-кассу
			 *     передается признак способа расчёта
			 *     `full_payment`.
			 *
			 * @example full_payment
			 * @enum {string}
			 */
			PaymentMethod:
				| "full_prepayment"
				| "prepayment"
				| "advance"
				| "full_payment"
				| "partial_payment"
				| "credit"
				| "credit_payment";
			/**
			 * @description `Тег ФФД: 1212`
			 *
			 *
			 *     Значения реквизита «признак предмета расчета» — тег 1212, таблица 101.
			 *     Возможные значения:
			 *     * `commodity` — товар,
			 *     * `excise` — подакцизный товар,
			 *     * `job` — работа,
			 *     * `service` — услуга,
			 *     * `gambling_bet` — ставка азартной игры,
			 *     * `gambling_prize` — выигрыш азартной игры,
			 *     * `lottery` — лотерейный билет,
			 *     * `lottery_prize` — выигрыш лотереи,
			 *     * `intellectual_activity` — предоставление,
			 *       результатов интеллектуальной деятельности,
			 *     * `payment` — платеж,
			 *     * `agent_commission` — агентское
			 *       вознаграждение,
			 *     * `contribution` — выплата,
			 *     * `property_rights` — имущественное право,
			 *     * `unrealization` — внереализационный доход,
			 *     * `tax_reduction` — иные платежи и взносы,
			 *     * `trade_fee` — торговый сбор,
			 *     * `resort_tax` — курортный сбор,
			 *     * `pledge` — залог,
			 *     * `income_decrease` — расход,
			 *     * `ie_pension_insurance_without_payments` — взносы на ОПС ИП,
			 *     * `ie_pension_insurance_with_payments` — взносы на ОПС,
			 *     * `ie_medical_insurance_without_payments` — взносы на ОМС ИП,
			 *     * `ie_medical_insurance_with_payments` — взносы на ОМС,
			 *     * `social_insurance` — взносы на ОСС,
			 *     * `casino_chips` — платеж казино,
			 *     * `agent_payment` — выдача ДС,
			 *     * `excisable_goods_without_marking_code` — АТНМ,
			 *     * `excisable_goods_with_marking_code` — АТМ,
			 *     * `goods_without_marking_code` — ТНМ,
			 *     * `goods_with_marking_code` — ТМ,
			 *     * `another` — иной предмет расчета.
			 *
			 * @example goods_with_marking_code
			 * @enum {string}
			 */
			PaymentObject:
				| "commodity"
				| "excise"
				| "job"
				| "service"
				| "gambling_bet"
				| "gambling_prize"
				| "lottery"
				| "lottery_prize"
				| "intellectual_activity"
				| "payment"
				| "agent_commission"
				| "contribution"
				| "property_rights"
				| "unrealization"
				| "tax_reduction"
				| "trade_fee"
				| "resort_tax"
				| "pledge"
				| "income_decrease"
				| "ie_pension_insurance_without_payments"
				| "ie_pension_insurance_with_payments"
				| "ie_medical_insurance_without_payments"
				| "ie_medical_insurance_with_payments"
				| "social_insurance"
				| "casino_chips"
				| "agent_payment"
				| "excisable_goods_without_marking_code"
				| "excisable_goods_with_marking_code"
				| "goods_without_marking_code"
				| "goods_with_marking_code"
				| "another";
			/**
			 * @description `Тег ФФД: 1191`
			 *
			 *
			 *     Дополнительный реквизит предмета расчета.
			 *
			 * @example Данные пользователя ext.test.qa@tinkoff.ru
			 */
			UserData?: string;
			/**
			 * @description `Тег ФФД: 1229`
			 *
			 *
			 *     Сумма акциза в рублях с учетом копеек,
			 *     включенная в стоимость предмета расчета:
			 *     * целая часть — не больше 8 знаков;
			 *     * дробная часть — не больше 2 знаков;
			 *     * значение не может быть отрицательным.
			 *
			 * @example 12.2
			 */
			Excise?: string;
			/**
			 * @description `Тег ФФД: 1230`
			 *
			 *
			 *     Цифровой код страны происхождения товара в
			 *     соответствии с Общероссийским
			 *     классификатором стран мира — 3 цифры.
			 *
			 * @example 056
			 */
			CountryCode?: string;
			/**
			 * @description `Тег ФФД: 1231`
			 *
			 *
			 *     Номер таможенной декларации.
			 *
			 * @example 12345678901
			 */
			DeclarationNumber?: string;
			/**
			 * @description `Тег ФФД: 2108`
			 *
			 *
			 *     Единицы измерения.
			 *
			 *
			 *     Возможные варианты описаны в разделе<a href="https://www.tbank.ru/kassa/dev/payments/#tag/Opisanie-dopolnitelnyh-obuektov" target="_blank"> дополнительных объектов</a>. Также возможна передача произвольных значений.
			 *
			 *     `MeasurementUnit` обязателен, если версия ФД онлайн-кассы — 1.2.
			 *
			 * @example шт
			 */
			MeasurementUnit: string;
			/** @description `Тег ФФД: 2102`
			 *
			 *
			 *     Режим обработки кода маркировки.
			 *     Должен принимать значение, равное `0`.
			 *     Включается в чек , если предметом расчета
			 *     является товар, подлежащий обязательной
			 *     маркировке средством идентификации — соответствующий код в поле `paymentObject`.
			 *      */
			MarkProcessingMode?: string;
			/** @description `Тег ФФД: 1163`
			 *
			 *
			 *     Код маркировки в машиночитаемой форме,
			 *     представленный в виде одного из видов кодов,
			 *     формируемых в соответствии с требованиями,
			 *     предусмотренными правилами, для нанесения
			 *     на потребительскую упаковку, или на товары,
			 *     или на товарный ярлык.
			 *
			 *
			 *     Включается в чек, если предметом расчета является товар, подлежащий обязательной маркировке средством идентификации — соответствующий
			 *     код в поле `paymentObject`.
			 *      */
			MarkCode?: components["schemas"]["MarkCode"];
			MarkQuantity?: components["schemas"]["MarkQuantity"];
			/** @description Отраслевой реквизит предмета расчета. Указывается только для товаров подлежащих обязательной маркировке средством
			 *     идентификации. Включение этого реквизита предусмотрено НПА отраслевого регулирования для
			 *     соответствующей товарной группы.
			 *      */
			SectoralItemProps?: components["schemas"]["SectoralItemProps"][];
		};
		/** @description Объект с информацией о видах суммы платежа. Если объект не передан, автоматически указывается итоговая сумма чека с видом оплаты «Безналичная». */
		Receipt_FFD_12: {
			/** @description Версия ФФД.
			 *     Возможные значения:
			 *     * FfdVersion: 1.2,
			 *     * FfdVersion: 1.05.
			 *      */
			FfdVersion: string;
			ClientInfo?: components["schemas"]["ClientInfo"];
			/**
			 * @description `Тег ФФД: 1055`
			 *
			 *
			 *     Система налогообложения. Возможные значения:
			 *     * `osn` — общая СН,
			 *     * `usn_income` — упрощенная СН (доходы),
			 *     * `usn_income_outcome` — упрощенная СН (доходы минус расходы),
			 *     * `esn` — единый сельскохозяйственный налог,
			 *     * `patent` — патентная СН.
			 *
			 * @example osn
			 * @enum {string}
			 */
			Taxation: "osn" | "usn_income" | "usn_income_outcome" | "esn" | "patent";
			/**
			 * Format: email
			 * @description `Тег ФФД: 1008`
			 *
			 *
			 *     Электронная почта клиента.
			 *     Параметр должен быть заполнен, если не передано значение
			 *     в параметре `Phone`.
			 *
			 * @example a@test.ru
			 */
			Email?: string;
			/**
			 * @description `Тег ФФД: 1008`
			 *
			 *
			 *     Телефон клиента в формате `+{Ц}`.
			 *     Параметр должен быть заполнен, если не передано значение
			 *     в параметре `Email`.
			 *
			 * @example +79031234567
			 */
			Phone?: string;
			/**
			 * @description `Тег ФФД: 1227`
			 *
			 *
			 *     Идентификатор/имя клиента.
			 *
			 * @example 78894325
			 */
			Customer?: string;
			/**
			 * @description `Тег ФФД: 1228`
			 *
			 *
			 *     ИНН клиента.
			 *
			 * @example 788621292
			 */
			CustomerInn?: string;
			/** @description Массив, содержащий в себе информацию о товарах (не более 100 позиций).
			 *
			 *
			 *     Атрибуты, предусмотренные в протоколе для отправки чеков по маркируемым товарам, не являются
			 *     обязательными для товаров без маркировки. Если используется ФФД 1.2, но реализуемый товар не
			 *     подлежит маркировке, поля можно не отправлять или отправить со значением null.
			 *      */
			Items: components["schemas"]["Items_FFD_12"][];
			/** @description Объект c информацией о видах суммы платежа.
			 *     Смотрите структуру объекта `Payments`.
			 *     1. Если объект не передан, будет автоматически указана итоговая
			 *     сумма чека с видом оплаты «Безналичный».
			 *     2. Если передан объект `receipt.Payments`, значение в `Electronic`
			 *     должно быть равно итоговому значению `Amount` в методе **Init**.
			 *     При этом сумма введенных значений по всем видам оплат,
			 *     включая `Electronic`, должна быть равна сумме (**Amount**) всех товаров,
			 *     переданных в объекте `receipt.Items`
			 *      */
			Payments?: components["schemas"]["Payments"];
		};
		/** @description JSON-объект с данными маркетплейса. Обязательный для маркетплейсов. */
		Shops: {
			/**
			 * @description Код магазина
			 *
			 * @example 700456
			 */
			ShopCode: string;
			/**
			 * @description Cумма в копейках, которая относится к
			 *     указанному `ShopCode`.
			 *
			 * @example 10000
			 */
			Amount: number;
			/**
			 * @description Наименование товара.
			 *
			 * @example Товар
			 */
			Name?: string;
			/**
			 * @description Сумма комиссии в копейках, удерживаемая из
			 *     возмещения партнера в пользу маркетплейса.
			 *     Если не передано, используется комиссия,
			 *     указанная при регистрации.
			 *
			 * @example 500
			 */
			Fee?: string;
		};
		Init_FULL: {
			/**
			 * @description Идентификатор терминала. <br>
			 *     Выдается мерчанту в Т‑Бизнес при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description * Сумма в копейках. Например, 3 руб. 12коп. — это число 312.
			 *     * Параметр должен быть равен сумме всех параметров `Amount`, переданных в объекте `Items`.
			 *     * Минимальная сумма операции с помощью СБП составляет 10 руб.
			 *
			 * @example 140000
			 */
			Amount: number;
			/**
			 * @description Идентификатор заказа в системе мерчанта. Должен быть уникальным для каждой операции.
			 * @example 21050
			 */
			OrderId: string;
			/**
			 * @description Подпись запроса.
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token: string;
			/**
			 * @description Описание заказа.
			 *     Значение параметра будет отображено на платежной форме.
			 *
			 *
			 *     Для привязки и одновременной оплаты по СБП поле обязательное. При оплате через СБП эта информация
			 *     отобразится в мобильном банке клиента.
			 *
			 * @example Подарочная карта на 1400.00 рублей
			 */
			Description?: string;
			/** @description Идентификатор клиента в системе мерчанта.
			 *
			 *     * Обязателен, если передан атрибут `Recurrent`.
			 *     * Если был передан в запросе, в нотификации будет указан `CustomerKey` и его `CardId`. Подробнее — в методе
			 *     [GetCardList](#tag/Metody-raboty-s-kartami/paths/~1GetCardList/post).
			 *     * Нужен для сохранения карт на платежной форме — платежи в один клик.
			 *     * Необязателен при рекуррентных платежах через СБП.
			 *      */
			CustomerKey?: string;
			/**
			 * @description Признак родительского рекуррентного платежа. Обязателен для регистрации автоплатежа.
			 *
			 *
			 *     Если передается и установлен в `Y`, регистрирует платеж как рекуррентный.
			 *     В этом случае после оплаты в нотификации на `AUTHORIZED` будет передан параметр `RebillId` для использования в методе **Charge**.
			 *     Для привязки и одновременной оплаты по CБП передавайте `Y`.
			 *
			 *     Значение зависит от атрибутов:
			 *
			 *     * `OperationInitiatorType` — в методе `/init`,
			 *     * `Recurrent` — в методе `/Init`.
			 *
			 *
			 *     Подробнее — в описании методов [Рекуррентный платёж](#tag/Rekurrentnyj-platyozh) и [Инициализация платежа](#tag/Standartnyj-platyozh/paths/~1Init/post).
			 *
			 * @example Y
			 */
			Recurrent?: string;
			/**
			 * @description Определяет тип проведения платежа — двухстадийная или одностадийная оплата:
			 *
			 *     * `O` — одностадийная оплата,
			 *     * `T` — двухстадийная оплата.
			 *
			 *
			 *     Если параметр передан — используется его значение, если нет — значение из настроек терминала.
			 *
			 * @enum {string}
			 */
			PayType?: "O" | "T";
			/**
			 * @description Язык платежной формы:
			 *
			 *     * `ru` — русский,
			 *     * `en` — английский.
			 *
			 *
			 *     Если не передан, форма откроется на русском языке.
			 *
			 * @example ru
			 */
			Language?: string;
			/**
			 * Format: uri
			 * @description URL на веб-сайте мерчанта, куда будет отправлен POST-запрос о статусе выполнения вызываемых методов — настраивается
			 *     в личном кабинете. Если параметр:
			 *
			 *     * передан — используется его значение,
			 *     * не передан — значение из настроек терминала.
			 *
			 */
			NotificationURL?: string;
			/**
			 * Format: uri
			 * @description URL на веб-сайте мерчанта, куда будет
			 *     переведен клиент в случае успешной оплаты — настраивается в личном кабинете. Если параметр:
			 *     * передан — используется его значение,
			 *     * не передан — значение из настроек терминала.
			 *
			 */
			SuccessURL?: string;
			/**
			 * Format: uri
			 * @description URL на веб-сайте мерчанта, куда будет
			 *     переведен клиент в случае неуспешной
			 *     оплаты — настраивается в личном кабинете. Если параметр:
			 *     * передан — используется его значение,
			 *     * не передан — значение из настроек терминала.
			 *
			 */
			FailURL?: string;
			/**
			 * Format: date-time
			 * @description Cрок жизни ссылки или динамического QR-кода
			 *     СБП, если выбран этот способ оплаты.<br><br>
			 *     Если текущая дата превышает дату, которая передана в
			 *     этом параметре, ссылка для оплаты или
			 *     возможность платежа по QR-коду становятся
			 *     недоступными и платёж выполнить нельзя.
			 *
			 *     * Максимальное значение — 90 дней от текущей даты.
			 *     * Минимальное значение — 1 минута от текущей даты.
			 *     * Формат даты — `YYYY-MM-DDTHH24:MI:SS+GMT`.
			 *
			 *     Пример даты: 2016-08-31T12:28:00+03:00. <br>
			 *
			 *     Если не передан, принимает значение 24 часа для платежа
			 *     и 30 дней для счета.
			 *
			 *     **Выставление счета через личный кабинет** <br><br>
			 *     Если параметр `RedirectDueDate` не был передан, проверяется настроечный параметр
			 *     платежного терминала `REDIRECT_TIMEOUT`, который может содержать значение срока жизни ссылки в
			 *     часах. Если его значение:
			 *     - больше нуля — оно будет установлено в качестве срока жизни ссылки или
			 *     динамического QR-кода;
			 *     - меньше нуля — устанавливается значение по умолчанию: 1440 мин. (1 сутки).
			 *
			 */
			RedirectDueDate?: unknown;
			/** @description JSON-объект, который позволяет передавать дополнительные параметры по операции и задавать определенные настройки в
			 *     формате `ключ:значение`.
			 *
			 *     Максимальная длина для каждого передаваемого параметра:
			 *       * ключ — 20 знаков;
			 *       * значение — 100 знаков.
			 *
			 *     Максимальное количество пар `ключ:значение` — 20.
			 *
			 *     1. Если у терминала включена опция привязки клиента после
			 *     успешной оплаты и передается параметр `CustomerKey`, в передаваемых
			 *     параметрах `DATA` могут быть параметры метода **AddCustomer**.
			 *     Если они есть, они автоматически привязываются к клиенту.
			 *
			 *     Например, если указать `"DATA":{"Phone":"+71234567890", "Email":"a@test.com"}`,
			 *     к клиенту автоматически будут привязаны данные электронной почты и телефон,
			 *     и они будут возвращаться при вызове метода **GetCustomer**.
			 *
			 *     Для МСС 4814 обязательно передать значение в параметре `Phone`.
			 *     Требования по заполнению:
			 *
			 *       * минимум — 7 символов,
			 *       * максимум — 20 символов,
			 *       * разрешены только цифры, исключение — первый символ может быть `+`.
			 *
			 *     Для МСС 6051 и 6050 обязательно передавать параметр `account` — номер электронного кошелька, не должен превышать 30 символов.
			 *
			 *     Пример: `"DATA": {"account":"123456789"}`.
			 *
			 *     2. Если используется функционал сохранения карт на платежной форме,
			 *     при помощи опционального параметра `DefaultCard` можно задать,
			 *     какая карта будет выбираться по умолчанию.
			 *
			 *         Возможные варианты:
			 *
			 *         * Оставить платежную форму пустой. Пример:
			 *
			 *           ```
			 *           "DATA":{"DefaultCard":"none"}
			 *           ```
			 *
			 *         * Заполнить параметр данными передаваемой карты. В этом случае передается `CardId`. Пример:
			 *
			 *           ```
			 *            "DATA":{"DefaultCard":"894952"}
			 *           ```
			 *
			 *         * Заполнить параметр данными последней сохраненной карты. Применяется, если параметр `DefaultCard` не передан,
			 *         передан с некорректным значением или в значении `null`.
			 *         По умолчанию возможность сохранение карт на платежной форме может быть отключена. Для активации обратитесь в
			 *         техническую поддержку.
			 *
			 *     3. Если вы подключаете оплату через T‑Pay, то вы можете передавать параметры устройства, с которого будет осуществлен переход в объекте `Data`.
			 *     Пример:
			 *
			 *       ```
			 *       "DATA": {
			 *         "TinkoffPayWeb": "true",
			 *         "Device": "Desktop",
			 *         "DeviceOs": "iOS",
			 *         "DeviceWebView": "true",
			 *         "DeviceBrowser": "Safari"
			 *        }
			 *       ```
			 *
			 *     Рекомендации для заполнения поля `Device`:
			 *
			 *       * Mobile  — при оплате c мобильного устройства;
			 *       * Desktop — при оплате c десктопного устройства.
			 *
			 *     Рекомендации для заполнения поля `DeviceOs`:
			 *
			 *       * iOS,
			 *       * Android,
			 *       * macOS,
			 *       * Windows,
			 *       * Linux.
			 *
			 *     Рекомендации для заполнения поля `DeviceBrowser`:
			 *
			 *       * Chrome,
			 *       * Firefox,
			 *       * JivoMobile,
			 *       * Microsoft Edge,
			 *       * Miui,
			 *       * Opera,
			 *       * Safari,
			 *       * Samsung,
			 *       * WebKit,
			 *       * WeChat,
			 *       * Yandex.
			 *
			 *     4. Параметр `notificationEnableSource` позволяет отправлять нотификации, только если Source платежа входит в перечень
			 *     указанных в параметре — он также есть в параметрах сессии. Возможные значения — T‑Pay, sbpqr. Пример:
			 *
			 *      ```
			 *      notificationEnableSource=TinkoffPay
			 *      ```
			 *
			 *     5. Для привязки и одновременной оплаты по CБП передавайте параметр `QR = true`.
			 *
			 *     6. При передаче в объекте `DATA` атрибута `OperationInitiatorType` учитывайте взаимосвязь его значений:
			 *
			 *        * Со значением атрибута `Recurrent` в методе **\/Init**.
			 *        * Со значением атрибута `RebillId` в методе **\/Charge**.
			 *        * С типом терминала, который используется для проведения операций — ECOM/AFT.
			 *
			 *       [Подробная таблица — передача признака инициатора операции](#section/Peredacha-priznaka-iniciatora-operacii)
			 *
			 *       Если передавать значения атрибутов, которые не соответствуют таблице, MAPI вернет ошибку 1126 —
			 *       несопоставимые значения `rebillId` или `Recurrent` с переданным значением `OperationInitiatorType`.
			 *      */
			DATA?:
				| components["schemas"]["Common"]
				| components["schemas"]["T-Pay"]
				| components["schemas"]["LongPay"];
			/** @description JSON-объект с данными чека. Обязателен, если подключена онлайн-касса. */
			Receipt?:
				| components["schemas"]["Receipt_FFD_105"]
				| components["schemas"]["Receipt_FFD_12"];
			/** @description JSON-объект с данными маркетплейса. Обязателен для маркетплейсов. */
			Shops?: components["schemas"]["Shops"][];
			/**
			 * @description Динамический дескриптор точки.
			 * @example 678451
			 */
			Descriptor?: string;
		};
		Response: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Сумма в копейках.
			 *
			 * @example 100000
			 */
			Amount: number;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 *
			 * @example 21050
			 */
			OrderId: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Статус транзакции.
			 *
			 * @example NEW
			 */
			Status: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * Format: uri
			 * @description Ссылка на платежную форму. Параметр возвращается только `для мерчантов без PCI DSS`.
			 *
			 * @example https://securepay.tinkoff.ru/rest/Authorize/1B63Y1
			 */
			PaymentURL?: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example 0
			 */
			Details?: string;
		};
		/** Запрос */
		"3DSMethod": {
			/**
			 * @description JSON с параметрами threeDSMethodNotificationURL, threeDSServerTransID, **закодированный в формат base-64**
			 *
			 *       | Название параметра | Тип | Описание             |
			 *      | --------------------- | ------------ | -------------------- |
			 *      | threeDSMethodNotificationURL | string | Обратный адрес, на который будет отправлен запрос после прохождения threeDSMethod |
			 *      | threeDSServerTransID | string | Идентификатор транзакции из ответа метода |
			 *
			 *
			 * @example eyJ0aHJlZURTU2VydmVyVHJhbnNJRCI6IjU2ZTcxMmE1LTE5MGEtNDU4OC05MWJjLWUwODYyNmU3N2M0NCIsInRocmVlRFNNZXRob2ROb3RpZmljYXRpb25VUkwiOiJodHRwczovL3Jlc3QtYXBpLXRlc3QudGlua29mZi5ydS92Mi9Db21wbGV0ZTNEU01ldGhvZHYyIn0
			 */
			threeDSMethodData: string;
		};
		"3DSMethod-2": {
			/**
			 * @description Идентификатор транзакции
			 *
			 * @example string
			 */
			threeDSServerTransID: string;
		};
		"3DSv2": {
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     Идентификатор выполнения 3DS Method:
			 *     * `Y` — выполнение метода успешно завершено
			 *     * `N` — выполнение метода завершено неуспешно или метод не выполнялся
			 *     * `U` — в ответе на вызов метода Check3dsVersion не было получено значение threeDSMethodURL
			 *
			 * @example Y
			 */
			threeDSCompInd: string;
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     Язык браузера в формате `IETF BCP47`.
			 *     Рекомендуем получать значение в браузере из глобального объекта navigator — `navigator.language`.
			 *
			 * @example RU
			 */
			language: string;
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     Time-zone пользователя в минутах.
			 *     Рекомендуем получать значение в браузере через вызов метода **getTimezoneOffset()**.
			 *
			 * @example -300
			 */
			timezone: string;
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     Высота экрана в пикселях.
			 *     Рекомендуем получать значение в браузере из глобального объекта screen — `screen.height`.
			 *
			 * @example 1024
			 */
			screen_height: string;
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     Ширина экрана в пикселях.
			 *     Рекомендуем получать значение в браузере из глобального объекта screen — `screen.width`.
			 *
			 * @example 967
			 */
			screen_width: string;
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     URL, который будет использоваться для получения результата (CRES) после завершения Challenge Flow
			 *     — аутентификации с дополнительным переходом на страницу ACS.
			 *
			 * @example www.callbackurl.ru
			 */
			cresCallbackUrl: string;
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     Глубина цвета в битах.
			 *     <br> Допустимые значения — 1/4/8/15/16/24/32/48.
			 *     <br> Рекомендуем получать значение в браузере из глобального объекта screen — `screen.colorDepth`.
			 *
			 * @default 48
			 * @example 48
			 */
			colorDepth: string;
			/**
			 * @description `deviceChannel 02 — BRW`
			 *
			 *
			 *     Поддерживает ли браузер пользователя Java:
			 *     * `true`,
			 *     * `false`.
			 *
			 * @default false
			 * @example false
			 */
			javaEnabled: string;
		};
		FinishAuthorize_FULL: {
			/**
			 * @description Идентификатор терминала. <br>
			 *     Выдается мерчанту в Т‑Бизнес при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Уникальный идентификатор транзакции в
			 *     системе Т‑Бизнес.
			 *
			 * @example 700001702044
			 */
			PaymentId: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example f5a3be479324a6d3a4d9efa0d02880b77d04a91758deddcbd9e752a6df97cab5
			 */
			Token: string;
			/**
			 * @description IP-адрес клиента. <br>
			 *     Передача адреса допускается в формате IPv4 и IPv6.
			 *
			 *     Обязательный параметр для 3DS второй
			 *     версии. DS платежной системы требует
			 *     передавать данный адрес в полном формате,
			 *     без каких-либо сокращений — 8 групп по 4 символа.
			 *
			 *     Этот формат регламентируется на уровне
			 *     спецификации EMVCo.<br>
			 *
			 *     Пример правильного адреса — `2011:0db8:85a3:0101:0101:8a2e:0370:7334`.
			 *
			 *     Пример неправильного адреса — `2a00:1fa1:c7da:9285:0:51:838b:1001`.
			 *
			 * @example 2011:0db8:85a3:0101:0101:8a2e:0370:7334
			 */
			IP?: string;
			/** @description * `true` — отправлять клиенту информацию об оплате на
			 *     почту;
			 *     * `false` — не отправлять.
			 *      */
			SendEmail?: boolean;
			/**
			 * @description Источник платежа.
			 *     Значение параметра зависит от параметра `Route`:
			 *     - `ACQ` — `cards`. Также поддерживается написание `Cards`.
			 *     - `MC` — `beeline`, `mts`, `tele2`, `megafon`.
			 *     - `EINV` — `einvoicing`.
			 *     - `WM` — `webmoney`.
			 *
			 * @example cards
			 * @enum {string}
			 */
			Source?:
				| "cards"
				| "beeline"
				| "mts"
				| "tele2"
				| "megafon"
				| "einvoicing"
				| "webmoney";
			/** @description JSON-объект, который содержит дополнительные
			 *     параметры в виде `ключ`:`значение`. Эти параметры будут переданы на страницу
			 *     оплаты, если она кастомизирована.
			 *
			 *
			 *     Максимальная длина для каждого передаваемого параметра:
			 *     * ключ — 20 знаков,
			 *     * значение — 100 знаков.
			 *
			 *
			 *     Максимальное количество пар `ключ`:`значение` — не больше 20.
			 *      */
			DATA?:
				| components["schemas"]["3DSv2"]
				| {
						[key: string]: string | undefined;
				  };
			/**
			 * Format: email
			 * @description Электронная почта для отправки информации об оплате.
			 *     Обязателен при передаче `SendEmail`.
			 *
			 * @example qwerty@test.com
			 */
			InfoEmail?: string;
			/** @description Данные карты.
			 *     Используется и является обязательным только
			 *     для ApplePay или GooglePay.
			 *      */
			EncryptedPaymentData?: string;
			/**
			 * @description Объект `CardData` собирается в виде списка `ключ`=`значение` c разделителем `;`.
			 *     Объект зашифровывается открытым ключом (X509 RSA 2048), и получившееся бинарное значение кодируется в `Base64`.
			 *     Открытый ключ генерируется в Т‑Бизнес и выдается при регистрации терминала.
			 *     Доступен в личном кабинете Интернет-эквайринга в разделе **Магазины** при изменении типа подключения на «Мобильное».
			 *
			 *     |Наименование|Тип данных| Обязательность | Описание                                                                                                                                           |
			 *     |---|---|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
			 *     |PAN|Number| Да             | Номер карты.                                                                                                                                       |
			 *     |ExpDate| Number| Да             | Месяц и год срока действия карты в формате `MMYY`.                                                                                                 |
			 *     |CardHolder |String| Нет            | Имя и фамилия держателя карты — как на карте.                                                                                                      |
			 *     |CVV |String| Нет            | Код защиты с обратной стороны карты. Для платежей по Apple Pay с расшифровкой токена на своей стороне необязательный.                              |
			 *     |ECI |String | Нет            | Electronic Commerce Indicator. Индикатор, который показывает степень защиты, применяемую при предоставлении клиентом своих данных ТСП. |
			 *     |CAVV |String | Нет            | Cardholder Authentication Verification Value или Accountholder Authentication Value.                                                               |
			 *
			 *
			 *     Пример значения элемента формы `CardData`:
			 *
			 *     ```
			 *     PAN=4300000000000777;ExpDate=0519;CardHolder=IVAN PETROV;CVV=111
			 *     ```
			 *
			 *     Для MirPay, если интеграция с НСПК для получения платежного токена:
			 *     1. Передавайте `Route=ACQ` и `Source= MirPay`.
			 *     2. ПВ `DATA.transId` передавайте значение `transId`.
			 *     3. В `DATA.tavv` передавайте значение `cav`.
			 *     4. Передавайте параметр `CardData`:
			 *
			 *         - **Pan** заполняйте `tan`,
			 *         - **ExpDate** заполняйте `tem + tey`.<br>
			 *
			 *     Если мерчант интегрируется только с банком для проведения платежа по MirPay,
			 *     метод не вызывается. Эквайер самостоятельно получает платежный токен и инициирует авторизацию
			 *     вместо мерчанта.<br>
			 *
			 *     При получении **CAVV** в **CardData** оплата будет проводиться как оплата токеном — иначе прохождение 3DS будет
			 *     регулироваться стандартными настройками треминала или платежа.
			 *
			 *     Не используется и не является обязательным, если передается `EncryptedPaymentData`.
			 * @example eyJzaWduYXR1cmUiOiJNRVVDSVFEdjNJS1A5WG9nWml4RytUUm9zZWFDK0RGd3RKd2FtMHVEcm91RUVGZVB6Z0lnYXBFbHhxQ3AwQWtZcVVmTFVMaVNhUjBKWkVQNmg 4THFqYks5YkJKQnM5d1x1MDAzZCIsInByb3RvY29sVmVyc2lvbiI6IkVDdjEiLCJzaWduZWRNZXNzYWdlIjoie1wiZW5jcnlwdGVkTWVzc2FnZVwiOlwiQW11dm5OYUIralBsa3VKTitrMUZLSDZFcm1VK2lTY052 L05rR3FFaXIxOHZmSWxkVFJ5L2U4cW5zMXkyanFtcm1acU1JSWNYMUhyTHBxRURpaXkvS3B6SUhNZFllcXRkSVVNOU1tRjNpejU2d2NTZUVVaXU2ODI3QThGcitaYm8xRWtWRjY1TUxRYVY3NlBOUFRndH UvQ1BodW5HUk0rN25KdVhDczVtbkVvOHFma0RNVk8xWktGWDQ4TnVEL2FKcDJQdVVIY2puSnBTZ0pTSDB4U21YSnAzU1MreXFDNm54N254WUEwN2h4YjYvSnp2R2s3ZExDU2hWWGU1Z2haUjNDaFQyV W8rRnpXTWJRRGZtSjBLQW9kc2VlR0xaaitqMzVqOUlKMkhJRFhIUUZZMWNuTW9YVUVoTjgvdEkvRkpqRnJiYVdFRkIzRDZwOFUzT2tkUmVaNHAyYi8yYURNZXVxR1ozSUtjc3R0R2lKMFhQQVhhZXYyQU8 o1M3RRQXVqQXRYdFlaekNTVjVBVXdXZS85T1VcXHUwMDNkXCJ9In0=
			 */
			CardData: string;
			/**
			 * @description Сумма в копейках.
			 *
			 * @example 10000
			 */
			Amount?: number;
			/**
			 * @description Канал устройства.
			 *     Поддерживаются следующие
			 *     каналы:
			 *     * `01` = Application (APP),
			 *     * `02` = Browser (BRW) — используется по умолчанию, передавать параметр не требуется.
			 *
			 * @example 02
			 */
			deviceChannel?: string;
			/**
			 * @description Способ платежа.
			 *     Обязательный для ApplePay или GooglePay.
			 *
			 * @example ACQ
			 * @enum {string}
			 */
			Route?: "ACQ" | "MC" | "EINV" | "WM";
		};
		FinishAuthorize: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Сумма в копейках.
			 *
			 * @example 100000
			 */
			Amount: number;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 *
			 * @example 21050
			 */
			OrderId: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Статус транзакции.
			 *     Возвращается один из четырех статусов платежа:
			 *       * `CONFIRMED` — при одностадийной оплате.
			 *       * `AUTHORIZED` — при двухстадийной оплате.
			 *       * `3DS_CHECKING` — когда нужно пройти проверку 3-D Secure. Если используется своя ПФ (протокол EACQ C PCI DSS) и платеж завис в этом статусе, нужно обратиться к эмитенту для устранения ошибок оплаты.
			 *       * `REJECTED` — при неуспешном прохождении платежа.
			 *
			 * @example NEW
			 */
			Status: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId?: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example 0
			 */
			Details?: string;
			/**
			 * @description Идентификатор рекуррентного платежа.
			 * @example 21813157
			 */
			RebillId?: string;
			/** @description Идентификатор карты в системе Т‑Бизнес. Передается только для cохраненной карты. */
			CardId?: string;
		};
		Without3DS: components["schemas"]["FinishAuthorize"] & {
			/** @description Идентификатор карты в системе Т‑Бизнес.
			 *     Передается только для сохраненной карты.
			 *      */
			CardId?: string;
		};
		With3DS: components["schemas"]["FinishAuthorize"] & {
			/**
			 * @description Идентификатор транзакции в системе Т‑Бизнес.
			 *
			 * @example ACQT-563587431
			 */
			MD?: string;
			/**
			 * @description Шифрованная строка, содержащая результаты 3-D Secure аутентификации. Возвращается в ответе от ACS.
			 *
			 * @example "eJxVUl1TwjAQ/CtM30s+KLTDHGHQwsiogFh09C2kp1RpC2nLh7/eBAtqnnYvN3ubvUD/kK4bO9RFkmc9hzWp08BM5XGSvfecRTRyA6cvIFppxP
			 *     ARVaVRwD0WhXzHRhL3HMUU73itwKVtyl1Pcs8Nli3pymUQK+z2Sww6joDZYI5bAfUgYeY0OZAzNYparWRWCpBqezWeiDZnLe3BqSmkqMeh4PRy2p
			 *     02BfJThkymKCIsSiAnCCqvslIfhXEG5Eyg0muxKstN0SVkv983yyT7zN/emroiQOwlkF8js8qiwogdklg8rEfT5WK0jj6G7D4cepNo8TWNBmwSDXtAbAfEskTjkPk0
			 *     oF6DeV3a6jLj8VQHmVoXglFTqTFs7IjBn4u/BTBZa7OK8yPODPCwyTM0HSbACwby6/f6xsaoSpNMMN89+uHdV/iUPz2nyat/uxrPXz5nuX/c2nBPTVYxMflwzthJ0hIgVobUeyP1yg469xW+AedOuuM="
			 *
			 */
			PaReq?: string;
			/**
			 * Format: uri
			 * @description Если в ответе метода **FinishAuthorize** возвращается статус `3DS_CHECKING`,
			 *     мерчанту нужно сформировать запрос на URL ACS банка,
			 *     который выпустил карту — параметр `ACSUrl` в ответе, и вместе с этим перенаправить клиента на эту же страницу
			 *     ACSUrl для прохождения 3DS.
			 *
			 * @example https://secure.tcsbank.ru/acs/auth/start.do
			 */
			ACSUrl?: string;
		};
		With3DSv2APP: components["schemas"]["FinishAuthorize"] &
			Record<string, never> & {
				/**
				 * @description Уникальный идентификатор транзакции,генерируемый 3DS-Server. Обязательный параметр для 3DS второй версии.
				 *
				 * @example d93f7c66-3ecf-4d10-ba62-46046e7b7596
				 */
				TdsServerTransId: string;
				/**
				 * @description Идентификатор транзакции, присвоенный ACS, который вернулся в ответе **FinishAuthorize**.
				 *
				 * @example aceca6af-56ee-43f0-80ef-ea8d30d5c5b0
				 */
				AcsTransId: string;
				/**
				 * Format: uri
				 * @description `Обязательное поле, если `Transaction Status` = `C`.`<br><br>
				 *     Тип пользовательского интерфейса ACS. Возможные значения:
				 *       - `01` — Native UI,
				 *       - `02` — HTML UI.
				 *
				 * @example 02
				 */
				AcsInterface?: string;
				/**
				 * Format: uri
				 * @description `Обязательное поле, если `Transaction Status` = `C`.`<br><br>
				 *      Формат шаблона пользовательского интерфейса ACS. Возможные значения:
				 *        - `01` — Text;
				 *        - `02` — Single Select;
				 *        - `03` — Multi Select;
				 *        - `04` — OOB;
				 *        - `05` — HTML Other (valid only for HTML UI).
				 *
				 * @example 03
				 */
				AcsUiTemplate?: string;
				/**
				 * Format: uri
				 * @description `Обязательное поле, если `Transaction Status` = `C`.`<br><br>
				 *      JWS object, представленный как string, который создан ACS для ARes. Содержит:
				 *        - ACS URL — 3DS SDK должен отправить Challenge Request на этот URL,
				 *        - ACS Ephemeral Public Key (QT),
				 *        - SDK Ephemeral Public Key (QC).
				 *
				 * @example eyJ4NWMiOlsiTUlJRGtUQ0NBbm1nQXdJQkFnSVVRU1VEV05VZEFicWozS1Uya0M0VHpaSEpVVHd3RFFZSktvWklodmNOQVFFTEJRQXdXREVMTUFrR0ExVUVCaE1DVWxVeER6QU5CZ05WQkFnTUJrMXZjMk52ZHpFUE1BMEdBMVVFQnd3R1RXOXpZMjkzTVJJ d0VBWURWUVFLREFsVGIyMWxJR0poYm1zeEV6QVJCZ05WQkFNTUNtUnpMbTF2WTJzdWNuVXdIaGNOTWpBd056RTRNVFExT1RNM1doY05NakV3TnpFNE1UUTFPVE0zV2pCWU1Rc3dDUVlEVlFRR0V3SlNWVEVQTUEwR0ExVUVDQXdHVFc5elkyOTNNUTh3RF FZRFZRUUhEQVpOYjNOamIzY3hFakFRQmdOVkJBb01DVk52YldVZ1ltRnVhekVUTUJFR0ExVUVBd3dLWkhNdWJXOWpheTV5ZFRDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBTUhNdXB1Wlg3VUFWR3Z5dm9uZ1o4U3BJcisrRD RnMjBRaFwvZ0NGb3JUN1pDUkRaVWhRamlDSzdXSWpiVHRKQUFKVG1yelhcLzlMSGJIdHpIcFFvRFVTNXZPTnRqVWFaVGVQUE91SklMRWl6NDBBVjJCUVZRd0xnRzBjbm9oK21Qa0dNMEZ4VmJFcHFEVHk3SHB0dFAwdm96cGxHNjdFWk1HTXdKSUpESmlDYUdG OGZ0aTlYR3M4MXB3NUhWZElmOHNpQnFaWW94cGt0QWJ1dnpBTFJEUnp3dFBhclFHOTZyQStPM0dJaE53VDhZXC9pallwS0hWNkJCWDBKNmxZdFdoaVY5blhBVktYNTNlVTJ4M1E2Njh4U3BLa2dwSVh1N2xiNUN2M2dDTlIrelVqK0lTODNZYjJhUlR2WkF6MFI1 V3dBNW5Zb2J6V3Vta1wvdE5iV1FYdzBWTUNBd0VBQWFOVE1GRXdIUVlEVlIwT0JCWUVGRmVWN0dzR0tCSzhUTDljaVk4UFF2N0RhY290TUI4R0ExVWRJd1FZTUJhQUZGZVY3R3NHS0JLOFRMOWNpWThQUXY3RGFjb3RNQThHQTFVZEV3RUJcL3dRRk1BT UJBZjh3RFFZSktvWklodmNOQVFFTEJRQURnZ0VCQUZqVGppUkxKOFpaWld5dXFLNTZHVkR6dnJiXC9uRlVDTHVjVXZEV2toK09lRWkxWUFPOUJZV3RFVTVzdmRNNTlsOWVTMGtjbGxrRzVDTklcL1U4S2dKSnUzV0tEVXp5cU80eVRNU3g3RWZDXC9qVE1oT2d2Y UJubktWK2hvV3FQZTlKNHZVYzZ2R0wzWE1cL0FNeWpoVDlBRko1ZjZBaVdZMk5QYkxHczQ2N0ZPY2Vwb1RJMkdseHBtcWdaMFVGKzlsblNZbDU0WEg2dGNZYUszWjcxS2NES0I0QkUySWVmV1Y3MUM3anBVdjFFSlFsNTY4XC8xaGpsZktXUExWcE5NTzVlTlNMR 1ZKd1VmdFA0V0tKU2Y2VmdtbG5XOU1yVStiK3hvZW44MFF1dUxrSWs1ZXBIM2l1ZDV4a1IxcVVXQU1aTUZTQW4yUHJDdjQrZFFMRDd2OG83d3BrPSJdLCJhbGciOiJQUzI1NiJ9.eyJhY3NFcGhlbVB1YktleSI6eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6IlRoRj NJY3BIMVVLanliQW5lNWhHcy1BNnpyYXo2aUxiYVk0WmVEOU1oSU0iLCJ5Ijoid0VuVXNvNlRLZDlfbjZSc2NjUXRCeFc2Q1gzLXFSTGk0UWJBU3pNbm4tTSJ9LCJzZGtFcGhlbVB1YktleSI6eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6Ikp6R2tGM2w3WGxnclJ6NU 1PTl9ncDg3WUxfd0NkVVJpVUlxOXJmNnVyR2MiLCJ5IjoiTnI4UmllTE9vVzJXUkhiX2RFazFmdHRoWEZXTHdYaWZFUzNZZkFnMkhvWSJ9LCJhY3NVUkwiOiJodHRwczovL2VhY3EtZHMtbW9jay1zZXJ2aWNlLXRlc3QudGNzYmFuay5ydS9jaGFsbGVuZ2UvZDkzZjdj NjYtM2VjZi00ZDEwLWJhNjItNDYwNDZlN2I3NTk2In0.hQLVTT5YMAY8TjISRdYX2IT04zH8Z8DgoB4kIAyVfkuJ0X6AGIKXSVcIVSNgC-A_SEkCZRqAyUeu0ZJtpoIVyOf1mumBGEK-uC6yVQlX5WSPidQUj4nuBvpYsfdrGPeoHWvNsrBpMMxvvW4559jtbAUY00NcW3rwDShAi4gVKgJcssMPAM1zOOR5vi0_ClUsCW1k9a201Hv6cYcEBuO2JQ8NPLampEkZ55nOmwcPPTEziXeZsq9VjROXNfBewbA4wLuQmh8aSrcOcwFtJo0CPpdrsKiY77KPT0c8XMmZZK_FiAxzrWocfHraqC7cRJNQ5glEBakXvSfrwGg_xXA
				 */
				AcsSignedContent?: string;
				/**
				 * Format: uri
				 * @description Уникальный идентификатор, назначенный EMVCo.
				 * @example 12345
				 */
				AcsReferenceNumber: string;
				/**
				 * Format: uri
				 * @description Уникальный идентификатор транзакции, назначенный 3DS SDK для идентификации одной транзакции, который вернулся в ответе **FinishAuthorize**.
				 * @example d5a44dfe-673b-4666-82f9-96346107e424
				 */
				SdkTransID: string;
			};
		With3DSv2BRW: components["schemas"]["FinishAuthorize"] &
			Record<string, never> & {
				/**
				 * @description Уникальный идентификатор транзакции, генерируемый 3DS-Server. Обязательный параметр для 3DS второй версии.
				 *
				 * @example d7171a06-7159-4bdd-891a-a560fe9938d2
				 */
				TdsServerTransId: string;
				/**
				 * @description Идентификатор транзакции, присвоенный ACS, который вернулся в ответе **FinishAuthorize**.
				 *
				 * @example e176d5d3-2f19-40f5-8234-46d3464e0b08
				 */
				AcsTransId: string;
				/**
				 * Format: uri
				 * @description Если в ответе метода **FinishAuthorize** возвращается статус `3DS_CHECKING`,
				 *     мерчанту нужно сформировать запрос на URL ACS банка,
				 *     который выпустил карту — параметр `ACSUrl` в ответе, и вместе с этим перенаправить клиента на эту же страницу
				 *     ACSUrl для прохождения 3DS.
				 *
				 * @example https://acs.vendorcert.mirconnect.ru/mdpayacs/creq
				 */
				ACSUrl?: string;
			};
		AddCard_FULL: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example 1111133333
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example testCustomer1234
			 */
			CustomerKey: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
			 */
			Token: string;
			/**
			 * @description Если `CheckType` не передается, автоматически проставляется значение `NO`.
			 *      Возможные значения:
			 *      * `NO` — сохранить карту без проверок. `RebillID` для рекуррентных платежей не возвращается.
			 *      * `HOLD` — при сохранении сделать списание на 0 руб. `RebillID` возвращается для терминалов без
			 *      поддержки 3DS. `Для мерчантов c PCI DSS и собственной платежной формой` обязательна передача CVV/CVP2 в методе [AttachCard](#tag/Metody-raboty-s-kartami/operation/AddCard)).
			 *      * `3DS` — при сохранении карты выполнить проверку 3DS и выполнить списание на 0 р. В этом случае `RebillID` будет только для
			 *      3DS карт. Карты, не поддерживающие 3DS, привязаны не будут.
			 *      * `3DSHOLD` – при привязке карты выполнить проверку, поддерживает карта 3DS или нет. Если карта не поддерживает 3DS, выполняется
			 *      списание на 0 руб. `Для мерчантов c PCI DSS и собственной платежной формой` обязательна передача CVV/CVP2 в методе [AttachCard](#tag/Metody-raboty-s-kartami/operation/AddCard)).
			 *
			 * @enum {string}
			 */
			CheckType?: "NO" | "HOLD" | "3DS" | "3DSHOLD";
			/**
			 * @description IP-адрес запроса.
			 *
			 * @example 10.100.10.10
			 */
			IP?: string;
			/** @description Признак резидентности добавляемой карты:
			 *     Возможные значения:
			 *     * `true` — карта РФ,
			 *     * `false` — карта не РФ,
			 *     * `null` — не специфицируется, универсальная карта.
			 *      */
			ResidentState?: boolean;
		};
		AddCardResponse_FULL: {
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 6155312072
			 */
			PaymentId: number;
			/**
			 * @description Идентификатор терминала. Выдается мерчанту Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example 906540
			 */
			CustomerKey: string;
			/**
			 * @description Идентификатор запроса на привязку карты.
			 *
			 * @example ed989549-d3be-4758-95c7-22647e03f9ec
			 */
			RequestKey: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example Терминал не найден
			 */
			Details?: string;
			/**
			 * Format: uri
			 * @description UUID, используется для работы без PCI DSS.
			 *
			 * @example 82a31a62-6067-4ad8-b379-04bf13e37642d
			 */
			PaymentURL: string;
		};
		AttachCard: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * Format: uuid
			 * @description Идентификатор запроса на привязку карты.
			 *
			 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
			 */
			RequestKey: string;
			/**
			 * @description Зашифрованные данные карты в формате:
			 *       ```
			 *       PAN=4300000000000777;ExpDate=0519;CardHolder=IVAN PETROV;CVV=111
			 *       ```
			 *
			 * @example U5jDbwqOVx+2vDApxe/rfACMt+rfWXzPdJ8ZXxNFVIiZaLZrOW72bGe9cKZdIDnekW0nqm88YxRD↵jyfa5Ru0kY5cQV alU+juS1u1zpamSDtaGFeb8sRZfhj72yGw+io+qHGSBeorcfgoKStyKGuBPWfG↵d0PLHuyBE6QgZyIAM1XfdmNlV0UAxOnkTGDsskL pIt3AWhw2e8KOar0vwbgCTDjznDB1/DLgOW01↵Aj/bXyLJoG1BkOrPBm9JURs+f+uyFae0hkRicNKNgXoN5pJTSQxOEauOi6ylsVJ B3WK5MNYXtj6x↵GlxcmTk/LD9kvHcjTeojcAlDzRZ87GdWeY8wgg==
			 */
			CardData: string;
			/** @description В объекте передаются дополнительные параметры в формате `ключ:значение`.
			 *     Например, меняем на JSON-объект, который содержит дополнительные параметры в виде `ключ:значение`.
			 *
			 *     Если ключи или значения содержат в себе специальные символы, получившееся значение должно быть закодировано
			 *     функцией `urlencode`. Максимальная длина для каждого передаваемого параметра:
			 *     * ключ — 20 знаков,
			 *     * значение — 100 знаков.
			 *
			 *     Максимальное количество пар `ключ:значение` — не больше 20.
			 *
			 *     >**Важно** Для 3DS второй версии в `DATA` передаются параметры, описанные в объекте
			 *     `3DSv2`. В `HttpHeaders` запроса обязательны заголовки `User-Agent` и `Accept`.
			 *      */
			DATA?:
				| {
						[key: string]: string | undefined;
				  }
				| components["schemas"]["3DSv2"];
			/**
			 * @description Подпись запроса.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token: string;
		};
		AttachCardResponse: {
			/**
			 * @description Платежный ключ, выдается мерчанту при заведении
			 *     терминала.
			 *
			 * @example testRegress
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example testCustomerKey
			 */
			CustomerKey: string;
			/**
			 * Format: uuid
			 * @description Идентификатор запроса на привязку карты.
			 *
			 * @example 8de92934-26c9-474c-a4ce-424f2021d24d
			 */
			RequestKey: string;
			/**
			 * @description Идентификатор карты в системе Т‑Бизнес. <br>
			 *     При сценарии 3-D Secure Authentication Challenge — `CardId` можно получить после успешного прохождения 3DS.
			 *
			 * @example 5555
			 */
			CardId?: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Статус привязки карты:
			 *     * `NEW` — новая сессия привязки карты;
			 *     * `FORM_SHOWED` — показ формы привязки карты;
			 *     * `THREE_DS_CHECKING` — отправка клиента на проверку 3DS;
			 *     * `THREE_DS_CHECKED` — клиент успешно прошел проверку 3DS;
			 *     * `AUTHORIZING` — отправка платежа на 0 руб;
			 *     * `AUTHORIZED` — платеж на 0 руб прошел успешно;
			 *     * `COMPLETED` — карта успешно привязана;
			 *     * `REJECTED` — привязать карту не удалось.
			 *
			 * @enum {string}
			 */
			Status?:
				| "NEW"
				| "FORM_SHOWED"
				| "THREE_DS_CHECKING"
				| "THREE_DS_CHECKED"
				| "AUTHORIZING"
				| "AUTHORIZED"
				| "COMPLETED"
				| "REJECTED";
			/**
			 * @description Идентификатор рекуррентного платежа.
			 *
			 * @example 130799909
			 */
			RebillId?: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/** @description Подробное описание ошибки.
			 *      */
			Details?: string;
			/**
			 * Format: uri
			 * @description Адрес сервера управления доступом для проверки 3DS —
			 *     возвращается в ответе на статус `3DS_CHECKING`.
			 *
			 * @example https://secure.tcsbank.ru/acs/auth/start.do
			 */
			ACSUrl?: string;
			/**
			 * @description Уникальный идентификатор транзакции в системе
			 *     Т‑Бизнес — возвращается в ответе на статус `3DS_CHECKING`.
			 *
			 * @example ACQT-563587431
			 */
			MD?: string;
			/**
			 * @description Результат аутентификации 3-D Secure — возвращается в ответе на статус `3DS_CHECKING`.
			 *
			 * @example eJxVUl1TwjAQ/CtM30s+KLTDHGHQwsiogFh09C2kp1RpC2nLh7/eBAtqnnYvN3ubvUD/kK4bO9RFkmc9hzWp08BM5XGSvfecRT RyA6cvIFppxPARVaVRwD0WhXzHRhL3HMUU73itwKVtyl1Pcs8Nli3pymUQK+z2Sww6joDZYI5bAfUgYeY0OZAzNYparWRWCpBqe zWeiDZnLe3BqSmkqMeh4PRy2p02BfJThkymKCIsSiAnCCqvslIfhXEG5Eyg0muxKstN0SVkv983yyT7zN/emroiQOwlkF8js8qiwogdk lg8rEfT5WK0jj6G7D4cepNo8TWNBmwSDXtAbAfEskTjkPk0oF6DeV3a6jLj8VQHmVoXglFTqTFs7IjBn4u/BTBZa7OK8yPODPCwyT M0HSbACwby6/f6xsaoSpNMMN89+uHdV/iUPz2nyat/uxrPXz5nuX/c2nBPTVYxMflwzthJ0hIgVobUeyP1yg469xW+AedOuuM=
			 */
			PaReq?: string;
		};
		/** Параметры запроса для 3DS v1.0 */
		ACSUrl_V1: {
			/** @description Уникальный идентификатор транзакции в системе Банка (возвращается в ответе на FinishAuthorize) */
			MD: string;
			/** @description Результат аутентификации 3-D Secure (возвращается в ответе на FinishAuthorize) */
			PaReq: string;
			/** @description Адрес перенаправления после аутентификации 3-D Secure (URL обработчик на стороне Мерчанта, принимающий результаты прохождения 3-D Secure) */
			TermUrl: string;
		};
		/** Параметры запроса для 3DS v2.1 */
		ACSUrl_V2: {
			/**
			 * Challenge Request (CReq)
			 * @description JSON с параметрами закодированный в форматe base-64
			 */
			creq: {
				/** @description Идентификатор транзакции из ответа метода Check3DSVersion */
				threeDSServerTransID: string;
				/** @description Идентификатор транзакции, присвоенный ACS, полученный в ответе на FinishAuthorize */
				acsTransID: string;
				/** @description Размер экрана, на котором открыта страница ACS. <br>Допустимые значения <br>• 01 = 250 x 400, <br>• 02 = 390 x 400, <br>• 03 = 500 x 600, <br>• 04 = 600 x 400, <br>• 05 = Fullscreen. <br> */
				challengeWindowSize: string;
				/** @description Передается фиксированное значение «CReq» */
				messageType: string;
				/** @description Версия 3DS, полученная из ответа метода Check3dsVersion */
				messageVersion: string;
			};
		};
		/** Ответ на запрос 3DS v1.0 */
		ACSUrlResponseV1: {
			/**
			 * @description Уникальный идентификатор транзакции в системе Банка (возвращается в ответе на FinishAuthorize)
			 * @example MD_TEST
			 */
			MD: string;
			/**
			 * @description Шифрованная строка, содержащая результаты 3-D Secure аутентификации (возвращается в ответе от ACS)
			 * @example PaRes_TEST
			 */
			PaRes: string;
			/** @description В случае невозможности прохождения аутентификации по 3DS v2.1, делается принудительный Fallback на 3DS v1.0 и данный атрибут выставляется в true, в противном случае не передается в ответе */
			FallbackOnTdsV1?: string;
		};
		/** Ответ на запрос 3DS v2.1 */
		ACSUrlResponseV2: {
			/**
			 * Challenge Request (CReq)
			 * @description JSON/JWE object с параметрами закодированный в формат base-64. Ответ отправляется на URL, который был указан в методе FinishAuthorize. После получения на NotificationUrl Мерчанта ответа ACS(CRes) с результатами прохождения 3-D Secure v2 необходимо сформировать запрос к методу Submit3DSAuthorizationV2.
			 */
			cres: {
				/** @description Идентификатор транзакции из ответа метода Check3DSVersion */
				threeDSServerTransID: string;
				/** @description Идентификатор транзакции, присвоенный ACS, полученный в ответе на FinishAuthorize */
				acsTransID: string;
				/** @description Результат выполнения Challenge flow, возможны 2 значения — Y/N. <br> Y — аутентификация выполнена успешна,  <br> N — аутентификация не пройдена, клиент отказался или ввел неверные данные.  <br> */
				transStatus: string;
				/** @description Передается фиксированное значение «CRes» */
				messageType: string;
				/** @description Версия 3DS */
				messageVersion: string;
			};
		};
		Confirm: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 * @example 2304882
			 */
			PaymentId: string;
			/**
			 * @description Подпись запроса — хэш `SHA-256`.
			 * @example c0ad1dfc4e94ed44715c5ed0e84f8ec439695b9ac219a7a19555a075a3c3ed24
			 */
			Token: string;
			/**
			 * @description IP-адрес клиента.
			 * @example 192.168.255.255
			 */
			IP?: string;
			/**
			 * @description Сумма в копейках. Если не передан, используется `Amount`, переданный в методе **Init**.
			 * @example 19200
			 */
			Amount?: number;
			/** @description JSON-объект с данными чека. Обязателен, если подключена онлайн-касса. */
			Receipt?:
				| components["schemas"]["Receipt_FFD_12"]
				| components["schemas"]["Receipt_FFD_105"];
			/** @description Обязательный для маркетплейсов. JSON-объект с данными маркетплейса. */
			Shops?: components["schemas"]["Shops"][];
			/**
			 * @description Способ платежа.
			 *
			 * @example BNPL
			 * @enum {string}
			 */
			Route?: "TCB" | "BNPL";
			/**
			 * @description Источник платежа.
			 *
			 * @example BNPL
			 * @enum {string}
			 */
			Source?: "installment" | "BNPL";
		};
		/** @description Информация по способу оплаты или деталям для платежей в рассрочку. */
		Items_Params: {
			/**
			 * @description Возможные значения:
			 *     * `Route` — способ оплаты.
			 *     * `Source` — источник платежа.
			 *     * `CreditAmount` — сумма выданного кредита в копейках. Возвращается только для платежей в рассрочку.
			 *
			 * @enum {string}
			 */
			Key?: "Route" | "Source" | "CreditAmount";
			/**
			 * @description Возможные значения:
			 *     * `ACQ`, `BNPL`, `TCB`, `SBER` — для Route.
			 *     * `BNPL`, `cards`, `Installment`, `MirPay`, `qrsbp`, `SberPay`, `TinkoffPay`, `YandexPay` — для Source.
			 *     * Сумма в копейках — для CreditAmount.
			 *
			 * @enum {string}
			 */
			Value?:
				| "ACQ"
				| "BNPL"
				| "TCB"
				| "SBER"
				| "BNPL"
				| "cards"
				| "Installment"
				| "MirPay"
				| "qrsbp"
				| "SberPay"
				| "TinkoffPay"
				| "YandexPay";
		};
		"Confirm-2": {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 * @example 21057
			 */
			OrderId: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Статус транзакции.
			 * @example CONFIRMED
			 * @enum {string}
			 */
			Status:
				| "NEW"
				| "AUTHORIZING"
				| "AUTHORIZED"
				| "AUTH_FAIL"
				| "CANCELED"
				| "CHECKING"
				| "CHECKED"
				| "COMPLETING"
				| "COMPLETED"
				| "CONFIRMING"
				| "CONFIRMED"
				| "DEADLINE_EXPIRED"
				| "FORM_SHOWED"
				| "PARTIAL_REFUNDED"
				| "PREAUTHORIZING"
				| "PROCESSING"
				| "3DS_CHECKING"
				| "3DS_CHECKED"
				| "REVERSING"
				| "REVERSED"
				| "REFUNDING"
				| "REFUNDED"
				| "REJECTED"
				| "UNKNOWN";
			/**
			 * @description Идентификатор транзакции в системе Т‑Бизнес.
			 * @example 2304882
			 */
			PaymentId: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 * @example OK
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 * @example None
			 */
			Details?: string;
			/** @description Детали для платежей в рассрочку.
			 *      */
			Params?: components["schemas"]["Items_Params"][];
		};
		/** @description JSON-объект с данными маркетплейса. Обязательный для маркетплейсов. */
		ShopsCancel: {
			/**
			 * @description Код магазина.
			 *
			 * @example 700456
			 */
			ShopCode: string;
			/**
			 * @description Cумма в копейках, которая относится к
			 *     указанному `ShopCode`.
			 *
			 * @example 10000
			 */
			Amount: number;
			/**
			 * @description Наименование товара.
			 *
			 * @example Товар
			 */
			Name?: string;
		};
		Cancel: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 * @example 2304882
			 */
			PaymentId: string;
			/**
			 * @description Подпись запроса — хэш `SHA-256`.
			 * @example c0ad1dfc4e94ed44715c5ed0e84f8ec439695b9ac219a7a19555a075a3c3ed24
			 */
			Token: string;
			/**
			 * @description IP-адрес клиента.
			 * @example 192.168.255.255
			 */
			IP?: string;
			/**
			 * @description Сумма в копейках. Если не передан, используется `Amount`, переданный в методе **Init**.
			 *
			 *
			 *     При отмене статуса `NEW` поле `Amount` игнорируется, даже если оно заполнено. Отмена производится на полную сумму.
			 *
			 * @example 19200
			 */
			Amount?: number;
			/** @description JSON-объект с данными чека. Обязателен, если подключена онлайн-касса.
			 *
			 *     Если отмена делается только по части товаров, данные, переданные в этом запросе, могут отличаться данных, переданных в **Init**.
			 *     При полной отмене структура чека не передается, при частичной — передаются товары, которые нужно отменить. */
			Receipt?:
				| components["schemas"]["Receipt_FFD_12"]
				| components["schemas"]["Receipt_FFD_105"];
			/** @description Обязательный для маркетплейсов. JSON-объект с данными маркетплейса. */
			Shops?: components["schemas"]["ShopsCancel"][];
			/**
			 * @description Код банка в классификации СБП, в который нужно выполнить возврат. Смотрите параметр `MemberId` методе [**QrMembersList**](#tag/Oplata-cherez-SBP/paths/~1QrMembersList/post).
			 * @example 77892
			 */
			QrMemberId?: string;
			/**
			 * @description Способ платежа.
			 *
			 * @example BNPL
			 * @enum {string}
			 */
			Route?: "TCB" | "BNPL";
			/**
			 * @description Источник платежа.
			 *
			 * @example BNPL
			 * @enum {string}
			 */
			Source?: "installment" | "BNPL";
			/** @description Идентификатор операции на стороне мерчанта. Параметр не работает для операций по СБП. Обязателен для операций «Долями» и в рассрочку.
			 *
			 *     * Если поле не передано или пустое (""), запрос будет обработан без проверки ранее созданных возвратов.
			 *     * Если поле заполнено, перед проведением возврата проверяется запрос на отмену с таким `ExternalRequestId`.
			 *     * Если такой запрос уже есть, в ответе вернется текущее состояние платежной операции, если нет — платеж отменится.
			 *     * Для операций «Долями» при заполнении параметра нужно генерировать значение в формате `UUID v4`.
			 *     * Для операций в рассрочку при заполнении параметра нужно генерировать значение с типом `string` — ограничение 100 символов.
			 *      */
			ExternalRequestId?: string;
		};
		"Cancel-2": {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 * @example 21057
			 */
			OrderId: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Статус транзакции.
			 * @example REVERSED
			 */
			Status: string;
			/**
			 * @description Сумма в копейках до операции отмены.
			 * @example 13000
			 */
			OriginalAmount: number;
			/**
			 * @description Сумма в копейках после операции отмены.
			 * @example 5000
			 */
			NewAmount: number;
			/**
			 * @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
			 * @example 2304882
			 */
			PaymentId: number;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 * @example OK
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 * @example None
			 */
			Details?: string;
			/**
			 * @description Идентификатор операции на стороне мерчанта.
			 * @example 756478567845678436
			 */
			ExternalRequestId?: string;
		};
		Charge_FULL: {
			/**
			 * @description Идентификатор терминала. <br>
			 *     Выдается мерчанту в Т‑Бизнес при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Уникальный идентификатор транзакции в
			 *     системе Т‑Бизнес.
			 *
			 * @example 700001702044
			 */
			PaymentId: string;
			/**
			 * @description Идентификатор рекуррентного платежа. Значение зависит от атрибутов:
			 *       * `OperationInitiatorType` в методе **init**,
			 *       * `Recurrent` в методе **Init**.
			 *
			 *     Подробнее — в описаниях [Рекуррентный платёж](#tag/Rekurrentnyj-platyozh) и [Инициализация платежа](#tag/Standartnyj-platyozh/paths/~1Init/post)
			 *
			 * @example 145919
			 */
			RebillId: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example f5a3be479324a6d3a4d9efa0d02880b77d04a91758deddcbd9e752a6df97cab5
			 */
			Token: string;
			/**
			 * @description IP-адрес клиента.
			 *
			 * @example 2011:0db8:85a3:0101:0101:8a2e:0370:7334
			 */
			IP?: string;
			/** @description `true` — если клиент хочет получать
			 *     уведомления на почту.
			 *      */
			SendEmail?: boolean;
			/**
			 * Format: email
			 * @description Адрес почты клиента.
			 *     Обязателен при передаче `SendEmail`.
			 *
			 * @example customer@test.com
			 */
			InfoEmail?: string;
		};
		GetState_FULL: {
			/**
			 * @description Идентификатор терминала. <br>
			 *     Выдается мерчанту в Т‑Бизнес при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token: string;
			/**
			 * @description IP-адрес клиента.
			 *
			 * @example 192.168.0.52
			 */
			IP?: string;
		};
		AddCustomer: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 * @example 4387c647-a693-449d-bc35-91faecfc50de
			 */
			CustomerKey: string;
			/**
			 * @description Подпись запроса.
			 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
			 */
			Token: string;
			/**
			 * @description IP-адрес запроса.
			 * @example 10.100.10.10
			 */
			IP?: string;
			/**
			 * Format: email
			 * @description Электронная почта клиента.
			 * @example username@test.ru
			 */
			Email?: string;
			/**
			 * @description Телефон клиента в формате `+{Ц}`.
			 *
			 * @example +79031234567
			 */
			Phone?: string;
		};
		AddCustomerResponse: {
			/**
			 * @description Идентификатор терминала, выдается продавцу Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 * @example 05d65baa-9718-445e-8212-76fa0dd4c1d2
			 */
			CustomerKey: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example Терминал не найден
			 */
			Details?: string;
		};
		GetOrRemoveCustomer: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/** @description Идентификатор клиента в системе мерчанта. */
			CustomerKey: string;
			/**
			 * @description Подпись запроса.
			 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
			 */
			Token: string;
			/** @description IP-адрес запроса. */
			IP?: string;
		};
		GetCustomerResponse: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 * @example 4264aa7b-08ab-4429-ab5a-2a171d841ced
			 */
			CustomerKey: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверный статус клиента
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example Клиент не найден.
			 */
			Details?: string;
			/**
			 * Format: email
			 * @description Электронная почта клиента.
			 * @example a@test.ru
			 */
			Email?: string;
			/**
			 * @description Телефон клиента в формате `+{Ц}`.
			 *
			 * @example +79031234567
			 */
			Phone?: string;
		};
		RemoveCustomerResponse: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/** @description Идентификатор клиента в системе мерчанта. */
			CustomerKey: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/** @description Подробное описание ошибки.
			 *      */
			Details?: string;
		};
		GetAddCardState: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example testRegressBank
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор запроса на привязку карты.
			 *
			 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
			 */
			RequestKey: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
			 */
			Token: string;
		};
		GetAddCardStateResponse: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор запроса на привязку карты.
			 *
			 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
			 */
			RequestKey: string;
			/**
			 * @description Статус привязки карты:
			 *     * `NEW` — новая сессия привязки карты,
			 *     * `FORM_SHOWED` — показ формы привязки карты,
			 *     * `THREE_DS_CHECKING` — отправка клиента на проверку 3DS;
			 *     * `THREE_DS_CHECKED` — клиент успешно прошел проверку 3DS;
			 *     * `AUTHORIZING` — отправка платежа на 0 руб;
			 *     * `AUTHORIZED` — платеж на 0 руб прошел успешно;
			 *     * `COMPLETED` — карта успешно привязана,
			 *     * `REJECTED` — привязать карту не удалось.
			 *
			 * @enum {string}
			 */
			Status:
				| "NEW"
				| "FORM_SHOWED"
				| "THREE_DS_CHECKING"
				| "THREE_DS_CHECKED"
				| "AUTHORIZING"
				| "AUTHORIZED"
				| "COMPLETED"
				| "REJECTED";
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Идентификатор карты в системе Т‑Бизнес.
			 *
			 * @example 156516516
			 */
			CardId?: string;
			/**
			 * @description Идентификатор рекуррентного платежа.
			 *
			 * @example 134249124
			 */
			RebillId?: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode?: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example Данный RequestKey не найден.
			 */
			Details?: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example testCustomer1234
			 */
			CustomerKey?: string;
		};
		GetCardList_FULL: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example testRegressBank
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example testCustomer1234
			 */
			CustomerKey: string;
			/**
			 * @description Признак сохранения карты для оплаты в 1 клик.
			 *
			 * @example true
			 */
			SavedCard?: boolean;
			/**
			 * @description Подпись запроса
			 *
			 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
			 */
			Token: string;
			/**
			 * @description IP-адрес запроса
			 *
			 * @example 2011:0db8:85a3:0101:0101:8a2e:0370:7334
			 */
			IP?: string;
		};
		RemoveCard: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example testRegressBank
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example testCustomer1234
			 */
			CustomerKey: string;
			/**
			 * @description Идентификатор карты в системе Т‑Бизнес.
			 *
			 * @example 156516516
			 */
			CardId: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
			 */
			Token: string;
			/**
			 * @description IP-адрес запроса.
			 *
			 * @example 2011:0db8:85a3:0101:0101:8a2e:0370:7334
			 */
			IP?: string;
		};
		RemoveCardResponse: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Статус карты. `D` — удалена.
			 *
			 * @example D
			 */
			Status: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example testCustomer1234
			 */
			CustomerKey: string;
			/**
			 * @description Идентификатор карты в системе Т‑Бизнес.
			 *
			 * @example 156516516
			 */
			CardId: string;
			/**
			 * @description Тип карты:
			 *     * `0` — карта списания,
			 *     * `1` — карта пополнения,
			 *     * `2` — карта пополнения и списания.
			 *
			 * @example 0
			 * @enum {number}
			 */
			CardType: 0 | 1 | 2;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example Не удалось удалить карту клиента, для данного клиента такая карта не существует
			 */
			Details?: string;
		};
		GetQr: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Уникальный идентификатор транзакции в системе Т‑Бизнес. Запрос будет работать, даже если указать значение в формате `string`.
			 *
			 * @example 10063
			 */
			PaymentId: number;
			/**
			 * @description Тип возвращаемых данных:
			 *     * `PAYLOAD` — в ответе возвращается только Payload — по умолчанию;
			 *     * `IMAGE` — в ответе возвращается SVG изображение QR.
			 *
			 * @default PAYLOAD
			 * @example PAYLOAD
			 * @enum {string}
			 */
			DataType: "PAYLOAD" | "IMAGE";
			/**
			 * @description Подпись запроса.
			 * @example 871199b37f207f0c4f721a37cdcc71dfcea880b4a4b85e3cf852c5dc1e99a8d6
			 */
			Token: string;
		};
		QrResponse_FULL: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Номер заказа в системе мерчанта.
			 *
			 * @example 21057
			 */
			OrderId: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description В зависимости от параметра `DataType` в запросе:
			 *       * `Payload` — информация, которая должна быть закодирована в QR;
			 *       * `SVG` — изображение QR, в котором уже закодирован Payload.
			 *
			 * @example https://qr.nspk.ru/AS1000670LSS7DN18SJQDNP4B05KLJL2?type=01&bank=100000000001&sum=10000&cur=RUB&crc=C08B
			 */
			Data: string;
			/**
			 * @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
			 *
			 * @example 10063
			 */
			PaymentId: number;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 *
			 * @example Подробное описание ошибки
			 */
			Details?: string;
			/**
			 * @description Идентификатор запроса на привязку счета. Передается в случае привязки и одновременной оплаты по CБП.
			 *
			 * @example Идентификатор запроса
			 */
			RequestKey: string;
		};
		Member: {
			/**
			 * @description Идентификатор участника.
			 *
			 * @example 1000000
			 */
			MemberId: string;
			/**
			 * @description Наименование участника.
			 *
			 * @example T-Банк
			 */
			MemberName: string;
			/**
			 * @description * `true` — если данный участник был получателем
			 *     указанного платежа,
			 *     * `false` — если нет.
			 *
			 * @example true
			 */
			IsPayee: boolean;
		};
		AddAccountQr: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/** @description Подробное описание деталей заказа. */
			Description: string;
			/**
			 * @description Тип возвращаемых данных:
			 *     * `PAYLOAD` — в ответе возвращается только Payload. Значение по умолчанию.
			 *     * `IMAGE` — в ответе возвращается SVG-изображение QR.
			 *
			 * @default PAYLOAD
			 * @example PAYLOAD
			 * @enum {string}
			 */
			DataType: "PAYLOAD" | "IMAGE";
			/** @description JSON-объект, содержащий
			 *     дополнительные параметры в виде `ключ`:`значение`. Эти параметры будут
			 *     переданы на страницу оплаты, если она
			 *     кастомизирована. Максимальная длина для
			 *     каждого передаваемого параметра:
			 *       * ключ — 20 знаков,
			 *       * значение — 100 знаков.
			 *
			 *
			 *     Максимальное количество пар `ключ`:`значение` — не больше 20.
			 *      */
			Data?: {
				[key: string]: string | undefined;
			};
			/**
			 * Format: datatime
			 * @description Cрок жизни ссылки или динамического QR-кода СБП, если выбран этот способ
			 *     оплаты. Если параметр `RedirectDueDate` не был передан, проверяется настроечный параметр
			 *     платежного терминала `REDIRECT_TIMEOUT`, который может содержать значение срока жизни ссылки в
			 *     часах. Если его значение больше нуля, оно будет установлено в качестве срока жизни ссылки или
			 *     динамического QR-кода, если нет — устанавливается значение по умолчанию: 1440 мин (1 сутки).
			 *
			 *     Если текущая дата превышает дату, переданную в этом параметре, ссылка для оплаты или возможность
			 *     платежа по QR-коду становятся недоступными и платёж выполнить нельзя.
			 *     - Максимальное значение — 90 дней от текущей даты.
			 *     - Минимальное значение — 1 минута от текущей даты.
			 *     - Формат даты — `YYYY-MM-DDTHH24:MI:SS+GMT`.
			 *
			 * @example 2016-08-31T12:28:00+03:00
			 */
			RedirectDueDate?: string;
			/**
			 * @description Подпись запроса.
			 * @example 871199b37f207f0c4f721a37cdcc71dfcea880b4a4b85e3cf852c5dc1e99a8d6
			 */
			Token: string;
		};
		AddAccountQrResponse: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description В зависимости от параметра `DataType` в запросе:
			 *       * `Payload` — информация, которая должна быть закодирована в QR;
			 *       * `SVG` — изображение QR, в котором уже закодирован Payload.
			 *
			 * @example https://qr.nspk.ru/AS1000670LSS7DN18SJQDNP4B05KLJL2?type=01&bank=100000000001&sum=10000&cur=RUB&crc=C08B
			 */
			Data: string;
			/**
			 * @description Идентификатор запроса на привязку счета.
			 *
			 * @example ed989549-d3be-4758-95c7-22647e03f9ec
			 */
			RequestKey: string;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example OK
			 */
			Message?: string;
		};
		GetAddAccountQrState: {
			/**
			 * Format: uuid
			 * @description Идентификатор запроса на привязку счета.
			 *
			 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
			 */
			RequestKey: string;
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token: string;
		};
		GetAddAccountQrStateResponse: {
			/**
			 * @description Платежный ключ, выдается мерчанту при заведении
			 *     терминала.
			 *
			 * @example testRegress
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор запроса на привязку счета.
			 *
			 * @example 211258
			 */
			RequestKey: number;
			/**
			 * @description Идентификатор банка клиента, который будет
			 *     совершать оплату по привязанному счету —
			 *     заполнен, если статус `ACTIVE` или `INACTIVE`.
			 *
			 * @example 100000000004
			 */
			BankMemberId?: string;
			/**
			 * @description Наименование банка-эмитента — заполнен если передан `BankMemberId`.
			 *
			 * @example T-Банк
			 */
			BankMemberName?: string;
			/**
			 * @description Идентификатор привязки счета, назначаемый банком плательщика.
			 *
			 * @example a022254a5c3c46a7327c8a12cb5c8389
			 */
			AccountToken?: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Статус привязки карты:
			 *     * `NEW` — получен запрос на привязку счета;
			 *     * `PROCESSING` — запрос в обработке,
			 *     * `ACTIVE` — привязка счета успешна,
			 *     * `INACTIVE` — привязка счета неуспешна или деактивирована.
			 *
			 * @example ACTIVE
			 * @enum {string}
			 */
			Status: "NEW" | "PROCESSING" | "ACTIVE" | "INACTIVE";
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example OK
			 */
			Message?: string;
		};
		GetAccountQrList: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token: string;
		};
		GetAccountQrListResponse: {
			/**
			 * @description Платежный ключ, выдается мерчанту при заведении
			 *     терминала.
			 *
			 * @example testRegress
			 */
			TerminalKey: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example OK
			 */
			Message?: string;
			/** @description Список привязанных счетов покупателя по магазину.
			 *      */
			AccountTokens?: {
				/**
				 * Format: uuid
				 * @description Идентификатор запроса на привязку карты.
				 *
				 * @example 8de92934-26c9-474c-a4ce-424f2021d24d
				 */
				RequestKey: string;
				/**
				 * @description Статус привязки карты:
				 *     * `NEW` — получен запрос на привязку счета;
				 *     * `PROCESSING` — запрос в обработке,
				 *     * `ACTIVE` — привязка счета успешна,
				 *     * `INACTIVE` — привязка счета неуспешна или деактивирована.
				 *
				 * @enum {string}
				 */
				Status: "NEW" | "PROCESSING" | "ACTIVE" | "INACTIVE";
				/**
				 * @description Идентификатор привязки счета, назначаемый банком плательщика.
				 *
				 * @example 0b67f2cae19b41809f85d5674de30a1a
				 */
				AccountToken?: Record<string, never>;
				/**
				 * @description Идентификатор банка клиента (эмитент), который будет
				 *     совершать оплату по привязанному счету —
				 *     заполнен, если статус `ACTIVE` или `INACTIVE`.
				 *
				 * @example 5555
				 */
				BankMemberId?: string;
				/**
				 * @description Наименование банка-эмитента — заполнен если передан `BankMemberId`.
				 *
				 * @example T-Банк
				 */
				BankMemberName?: string;
			}[];
		};
		ChargeQr: {
			/**
			 * @description Идентификатор терминала. <br>
			 *     Выдается мерчанту в Т‑Бизнес при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Уникальный идентификатор транзакции в
			 *     системе Т‑Бизнес.
			 *
			 * @example 700001702044
			 */
			PaymentId: string;
			/**
			 * @description Идентификатор привязки счета,
			 *     назначаемый банком-эмитентом.
			 *
			 * @example 70LSS7DN18SJQRS10006DNPKLJL24B05
			 */
			AccountToken: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example f5a3be479324a6d3a4d9efa0d02880b77d04a91758deddcbd9e752a6df97cab5
			 */
			Token: string;
			/**
			 * @description IP-адрес клиента.
			 *
			 * @example 2011:0db8:85a3:0101:0101:8a2e:0370:7334
			 */
			IP?: string;
			/** @description `true`, если клиент хочет получать
			 *     уведомления на почту.
			 *      */
			SendEmail?: boolean;
			/**
			 * Format: email
			 * @description Адрес почты клиента. Обязательно, если передан параметр `SendEmail` = `true`.
			 *
			 * @example customer@test.com
			 */
			InfoEmail?: string;
		};
		ChargeQrResponse: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Сумма в копейках.
			 *
			 * @example 100000
			 */
			Amount: number;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 *
			 * @example 21050
			 */
			OrderId: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Статус платежа. Возвращается один из трех статусов:
			 *     * `CONFIRMED` — если платеж выполнен;
			 *     * `REJECTED` — если платеж не выполнен;
			 *     * `FORM SHOWED` — если форма оплаты пока что только отображается, и клиент еще не успел провести оплату.
			 *
			 * @enum {string}
			 */
			Status?: "CONFIRMED" | "REJECTED";
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId: string;
			/**
			 * @description Код ошибки:
			 *     * `0` — Успешная операция;
			 *     * `3013` — Рекуррентные платежи недоступны;
			 *     * `3015` — Неверный статус AccountToken;
			 *     * `3040` — Техническая ошибка;
			 *     * `3037` — Повторный вызов метода недоступен;
			 *     * `3041` — Слишком много неудачных попыток за сутки. Попробуйте еще раз завтра;
			 *     * `3042` — Слишком много неудачных попыток за час. Попробуйте снова через час;
			 *     * `9999` — Повторите попытку позже.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example Неверные параметры
			 */
			Message?: string;
			/** @description Подробное описание ошибки.
			 *      */
			Details?: string;
			/**
			 * @description Код валюты по `ISO 4217`.
			 * @example 643
			 */
			Currency?: number;
		};
		SbpPayTest: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId: string;
			/**
			 * @description Подпись запроса.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token: string;
			/**
			 * @description Признак эмуляции отказа проведения платежа банком по таймауту. По умолчанию не используется.
			 *     * `false` — эмуляция не требуется,
			 *     * `true` — требуется эмуляция. Не может быть использован вместе с `IsRejected` = `true`.
			 *
			 * @example true
			 */
			IsDeadlineExpired?: boolean;
			/**
			 * @description Признак эмуляции отказа банка в проведении платежа. По умолчанию не используется.
			 *     * `false` — эмуляция не требуется,
			 *     * `true` — требуется эмуляция. Не может быть использован вместе с `IsDeadlineExpired` = `true`.
			 *
			 * @example false
			 */
			IsRejected?: boolean;
		};
		SbpPayTestResponse: {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки
			 *
			 * @example OK
			 */
			Message: string;
			/**
			 * @description Подробное описание ошибки
			 *
			 * @example 0
			 */
			Details: string;
		};
		GetQRStateResponse_FULL: {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 * @enum {boolean}
			 */
			Success: true | false;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Статус платежа. <br>
			 *     Обязателен, если не произошло ошибки при получении статуса.
			 *
			 * @example CONFIRMED
			 */
			Status?: string;
			/**
			 * @description Код ошибки возврата, полученный от СБП.
			 *
			 * @example I05043
			 */
			QrCancelCode?: string;
			/**
			 * @description Дополнительное описание ошибки, произошедшей при возврате по QR.
			 *
			 * @example У клиента нет расчетного счета в этом банке. Попробуйте вернуть деньги на счет этого клиента в другом банке
			 */
			QrCancelMessage?: string;
			/**
			 * @description Номер заказа в системе мерчанта.
			 *
			 * @example 7830122
			 */
			OrderId?: string;
			/**
			 * @description Сумма отмены в копейках.
			 *
			 * @example 10000
			 */
			Amount?: number;
			/**
			 * @description Краткое описание ошибки, произошедшей при запросе статуса.
			 *
			 * @example OK
			 */
			Message?: string;
		};
		CheckOrder: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Номер заказа в системе мерчанта.
			 *
			 *     Не является уникальным идентификатором.
			 *
			 * @example 21057
			 */
			OrderId: string;
			/**
			 * @description Подпись запроса
			 * @example 4c4c36adf9936b011879fa26f60759e7b47e57f7968283129b0ae9ac457486ab
			 */
			Token: string;
		};
		/** @description Детали */
		PaymentsCheckOrder: {
			/**
			 * @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
			 *
			 * @example 124671934
			 */
			PaymentId: string;
			/**
			 * @description Сумма операции в копейках.
			 *
			 * @example 13660
			 */
			Amount?: number;
			/**
			 * @description Статус операции.
			 *
			 * @example NEW
			 */
			Status: string;
			/**
			 * @description RRN операции.
			 *
			 * @example 12345678
			 */
			RRN?: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: string;
			/**
			 * @description Код ошибки.
			 *
			 * @example 0
			 */
			ErrorCode?: number;
			/**
			 * @description Краткое описание ошибки.
			 *
			 * @example None
			 */
			Message?: string;
			/**
			 * @description Идентификатор платежа в СБП.
			 *
			 * @example A42631655397753A0000030011340501
			 */
			SbpPaymentId?: string;
			/**
			 * @description Хэшированный номер телефона покупателя.
			 *
			 * @example c4494ca1c0888b3fb0e2bfd0b83576aaae0d2c71161c5f472133ea9401473aee
			 */
			SbpCustomerId?: string;
		};
		"CheckOrder-2": {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 * @example 21057
			 */
			OrderId: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 * @example OK
			 */
			Message?: string;
			/**
			 * @description Подробное описание ошибки.
			 * @example None
			 */
			Details?: string;
			Payments: components["schemas"]["PaymentsCheckOrder"][];
		};
		SendClosingReceipt: {
			/**
			 * @description Идентификатор терминала выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 * @example 2304882
			 */
			PaymentId: string;
			/** @description Объект с данными чека. */
			Receipt:
				| components["schemas"]["Receipt_FFD_12"]
				| components["schemas"]["Receipt_FFD_105"];
			/** @description Подпись запроса */
			Token: string;
		};
		"SendClosingReceipt-2": {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 2304882
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки
			 * @example Неверные параметры
			 */
			Message?: string;
		};
		/** @description Дополнительные параметры платежа, переданные при создании заказа. Являются обязательными для платежей в рассрочку. В ответе параметр приходит в формате <code>Data</code> — не полностью в верхнем регистре. */
		DataNotification: {
			/**
			 * @description Способ платежа.
			 *
			 * @example TCB
			 * @enum {string}
			 */
			Route?: "TCB";
			/**
			 * @description Источник платежа.
			 *
			 * @example Installment
			 * @enum {string}
			 */
			Source?: "Installment";
			/**
			 * @description Сумма выданного кредита в копейках.
			 *
			 * @example 10000
			 */
			CreditAmount?: number;
		};
		/** @description **Уведомление о платеже**
		 *      */
		NotificationPayment: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey?: string;
			/**
			 * @description Сумма в копейках.
			 *
			 * @example 100000
			 */
			Amount?: number;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 *
			 * @example 21050
			 */
			OrderId?: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success?: boolean;
			/** @description Статус платежа.
			 *      */
			Status?: string;
			/**
			 * @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId?: number;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode?: string;
			/** @description Краткое описание ошибки.
			 *      */
			Message?: string;
			/** @description Подробное описание ошибки.
			 *      */
			Details?: string;
			/**
			 * @description Идентификатор автоплатежа.
			 * @example 3207469334
			 */
			RebillId?: number;
			/**
			 * @description Идентификатор карты в системе Т‑Бизнес.
			 *
			 * @example 10452089
			 */
			CardId?: number;
			/** @description Замаскированный номер карты или телефона. */
			Pan?: string;
			/**
			 * @description Срок действия карты
			 *     в формате `MMYY`, где `YY` — две последние цифры года.
			 *
			 * @example 0229
			 */
			ExpDate?: string;
			/**
			 * @description Подпись запроса. Формируется по такому же принципу, как и в случае
			 *     запросов в Т‑Бизнес.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token?: string;
			DATA?: components["schemas"]["DataNotification"];
		};
		/** @description **Уведомления о привязке**
		 *
		 *     Уведомления магазину о статусе выполнения метода привязки карты — **AttachCard**.
		 *     После успешного выполнения метода **AttachCard** Т‑Бизнес отправляет POST-запрос с информацией о привязке карты.
		 *     Уведомление отправляется на ресурс мерчанта на адрес `Notification URL` синхронно и ожидает ответа в течение 10 секунд.
		 *     После получения ответа или не получения его за заданное время сервис переадресует клиента на `Success AddCard URL`
		 *     или `Fail AddCard URL` — в зависимости от результата привязки карты.
		 *     В случае успешной обработки нотификации мерчант должен вернуть ответ с телом сообщения `OK` — без тегов, заглавными английскими буквами.
		 *
		 *     Если тело сообщения отлично от `OK`, любая нотификация считается неуспешной, и сервис будет повторно отправлять
		 *     нотификацию раз в час в течение 24 часов. Если за это время нотификация так и не доставлена, она складывается в дамп.
		 *      */
		NotificationAddCard: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey?: string;
			/**
			 * @description Идентификатор клиента в системе мерчанта.
			 *
			 * @example testCustomer1234
			 */
			CustomerKey?: string;
			/**
			 * Format: uuid
			 * @description Идентификатор запроса на привязку карты.
			 *
			 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
			 */
			RequestKey?: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success?: boolean;
			/**
			 * @description Статус привязки карты.
			 *     Возвращается один из двух статусов:
			 *       * `COMPLETED` — при одностадийной оплате;
			 *       * `REJECTED` — при двухстадийной оплате.
			 *
			 * @enum {string}
			 */
			Status?: "COMPLETED" | "REJECTED";
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId?: number;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode?: string;
			/**
			 * @description Идентификатор автоплатежа.
			 * @example 3207469334
			 */
			RebillId?: string;
			/**
			 * @description Идентификатор карты в системе Т‑Бизнес.
			 *
			 * @example 10452089
			 */
			CardId?: string;
			/** @description Замаскированный номер карты. */
			Pan?: string;
			/**
			 * @description Срок действия карты
			 *     в формате `MMYY`, где `YY` — две последние цифры года.
			 *
			 * @example 0229
			 */
			ExpDate?: string;
			/**
			 * @description Подпись запроса. Формируется по такому же принципу, как и в случае
			 *     запросов в Т‑Бизнес.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token?: string;
		};
		/** @description Объект с информацией о видах суммы платежа */
		"Receipt_FFD_12-2": {
			/** @description Версия ФФД.
			 *     Возможные значения:
			 *     * FfdVersion: `1.2`,
			 *     * FfdVersion: `1.05`.
			 *      */
			FfdVersion?: string;
			/** @description Информация по клиенту.
			 *      */
			ClientInfo?: components["schemas"]["ClientInfo"];
			/**
			 * @description Система налогообложения. Возможные значения:
			 *     * `osn` — общая СН;
			 *     * `usn_income` — упрощенная СН (доходы);
			 *     * `usn_income_outcome` — упрощенная СН (доходы минус расходы);
			 *     * `envd` — единый налог на вмененный доход;
			 *     * `esn` — единый сельскохозяйственный налог;
			 *     * `patent` — патентная СН.
			 *
			 * @example osn
			 * @enum {string}
			 */
			Taxation?:
				| "osn"
				| "usn_income"
				| "usn_income_outcome"
				| "envd"
				| "esn"
				| "patent";
			/**
			 * Format: email
			 * @description Электронная почта клиента.
			 *
			 * @example a@test.ru
			 */
			Email?: string;
			/**
			 * @description Телефон клиента в формате `+{Ц}`.
			 *
			 * @example +79031234567
			 */
			Phone?: string;
			/** @description Идентификатор/имя клиента. */
			Customer?: string;
			/** @description ИНН клиента. */
			CustomerInn?: string;
			/** @description Массив, содержащий в себе информацию о товарах. */
			Items?: components["schemas"]["Items_FFD_12"][];
			/** @description Объект c информацией о видах суммы платежа.
			 *     * Если объект не передан, будет автоматически указана итоговая сумма чека с видом оплаты
			 *      «Безналичный».
			 *     * Если передан объект `receipt.Payments`, значение в `Electronic` должно быть равно итоговому значению
			 *     Amount в методе **Init**. При этом сумма введенных значений по всем видам оплат, включая `Electronic`,
			 *     должна быть равна сумме (`Amount`) всех товаров, переданных в объекте `receipt.Items`.
			 *      */
			Payments?: components["schemas"]["Payments"][];
		};
		/** @description Объект с информацией о видах суммы платежа. */
		"Receipt_FFD_105-2": {
			/** @description Массив позиций чека с информацией о товарах. */
			Items?: components["schemas"]["Items_FFD_105"][];
			/**
			 * @description Версия ФФД.
			 *     Возможные значения:
			 *     * FfdVersion: `1.2`,
			 *     * FfdVersion: `1.05`.
			 *
			 *     Версия ФФД по умолчанию — `1.05`.
			 *
			 * @default 1.05
			 */
			FfdVersion: string;
			/**
			 * Format: email
			 * @description Электронная почта клиента.
			 *     Должен быть заполнен, если не передано значение
			 *     в параметре `Phone`.
			 *
			 * @example a@test.ru
			 */
			Email?: string;
			/**
			 * @description Телефон клиента в формате `+{Ц}`.
			 *
			 * @example +79031234567
			 */
			Phone?: string;
			/**
			 * @description Система налогообложения. Возможные значения:
			 *     * `osn` — общая СН;
			 *     * `usn_income` — упрощенная СН (доходы);
			 *     * `usn_income_outcome` — упрощенная СН (доходы минус расходы);
			 *     * `envd` — единый налог на вмененный доход;
			 *     * `esn` — единый сельскохозяйственный налог;
			 *     * `patent` — патентная СН.
			 *
			 * @example osn
			 * @enum {string}
			 */
			Taxation?:
				| "osn"
				| "usn_income"
				| "usn_income_outcome"
				| "envd"
				| "esn"
				| "patent";
			/** @description Объект c информацией о видах суммы платежа.
			 *     * Если объект не передан, будет автоматически указана итоговая сумма чека с видом оплаты
			 *      «Безналичный».
			 *     * Если передан объект `receipt.Payments`, значение в `Electronic` должно быть равно итоговому значению
			 *     Amount в методе **Init**. При этом сумма введенных значений по всем видам оплат, включая `Electronic`,
			 *     должна быть равна сумме (`Amount`) всех товаров, переданных в объекте `receipt.Items`.
			 *      */
			Payments?: components["schemas"]["Payments"][];
		};
		/** @description **Уведомление о фискализации**
		 *
		 *     Если используется подключенная онлайн касса, по результату фискализации будет
		 *     отправлено уведомление с фискальными данными.
		 *      */
		NotificationFiscalization: {
			/**
			 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
			 *     при заведении терминала.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey?: string;
			/**
			 * @description Идентификатор заказа в системе мерчанта.
			 *
			 * @example 21050
			 */
			OrderId?: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success?: boolean;
			/**
			 * @description Для уведомлений о фискализации — всегда `RECEIPT`.
			 *
			 * @default RECEIPT
			 */
			Status: string;
			/**
			 * @description Идентификатор платежа в системе Т‑Бизнес.
			 *
			 * @example 13660
			 */
			PaymentId?: number;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode?: string;
			/** @description Описание ошибки, если она произошла. */
			ErrorMessage?: string;
			/**
			 * @description Сумма в копейках.
			 *
			 * @example 100000
			 */
			Amount?: number;
			/** @description Номер чека в смене. */
			FiscalNumber?: number;
			/** @description Номер смены. */
			ShiftNumber?: number;
			/**
			 * Format: datetime
			 * @description Дата и время документа из ФН.
			 */
			ReceiptDatetime?: string;
			/** @description Номер ФН. */
			FnNumber?: string;
			/** @description Регистрационный номер ККТ. */
			EcrRegNumber?: string;
			/** @description Фискальный номер документа. */
			FiscalDocumentNumber?: number;
			/** @description Фискальный признак документа. */
			FiscalDocumentAttribute?: number;
			/** @description Состав чека */
			Receipt?:
				| components["schemas"]["Receipt_FFD_12-2"]
				| components["schemas"]["Receipt_FFD_105-2"];
			/** @description Признак расчета. */
			Type?: string;
			/**
			 * @description Подпись запроса. Формируется по такому же принципу, как и в случае
			 *     запросов в Т‑Бизнес.
			 *
			 * @example 7241ac8307f349afb7bb9dda760717721bbb45950b97c67289f23d8c69cc7b96
			 */
			Token?: string;
			/** @description Наименование оператора фискальных данных. */
			Ofd?: string;
			/** @description URL-адрес с копией чека. */
			Url?: string;
			/** @description URL-адрес с QR-кодом для проверки чека в ФНС. */
			QrCodeUrl?: string;
			/** @description Место осуществления расчетов. */
			CalculationPlace?: string;
			/** @description Имя кассира. */
			CashierName?: string;
			/** @description Место нахождения (установки) ККМ. */
			SettlePlace?: string;
		};
		/** @description **Уведомление о статусе привязки счета по QR**
		 *
		 *     После привязки счета по QR магазину отправляется статус привязки и токен.
		 *     Уведомление будет приходить по статусам `ACTIVE` и `INACTIVE`.
		 *      */
		NotificationQr: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 *
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * Format: uuid
			 * @description Идентификатор запроса на привязку счета.
			 *
			 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
			 */
			RequestKey: string;
			/**
			 * @description Идентификатор привязки счета,
			 *     назначаемый банком-эмитентом.
			 *
			 * @example 70LSS7DN18SJQRS10006DNPKLJL24B05
			 */
			AccountToken?: string;
			/**
			 * @description Идентификатор банка-эмитента клиента, который будет
			 *     совершать оплату по привязанному счету —
			 *     заполнен, если статус `ACTIVE`.
			 *
			 * @example 5555
			 */
			BankMemberId?: string;
			/** @description Наименование банка-эмитента. Заполнен, если передан `BankMemberId`.
			 *      */
			BankMemberName?: string;
			/**
			 * @description Тип уведомления, всегда — `LINKACCOUNT`.
			 * @default LINKACCOUNT
			 */
			NotificationType: string;
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 *
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 *
			 * @example 0
			 */
			ErrorCode: string;
			/** @description Краткое описание ошибки.
			 *      */
			Message?: string;
			/**
			 * @description Подпись запроса. Формируется по такому же
			 *     принципу, как и в случае запросов в Т‑Бизнес.
			 *
			 * @example 871199b37f207f0c4f721a37cdcc71dfcea880b4a4b85e3cf852c5dc1e99a8d6
			 */
			Token: string;
			/**
			 * @description Статус привязки.
			 * @example ACTIVE
			 */
			Status: string;
		};
		GetDeepLink: {
			/**
			 * @description Идентификатор терминала. <br> Выдается мерчанту в Т‑Бизнес при заведении терминала.
			 * @example bestforu
			 */
			TerminalKey: string;
			/**
			 * @description Уникальный идентификатор транзакции в системе Банка.
			 * @example 2559680770
			 */
			PaymentId: string;
			/**
			 * @description Подпись запроса.
			 * @example 871199b37f207f0c4f721a37cdcc71dfcea880b4a4b85e3cf852c5dc1e99a8d6
			 */
			Token: string;
		};
		GetDeepLinkResponse: {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 * @enum {boolean}
			 */
			Success: true | false;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Сформированный и подписанный JWT-токеном deeplink.
			 * @example mirpay://pay.mironline.ru/inapp/eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCIsImprdSI6Imh0dHBzOi8vc3AtbnNway5la2Fzc2lyLmNvbS9qd2tzL0IwMDAwMDAwMC1qd2tzLmp«Протокол MIRPAY EACQ с PCI DSS»28zb24iLCJraWQiOiIxMDAwIn0.eyJpYXQiOjE2NjA1NTMwNzksImlzcyI6IjAwMDAwMDAwIiwib3JkZXJJZCI6IjEyMzQ1NiIsInN1bSI6MTAwMDAsImN1ciI6NjQzLCJtZWRpYSI6IkRMIiwicnVybCI6Imh0dHBzOi8vbWVyY2hhbnQvYXBpL3YxL2luYXBwL21lcmNoYW50cy8wMDAwMDAwMC9vcmRlcnMvMTIzNDU2In0.rk0LjOtx3RR9hboAiVQopZvKzIQpu0SGg2wlt6a1LJN1gQ7NEqcXY0NXfjmhqbPdv8BnDonhXMWLoi9GK4wT8-P_TOfRnqz5JfA4crvtVaD6yvmfkmdFMsFjTDDJfcsaMlqblVw2u5De3SU9oCNKWaWLUUg7i6gRtTCFdvPc1XDlB7WUd_doHLVEV4s5kP1jmArXMBxo1EpJk3pZ-KHmxFeKLjf47NQuNzRv0wZKTgkHk252lXX9QBCE_uTBvV477YZ6FTqAXh9vP1zGiSG6Elel3EKMVxUNkMAhHIACxwmOGRpGsPv0WFlw1T0y44Q7paV_t6st6vlHO3RXYfbA
			 */
			Deeplink?: string;
			/** @description Краткое описание ошибки. */
			Message?: string;
			/** @description Подробное описание ошибки. */
			Details?: string;
		};
		GetTerminalPayMethods: {
			/**
			 * @description Идентификатор терминала. <br> Выдается мерчанту в Т‑Бизнес при заведении терминала.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description Тип подключения:
			 *     - API;
			 *     - SDK.
			 *
			 * @example API
			 */
			Paysource: string;
		};
		/** @description Перечень доступных методов оплаты */
		Paymethod: {
			/**
			 * @description Доступные методы оплаты:
			 *     * TinkoffPay,
			 *     * YandexPay,
			 *     * ApplePay,
			 *     * GooglePay,
			 *     * SBP,
			 *     * MirPay.
			 *
			 * @example TinkoffPay
			 */
			PayMethod: string;
			/**
			 * @description Перечень параметров подключения в формате ключзначение
			 * @example "Version":2.0,
			 *     "CustomButton":{
			 *       "СustomButtonType":"percentButton",
			 *       "Percent":5,}
			 *
			 */
			Params?: Record<string, never>;
		};
		GetTerminalPayMethodsResponse: {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 * @enum {boolean}
			 */
			Success: true | false;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/** @description Краткое описание ошибки. */
			Message?: string;
			/** @description Подробное описание ошибки. */
			Details?: string;
			/** @description Характеристики терминала. */
			TerminalInfo: Record<string, never>;
			/** @description Перечень доступных методов оплаты. */
			"TerminalInfo.Paymethods"?: components["schemas"]["Paymethod"][];
			/**
			 * @description Признак возможности сохранения карт.
			 * @example false
			 * @enum {boolean}
			 */
			"TerminalInfo.AddCardScheme": true | false;
			/**
			 * @description Признак необходимости подписания токеном.
			 * @example true
			 * @enum {boolean}
			 */
			"TerminalInfo.TokenRequired": true | false;
			/**
			 * @description Признак необходимости подписания токеном запроса **Init**.
			 * @example true
			 * @enum {boolean}
			 */
			"TerminalInfo.InitTokenRequired": true | false;
		};
		/** URL */
		by_url: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description URL сервиса получения справок.
			 * @example https://www.tinkoff.ru
			 */
			CallbackUrl: string;
			/**
			 * @description JSON-массив, содержащий в себе перечень `paymentID` (уникальных идентификаторов в системе Т‑Бизнес) c типом `Number`.
			 * @example [
			 *       1201206437,
			 *       1201206442
			 *     ]
			 */
			PaymentIdList: number[];
			/**
			 * @description Подпись запроса.
			 * @example f2fdd7fec8225872590e1558b7ea258c75df8f300d808006c41ab540dd7514d9
			 */
			Token: string;
		};
		/** Email */
		by_email: {
			/**
			 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
			 * @example TinkoffBankTest
			 */
			TerminalKey: string;
			/**
			 * @description JSON-массив, содержащий в себе перечень `paymentID` (уникальных идентификаторов в системе Т‑Бизнес) c типом `Number`.
			 * @example [
			 *       1201206437,
			 *       1201206442
			 *     ]
			 */
			PaymentIdList: number[];
			/**
			 * @description JSON-массив, содержащий перечень `Email` с типом `String`.
			 * @example [
			 *       "test1@tinkoff.ru",
			 *       "test2@tinkoff.ru"
			 *     ]
			 */
			EmailList: string[];
			/**
			 * @description Подпись запроса.
			 * @example f2fdd7fec8225872590e1558b7ea258c75df8f300d808006c41ab540dd7514d9
			 */
			Token: string;
		};
		/** @description JSON-массив с объектами, содержащими информацию по запросу. */
		PaymentIdListForGCO: {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Сервисное сообщение.
			 * @example Запрос на отправку документа принят
			 */
			Message: string;
			/**
			 * @description Идентификатор операции.
			 * @example 1201206442
			 */
			PaymentId: number;
		};
		/** URL */
		response_by_url: {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 * @example OK
			 */
			Message?: string;
			PaymentIdList: components["schemas"]["PaymentIdListForGCO"][];
		};
		/** Email */
		response_by_email: {
			/**
			 * @description Успешность прохождения запроса — `true`/`false`.
			 * @example true
			 */
			Success: boolean;
			/**
			 * @description Код ошибки. `0` в случае успеха.
			 * @example 0
			 */
			ErrorCode: string;
			/**
			 * @description Краткое описание ошибки.
			 * @example OK
			 */
			Message?: string;
			PaymentIdList: components["schemas"]["PaymentIdListForGCO"][];
		};
	};
}

/**
 * Сгенерированные из OpenAPI типы для `operations`
 */
export interface operations {
	Init: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["Init_FULL"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Response"];
				};
			};
		};
	};
	Check3dsVersion: {
		requestBody: {
			content: {
				"application/json": {
					/** @description Идентификатор платежа в системе Т‑Бизнес.
					 *      */
					PaymentId: string;
					/** @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
					 *      */
					TerminalKey: string;
					/** @description Зашифрованные данные карты в формате:
					 *       ```
					 *       PAN=4300000000000777;ExpDate=0519;CardHolder=IVAN PETROV;CVV=111
					 *       ```
					 *      */
					CardData: string;
					/** @description Подпись запроса.
					 *      */
					Token: string;
				};
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Версия протокола 3DS.
						 *     Примеры:
						 *     * `1.0.0` — первая версия,
						 *     * `2.1.0` — вторая версия.
						 *      */
						Version: string;
						/** @description Уникальный идентификатор транзакции,
						 *     который генерируется 3DS-Server. Обязательный
						 *     параметр для 3DS второй версии.
						 *      */
						TdsServerTransID?: string;
						/**
						 * Format: uri
						 * @description Дополнительный параметр для 3DS второй
						 *     версии, который позволяет пройти этап по
						 *     сбору данных браузера ACS-ом.
						 *
						 */
						ThreeDSMethodURL?: string;
						/** @description Платежная система карты.
						 *      */
						PaymentSystem: string;
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
					};
				};
			};
		};
	};
	"3DSMethod": {
		requestBody?: {
			content: {
				"application/x-www-form-urlencoded": components["schemas"]["3DSMethod"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["3DSMethod-2"];
				};
			};
		};
	};
	FinishAuthorize: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["FinishAuthorize_FULL"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json":
						| components["schemas"]["Without3DS"]
						| components["schemas"]["With3DS"]
						| components["schemas"]["With3DSv2APP"]
						| components["schemas"]["With3DSv2BRW"];
				};
			};
		};
	};
	AddCard: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["AddCard_FULL"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["AddCardResponse_FULL"];
				};
			};
		};
	};
	AttachCard: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["AttachCard"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["AttachCardResponse"];
				};
			};
		};
	};
	ACSUrl: {
		requestBody?: {
			content: {
				"application/x-www-form-urlencoded":
					| components["schemas"]["ACSUrl_V1"]
					| components["schemas"]["ACSUrl_V2"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json":
						| components["schemas"]["ACSUrlResponseV1"]
						| components["schemas"]["ACSUrlResponseV2"];
				};
			};
		};
	};
	Confirm: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["Confirm"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Confirm-2"];
				};
			};
		};
	};
	Cancel: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["Cancel"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["Cancel-2"];
				};
			};
		};
	};
	ChargePCI: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["Charge_FULL"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/**
						 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
						 *     при заведении терминала.
						 *
						 * @example TinkoffBankTest
						 */
						TerminalKey: string;
						/**
						 * @description Сумма в копейках.
						 *
						 * @example 100000
						 */
						Amount: number;
						/**
						 * @description Идентификатор заказа в системе мерчанта.
						 *
						 * @example 21050
						 */
						OrderId: string;
						/**
						 * @description Успешность прохождения запроса — `true`/`false`.
						 *
						 * @example true
						 */
						Success: boolean;
						/**
						 * @description Статус платежа. Возвращается один из статусов:
						 *     * `CONFIRMED` — если платеж выполнен;
						 *     * `REJECTED` — если платеж не выполнен.
						 *
						 * @example NEW
						 */
						Status: string;
						/**
						 * @description Идентификатор платежа в системе Т‑Бизнес.
						 *
						 * @example 13660
						 */
						PaymentId: string;
						/**
						 * @description Код ошибки. `0` в случае успеха.
						 *
						 * @example 0
						 */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
					};
				};
			};
		};
	};
	GetState: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetState_FULL"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
						 *     при заведении терминала.
						 *      */
						TerminalKey: string;
						/** @description Сумма в копейках.
						 *      */
						Amount: number;
						/** @description Идентификатор заказа в системе мерчанта.
						 *      */
						OrderId: string;
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Статус платежа. Подробнее — в разделе [Статусная модель платежа](#tag/Scenarii-oplaty-po-karte/Statusnaya-model-platezha).
						 *      */
						Status: string;
						/** @description Идентификатор платежа в системе Т‑Бизнес.
						 *      */
						PaymentId: string;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
						/** @description Информация по способу оплаты или деталям для платежей в рассрочку.
						 *      */
						Params?: components["schemas"]["Items_Params"][];
					};
				};
			};
		};
	};
	AddCustomer: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["AddCustomer"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["AddCustomerResponse"];
				};
			};
		};
	};
	GetCustomer: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetOrRemoveCustomer"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["GetCustomerResponse"];
				};
			};
		};
	};
	RemoveCustomer: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetOrRemoveCustomer"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RemoveCustomerResponse"];
				};
			};
		};
	};
	GetAddCardState: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetAddCardState"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["GetAddCardStateResponse"];
				};
			};
		};
	};
	GetCardList: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetCardList_FULL"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Идентификатор карты в системе Т‑Бизнес
						 *      */
						CardId: string;
						/** @description Номер карты
						 *      */
						Pan: string;
						/**
						 * @description Статус карты:
						 *     * A — активная,
						 *     * D — удаленная.
						 *
						 * @enum {string}
						 */
						Status: "A" | "D";
						/** @description Идентификатор рекуррентного платежа
						 *      */
						RebillId?: string;
						/**
						 * @description Тип карты:
						 *     * карта списания (0),
						 *     * карта пополнения (1),
						 *     * карта пополнения и списания (2).
						 *
						 * @enum {number}
						 */
						CardType: 0 | 1 | 2;
						/** @description Срок действия карты
						 *      */
						ExpDate?: string;
					}[];
				};
			};
		};
	};
	RemoveCard: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["RemoveCard"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["RemoveCardResponse"];
				};
			};
		};
	};
	GetQr: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetQr"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["QrResponse_FULL"];
				};
			};
		};
	};
	SubmitRandomAmount: {
		requestBody: {
			content: {
				"application/json": {
					/**
					 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
					 *
					 * @example testRegressBank
					 */
					TerminalKey: string;
					/**
					 * @description Идентификатор запроса на привязку карты.
					 *
					 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
					 */
					RequestKey: string;
					/**
					 * @description Сумма в копейках.
					 *
					 * @example 100000
					 */
					Amount: number;
					/**
					 * @description Подпись запроса.
					 *
					 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
					 */
					Token: string;
				};
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/**
						 * @description Идентификатор терминала. Выдается мерчанту в Т‑Бизнес
						 *     при заведении терминала.
						 *
						 * @example TinkoffBankTest
						 */
						TerminalKey: string;
						/**
						 * @description Идентификатор клиента в системе мерчанта.
						 *
						 * @example testCustomer1234
						 */
						CustomerKey: string;
						/**
						 * @description Идентификатор запроса на привязку карты.
						 *
						 * @example 13021e10-a3ed-4f14-bcd1-823b5ac37390
						 */
						RequestKey: string;
						/** @description Идентификатор рекуррентного платежа.
						 *      */
						RebillId?: string;
						/**
						 * @description Идентификатор карты в системе Т‑Бизнес.
						 *
						 * @example 156516516
						 */
						CardId: string;
						/**
						 * @description Успешность прохождения запроса — `true`/`false`.
						 *
						 * @example true
						 */
						Success: boolean;
						/**
						 * @description Код ошибки. `0` в случае успеха.
						 *
						 * @example 0
						 */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
						/**
						 * @description Статус платежа.
						 *
						 * @example NEW
						 */
						Status?: string;
					};
				};
			};
		};
	};
	Submit3DSAuthorization: {
		requestBody: {
			content: {
				"application/x-www-form-urlencoded": {
					/**
					 * @description Уникальный идентификатор транзакции в системе. Возвращается в ответе от ACS.
					 *
					 * @example 2561504
					 */
					MD: string;
					/**
					 * @description Шифрованная строка, содержащая результаты 3-D Secure аутентификации. Возвращается в ответе от ACS.
					 *
					 * @example eJxVUttygjAU/BWG1w4mXKXOMY5WOrVTrOOtl7cAqeJI1AAO+vVNFKrlaffkZM9mD9Crsq12ZCJPd7yrmy2sa4zHuyTlq66+mD8bvt4jMF8LxoYzFpeCEQhZntMV09JE3vC8Hx9j27A8LzEcN7aNCPu24VIrihKXetiPdAKT/pQdCNSDiJzTsgA1VCqKeE15QYDGh8FoTBy73fZtQDWFjInRkFi4+Uz82JbH1zJwmjEyHcwAXRDEu5IX4kQ8R/Y0BEqxJeui2HcQOlGesKolSkCqCuhmYFIqlEuVKk3IDL8uPwI3jDaBGZ4XeLxZVeFw5I7nX11AqgMSWjDpzPSxb/ma6XRct4Pl4y51oJkar5zLx1wx7NWI/t3BfQFkxkKuoHHfMGDVfseZugLoDwO6+X16UfHFhUyk/32OMH3vZ5+nYBu/2d4xcMTDsn04j19VqJcmpZjKYKT3q6QigJQMqveF6lVL9O8X+AWMIbbt
					 */
					PaRes: string;
					/**
					 * @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
					 *
					 * @example 10063
					 */
					PaymentId?: string;
					/**
					 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
					 *
					 * @example testRegressBank
					 */
					TerminalKey: string;
					/**
					 * @description Подпись запроса.
					 *
					 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
					 */
					Token?: string;
				};
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
						 *      */
						TerminalKey: string;
						/** @description Номер заказа в системе мерчанта.
						 *      */
						OrderId: string;
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Статус транзакции:
						 *     - `CONFIRMED` — при успешном сценарии и одностадийном проведении платежа;
						 *     - `AUTHORIZED` — при успешном сценарии и двухстадийном проведении платежа;
						 *     - `REJECTED` — при неуспешном сценарии.
						 *      */
						Status: string;
						/** @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
						 *      */
						PaymentId: string;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
					};
				};
			};
		};
	};
	Submit3DSAuthorizationV2: {
		requestBody: {
			content: {
				"application/x-www-form-urlencoded": {
					/**
					 * @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
					 *
					 * @example 10063
					 */
					PaymentId: string;
					/**
					 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
					 *
					 * @example testRegressBank
					 */
					TerminalKey: string;
					/**
					 * @description Подпись запроса.
					 *
					 * @example 30797e66108934dfa3d841b856fdad227c6b9c46d6a39296e02dc800d86d181e
					 */
					Token: string;
				};
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Номер заказа в системе мерчанта.
						 *      */
						OrderId: string;
						/** @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
						 *      */
						TerminalKey: string;
						/** @description Статус транзакции
						 *      */
						Status: string;
						/** @description Уникальный идентификатор транзакции в системе Т‑Бизнес.
						 *      */
						PaymentId: string;
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
					};
				};
			};
		};
	};
	Status: {
		parameters: {
			path: {
				/** @description Платежный ключ, выдается мерчанту при заведении
				 *     терминала.
				 *      */
				TerminalKey: string;
			};
		};

		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Параметры ответа.
						 *      */
						Params: {
							/** @description Наличие возможности проведения оплаты
							 *     T‑Pay по API, SDK.
							 *      */
							Allowed: boolean;
							/** @description Версия T‑Pay, доступная на терминале:
							 *     * `1.0` — e-invoice,
							 *     * `2.0` — T‑Pay.
							 *      */
							Version?: string;
						};
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
					};
				};
			};
		};
	};
	Link: {
		parameters: {
			path: {
				/** @description Идентификатор платежа в системе Т‑Бизнес
				 *      */
				paymentId: number;
				/** @description Версия T‑Pay, доступная на терминале:
				 *     * 2.0 (T‑Pay)
				 *      */
				version: string;
			};
		};

		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Параметры ответа
						 *      */
						Params: {
							/**
							 * Format: uri
							 * @description Link для перехода в приложение MB на мобильных
							 *     устройствах
							 *
							 */
							RedirectUrl: string;
							/**
							 * Format: uri
							 * @description URL для получения QR
							 *
							 */
							WebQR?: string;
						};
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки
						 *      */
						Details?: string;
					};
				};
			};
		};
	};
	QR: {
		parameters: {
			path: {
				/** @description Уникальный идентификатор транзакции в
				 *     системе Т‑Бизнес.
				 *      */
				paymentId: number;
			};
		};

		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"image/svg": unknown;
				};
			};
		};
	};
	SberPayQR: {
		parameters: {
			path: {
				/** @description Уникальный идентификатор транзакции в
				 *     системе Т‑Бизнес.
				 *      */
				paymentId: string;
			};
		};

		responses: {
			/** @description SVG QR, размер — 124*124. */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"image/svg": unknown;
				};
			};
		};
	};
	SberPaylink: {
		parameters: {
			path: {
				/** @description Уникальный идентификатор транзакции в
				 *     системе Т‑Бизнес.
				 *      */
				paymentId: number;
			};
		};

		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Параметры ответа.
						 *      */
						Params: {
							/**
							 * Format: uri
							 * @description URL для перехода.
							 *
							 */
							RedirectUrl: string;
						};
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
						/** @description Подробное описание ошибки.
						 *      */
						Details?: string;
					};
				};
			};
		};
	};
	QrMembersList: {
		requestBody: {
			content: {
				"application/json": {
					/** @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес.
					 *      */
					TerminalKey: string;
					/** @description Уникальный идентификатор транзакции в системе
					 *     Т‑Бизнес
					 *      */
					PaymentId: string;
					/** @description Подпись запроса. */
					Token: string;
				};
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": {
						/** @description Массив списка участников. Возвращается,
						 *     только если возврат возможен.
						 *      */
						Members?: components["schemas"]["Member"][];
						/** @description Идентификатор заказа в системе мерчанта.
						 *      */
						OrderId: string;
						/** @description Успешность прохождения запроса — `true`/`false`.
						 *      */
						Success: boolean;
						/** @description Код ошибки. `0` в случае успеха.
						 *      */
						ErrorCode: string;
						/** @description Краткое описание ошибки.
						 *      */
						Message?: string;
					};
				};
			};
		};
	};
	AddAccountQr: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["AddAccountQr"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["AddAccountQrResponse"];
				};
			};
		};
	};
	GetAddAccountQrState: {
		requestBody?: {
			content: {
				"application/json": components["schemas"]["GetAddAccountQrState"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["GetAddAccountQrStateResponse"];
				};
			};
		};
	};
	GetAccountQrList: {
		requestBody?: {
			content: {
				"application/json": components["schemas"]["GetAccountQrList"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["GetAccountQrListResponse"];
				};
			};
		};
	};
	ChargeQr: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["ChargeQr"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ChargeQrResponse"];
				};
			};
		};
	};
	SbpPayTest: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["SbpPayTest"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["SbpPayTestResponse"];
				};
			};
		};
	};
	GetQrState: {
		requestBody: {
			content: {
				"application/json": {
					/**
					 * @description Идентификатор терминала, выдается мерчанту в Т‑Бизнес
					 *
					 * @example TinkoffBankTest
					 */
					TerminalKey: string;
					/**
					 * @description Уникальный идентификатор транзакции в системе
					 *     Т‑Бизнес, полученный в ответе на вызов метода Init
					 *
					 * @example 700031849
					 */
					PaymentId: string;
					/**
					 * @description Подпись запроса
					 *
					 * @example l43kb4hyi6lknb23bv4gdfskjn238fsllsdf8
					 */
					Token: string;
				};
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["GetQRStateResponse_FULL"];
				};
			};
		};
	};
	CheckOrder: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["CheckOrder"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["CheckOrder-2"];
				};
			};
		};
	};
	SendClosingReceipt: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["SendClosingReceipt"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["SendClosingReceipt-2"];
				};
			};
		};
	};
	GetDeepLink: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetDeepLink"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["GetDeepLinkResponse"];
				};
			};
		};
	};
	GetTerminalPayMethods: {
		requestBody: {
			content: {
				"application/json": components["schemas"]["GetTerminalPayMethods"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["GetTerminalPayMethodsResponse"];
				};
			};
		};
	};
	GetConfirmOperation: {
		requestBody?: {
			content: {
				"application/json":
					| components["schemas"]["by_url"]
					| components["schemas"]["by_email"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json":
						| components["schemas"]["response_by_url"]
						| components["schemas"]["response_by_email"];
				};
			};
		};
	};
	Notification: {
		requestBody?: {
			content: {
				"application/json":
					| components["schemas"]["NotificationPayment"]
					| components["schemas"]["NotificationAddCard"]
					| components["schemas"]["NotificationFiscalization"]
					| components["schemas"]["NotificationQr"];
			};
		};
		responses: {
			/** @description OK */
			200: {
				headers: {
					[name: string]: unknown;
				};
			};
		};
	};
}
