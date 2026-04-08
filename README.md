# Leader Group Frontend

Frontend проекта Leader Group на `React + TypeScript + Vite`.

## Запуск

```bash
npm install
npm run dev
```

## Скрипты

- `npm run dev` — локальная разработка
- `npm run build` — production-сборка (`tsc -b && vite build`)
- `npm run lint` — проверка ESLint
- `npm run lint:styles` — базовая проверка CSS через Stylelint
- `npm run format` — автоформатирование Prettier
- `npm run format:check` — проверка форматирования без изменений
- `npm run preview` — локальный preview собранного билда
- `npm run test` — запуск Vitest в watch-режиме
- `npm run test:run` — однократный прогон тестов
- `npm run test:coverage` — прогон тестов с coverage-отчётом

## Архитектура

Проект разделен по слоям:

- `src/app` — bootstrap, providers, router, layout
- `src/pages` — композиция страниц из виджетов
- `src/widgets` — крупные UI-блоки
- `src/features` — пользовательские сценарии (задел)
- `src/entities` — доменные сущности (задел)
- `src/shared` — переиспользуемая инфраструктура и базовый UI

Подробные правила: [docs/architecture.md](./docs/architecture.md)

## Алиасы импортов

Для удобных и коротких импортов доступны:

- `@/*` -> `src/*`
- `@app/*` -> `src/app/*`
- `@pages/*` -> `src/pages/*`
- `@widgets/*` -> `src/widgets/*`
- `@features/*` -> `src/features/*`
- `@entities/*` -> `src/entities/*`
- `@shared/*` -> `src/shared/*`
- `@assets/*` -> `src/assets/*`

## Дизайн

Референсы и правила стиля лежат в `styles-docs/`.
