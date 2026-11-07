# Технические источники 0.3

- [AdGuard API MV3: интеграция, локальные программные правила, конфигурация](https://github.com/AdguardTeam/tsurlfilter/blob/master/packages/adguard-api-mv3/README.md). Закреплена npm-версия 3.0.0; ориентир для реализации — код её опубликованного пакета, а не изменяющийся master.
- [AdGuard Filters](https://github.com/AdguardTeam/AdguardFilters) и [RU AdList](https://github.com/easylist/ruadlist): исходные фильтры. Конкретные URL исправлений и их SHA-256 находятся в исходниках/снимке.
- [Chrome DNR](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest): лимиты, статические/динамические правила, header conditions с Chromium 128. Шесть таких правил исключены для целевого Chromium 121.
- [Chrome content scripts](https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts), [Shadow DOM API](https://developer.chrome.com/docs/extensions/reference/api/dom), [MV3 remote logic](https://developer.chrome.com/docs/webstore/program-policies/mv3-requirements).
- [Яндекс: расширения и установка CRX3](https://browser.yandex.ru/help/ru/personalization/extension), [безопасность расширений](https://browser.yandex.ru/help/ru/security/check-extensions). Фактическая установка и сохранение нашей сборки в Яндекс Браузере здесь не проверены.

Сторонние расширения из магазина использовались как источник технических идей в версии 0.2. Их закрытый код не включён. Пользовательские скрипты, выполняющие жалобы или оценки от имени пользователя, не перенесены.
