# Features Layer

`features` хранит пользовательские сценарии и бизнес-операции.

Примеры будущих модулей:

- `request-contact`
- `catalog-filter`
- `project-slider`

Рекомендации:

- один feature = одна отдельная пользовательская задача;
- feature не должен зависеть от `pages` и `widgets`;
- публичный API фичи оформляется через `index.ts`.
