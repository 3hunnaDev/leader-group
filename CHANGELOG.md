# CHANGELOG.md

В этом файле фиксируются все заметные изменения проекта. Новые записи добавляются сверху.

## 2026-04-14

### Added

- Добавлены новые entity-модели `company-proof`, `company-approach` и общий `MediaPlaceholder` для финальных editorial media-slots без подстановки изображений.
- Добавлены новые home-widget секции `proof` и `approach` как часть нового narrative главной страницы.

### Changed

- Главная страница полностью пересобрана под новый English editorial-redesign: обновлены hero, solutions, projects и footer/contact, а старая `about`-секция заменена на proof/approach композицию.
- Навигация и page-title синхронизированы с новой структурой секций `home / solutions / why-us / projects / contact`.
- Контент `services`, `projects` и `company` переведён на новый narrative, сохраняя реальные project/contact данные Leader Group без fake testimonials и hard-metric claims.
- Мобильный header упрощён под реальный web-layout, а временный fixed mobile CTA и связанный layout-padding удалены.
- Геометрия mobile hamburger-icon в header переведена на симметричную pixel-grid-анимацию, чтобы линии не выглядели разной толщины в покое и при раскрытии меню.
- Burger trigger в header теперь тоже переключается в светлую гамму на тёмных секциях, синхронно с инверсией логотипа, а в открытом menu-state возвращается в тёмный цвет на светлой подложке.
- Hash-секции получили безопасный scroll-offset под fixed header, а плотные multi-column desktop-layouts сдвинуты на более поздний breakpoint, чтобы medium-width экраны не выглядели пережатыми.
- Footer/contact slab переведён в full-bleed режим: `home-contact` теперь растягивается на всю ширину viewport, сохраняя внутренний контент в сетке страницы.
- Убран остаточный белый зазор под footer: нижние page/layout padding'и обнулены, чтобы тёмный contact slab доходил до края viewport.
- Active-состояние header-навигации теперь синхронизируется с фактическим scroll-положением на home-page, поэтому mobile menu pills автоматически подсвечивают видимую секцию, а не только последний hash.
- Вертикальный отступ между hero eyebrow и главным H1 выровнен с остальными editorial-секциями, чтобы ритм заголовков на странице был симметричнее.

## 2026-04-08

### Added

- Добавлен `AGENTS.md` в корне проекта как постоянный контекст для следующих агентов.
- Добавлен `CHANGELOG.md` как единая история изменений проекта.
- Добавлен индекс ADR в `docs/adr/README.md`.
- Добавлен ADR по текущей frontend-основе и целевой FSD-структуре.
- Добавлен ADR по базовой стратегии тестирования на `Vitest`, `React Testing Library` и `jsdom`.
- Добавлен каталог задач `docs/tasks` с правилами ведения backlog.
- В backlog добавлены задачи:
  - начать вынос контента и предметных моделей из `widgets` в `entities/features`
  - покрыть текущий frontend тестами по мере необходимости

### Changed

- Выполнена первая волна FSD-миграции: предметные данные для `about`, `contact`, `services`, `projects` вынесены из `src/widgets/home/*/model` в `src/entities/company`, `src/entities/service`, `src/entities/project`.
- Контактное меню в home-контактном блоке перестало дублировать локальные данные widget-слоя и теперь берётся из `src/shared/config/navigation`.
- `widgets/home/*` упрощены до слоя UI и композиции, без хранения доменных моделей внутри widget-слоя.
- Добавлена тестовая инфраструктура на `Vitest`, `React Testing Library`, `jsdom` и `@vitest/coverage-v8`.
- В проект добавлены scripts `test`, `test:run`, `test:coverage`.
- Добавлена первая волна тестов для `Modal`, навигационной логики `SiteHeader`, базового роутинга и интерактивного блока проектов.
- Hash-навигация переведена на состояние роутера: `active`/`title` больше не зависят от ручных `hashchange`/`popstate` listeners как источника истины.
- Добавлен общий `HashLink` и единое scroll-поведение для hash-ссылок, включая повторный клик по уже активной секции.
- Из test setup убраны глобальные моки геометрии DOM-элементов; проверка focus/visibility для `Modal` переведена на локальные, адресные моки внутри тестов.
- Coverage workflow приведён в рабочее состояние: `coverage/` исключён из Git/Prettier/ESLint, а coverage-отчёт сузился до исполняемого `ts/tsx` без ассетов, test-файлов и barrel-файлов.
- Проведён `npm audit` remediation: `vite` обновлён до безопасного patch-уровня, транзитивные `brace-expansion`, `flatted`, `picomatch` обновлены через lockfile, итоговый `npm audit` чистый.
- Добрано покрытие для самых рискованных UI-веток: добавлены тесты на responsive-поведение и dark-tone `SiteHeader`, а также на reduced-motion и layout-driven marquee в `HomeHeroSection`.
- `SiteHeader` переведён на трёхступенчатую адаптивную схему: mobile ниже `900px`, compact tablet в диапазоне `900-1279px`, full desktop от `1280px`. Логика закрытия мобильного меню теперь зависит от фактически отрисованного layout, а не от дублируемого JS-breakpoint.
