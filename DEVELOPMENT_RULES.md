# Development Rules

## 1) Архитектура проекта

Текущая структура:

- `src/app` — инициализация приложения, router, store
- `src/components` — композиционные компоненты (например, `header`)
- `src/layouts` — layout-обвязки страниц
- `src/pages` — route-level страницы
- `src/shared/config` — статические конфиги (роуты, навигация)
- `src/shared/types` — общие типы
- `src/shared/ui` — переиспользуемые UI-примитивы

## 2) Именование и файлы

- Все папки и файлы: только `kebab-case`
- Каждый UI-компонент имеет пару:
  - `component-name.tsx`
  - `component-name.module.css`
- Запрещено создавать глобальные классы в `index.css` для конкретных компонентов.

## 3) Тема (single source of truth)

- Единственный источник темы: `src/app/store/theme/theme-tokens.ts`
- В этом файле хранить:
  - цвета
  - typography
  - spacing
  - radius
  - shadows
  - blur
  - breakpoints
  - variant-секции (`primary`, `neutral`, `ghost`, `hover` и т.д.)
- Новые токены добавлять только в `theme-tokens.ts`, затем использовать через CSS variables.
- Не создавать отдельные `theme-tokens.css`.

## 4) Правила CSS

- Только CSS Modules для компонентных стилей.
- `index.css` — только reset/base стили браузера и базовые глобальные правила.
- В стилях использовать только CSS variables (`var(--...)`), не хардкодить цвета/отступы в компонентах.
- Hover/active/focus состояния задавать в модуле компонента, значения брать из theme tokens.

## 5) Router и страницы

- Все route-пути централизованно хранить в `src/shared/config/route-paths.ts`.
- Конфиг роутов хранить в `src/app/router/app-route-config.tsx`.
- В `pages` не хранить бизнес-логику: только route-level композиция.

## 6) Store

- Store держать модульно: `src/app/store/<domain>/...`.
- Для каждого домена хранить:
  - `*-slice.ts`
  - `*-selectors.ts`
  - при необходимости `*-types.ts`
- В `root-reducer.ts` подключать только реально используемые слайсы.

## 7) Импорты

- Использовать alias `@/...` для межмодульных импортов.
- Относительные импорты (`./`, `../`) только внутри текущего модуля.

## 8) Качество и проверки

Перед каждым коммитом обязательно:

1. `npm run lint`
2. `npm run format:check`
3. `npm run build`

Если хотя бы одна команда падает, коммит не делается.

## 9) Что не делать

- Не добавлять неиспользуемые UI-примитивы «на будущее».
- Не дублировать значения темы в CSS/TS в разных местах.
- Не смешивать layout-стили и styles конкретных компонентов в одном файле.
