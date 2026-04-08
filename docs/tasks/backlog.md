# Backlog

## Ready

- Открытых задач нет. Следующий агент может заводить новые пункты по итогам review, product-priority или архитектурных решений.

## Done

### TASK-001

- Status: Done
- Date: 2026-04-08
- Priority: High
- Title: Начать выносить контент и предметные модели из `widgets` в `entities/features`
- Result:
  Первая волна миграции выполнена. Доменные данные для home-секций `about`, `contact`, `services`, `projects` вынесены из `widgets` в `entities`, а контактное меню переведено на общий navigation-config из `shared`.
- Verification:
  После рефакторинга должны проходить `npm run build`, `npm run lint`, `npm run lint:styles`, `npm run format:check`.

### TASK-002

- Status: Done
- Date: 2026-04-08
- Priority: High
- Title: Добавить покрытие тестами для текущего frontend на `Vitest`, `React Testing Library`, `jsdom`
- Result:
  Подключён test-stack, добавлены scripts и базовые тесты для модалки, навигационной логики, роутинга и интерактивного блока проектов.
- Verification:
  После внедрения должны проходить `npm run test:run`, `npm run build`, `npm run lint`, `npm run lint:styles`, `npm run format:check`.

### TASK-003

- Status: Done
- Date: 2026-04-08
- Priority: High
- Title: Починить hash-навигацию и синхронизацию active state/title с роутером
- Result:
  Hash-навигация переведена на источник истины из роутера, добавлены единый `HashLink`, централизованный scroll helper и тесты на same-page переходы и title-sync.
- Verification:
  Должны проходить сценарии переходов по `/#home`, `/#assortment`, `/#about`, `/#projects`, `/#contacts`, а также `npm run test:run`, `npm run build`, `npm run lint`, `npm run lint:styles`.

### TASK-004

- Status: Done
- Date: 2026-04-08
- Priority: High
- Title: Убрать из test setup глобальные DOM-моки, искажающие focus/visibility-поведение
- Result:
  Глобальные моки геометрии удалены из `src/test/setup.ts`; нужные размеры и видимость теперь задаются адресно в тестах `Modal`.
- Verification:
  Должны проходить `npm run test:run`, `npm run build`, `npm run lint`, `npm run lint:styles`.

### TASK-005

- Status: Done
- Date: 2026-04-08
- Priority: Medium
- Title: Привести coverage workflow в рабочее состояние для репозитория
- Result:
  `coverage/` исключён из Git и tooling, а coverage-конфиг сфокусирован на исполняемом `ts/tsx` без ассетов, barrel-файлов и test-хелперов.
- Verification:
  Должны проходить `npm run test:coverage`, `npm run lint`, `npm run format:check`, а `coverage/` не должен появляться в `git status`.

### TASK-006

- Status: Done
- Date: 2026-04-08
- Priority: Medium
- Title: Проверить и закрыть уязвимости из `npm audit` после добавления test stack
- Result:
  Выполнен `npm audit` remediation: `vite` обновлён до безопасного patch-уровня, транзитивные уязвимые пакеты обновлены через lockfile, итоговый audit чистый.
- Verification:
  Должны проходить `npm audit`, `npm run test:run`, `npm run build`, `npm run lint`, `npm run format:check`.

### TASK-007

- Status: Done
- Date: 2026-04-08
- Priority: Medium
- Title: Добрать тесты для самых рискованных UI-веток `SiteHeader` и `HomeHeroSection`
- Result:
  Добавлены тесты на закрытие мобильного меню при переходе в desktop-breakpoint, переключение dark-tone у header и оба режима warranty ticker в hero-блоке: reduced-motion и обычный layout-driven marquee.
- Verification:
  Должны проходить `npm run test:run`, `npm run build`, `npm run lint`, `npm run lint:styles`, `npm run format:check`.

### TASK-008

- Status: Done
- Date: 2026-04-08
- Priority: High
- Title: Перестроить `SiteHeader` на три адаптивных режима `mobile / compact tablet / full desktop`
- Result:
  Убран жёсткий JS-breakpoint для закрытия мобильного меню, а header переведён на три состояния: mobile ниже `900px`, compact tablet в диапазоне `900-1279px` и full desktop от `1280px`. В compact-режиме уменьшены pill-контролы, уплотнены gaps и убран отдельный CTA, чтобы навигация опиралась на реальную вместимость layout.
- Verification:
  Должны проходить `npm run test:run`, `npm run build`, `npm run lint`, `npm run lint:styles`, `npm run format:check`.
