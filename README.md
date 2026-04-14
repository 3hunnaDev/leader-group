# Leader Group

Editorial marketing site for Leader Group, built with `React 19`, `TypeScript`, `Vite`, and `React Router`.

## Live

- GitHub Pages: [3hunnadev.github.io/leader-group](https://3hunnadev.github.io/leader-group/)

## Overview

The project is a polished single-page website for Leader Group with:

- editorial homepage composition for desktop and mobile
- bilingual UI with `English / Russian` switching
- hash-based section navigation with smooth scroll and restore state
- production-ready frontend architecture following an FSD-style layering

## Stack

- `React 19`
- `TypeScript`
- `Vite`
- `React Router 7`
- `Redux Toolkit`
- `Vitest` + `React Testing Library`
- `ESLint` + `Stylelint` + `Prettier`

## Local Development

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start local Vite dev server
- `npm run build` — create production build
- `npm run preview` — preview the production build locally
- `npm run test:run` — run the test suite once
- `npm run lint` — run ESLint
- `npm run lint:styles` — run Stylelint for CSS
- `npm run format:check` — verify Prettier formatting

## Project Structure

- `src/app` — app bootstrap, providers, router, layouts
- `src/pages` — page-level composition
- `src/widgets` — large UI blocks
- `src/features` — feature layer growth point
- `src/entities` — domain data and models
- `src/shared` — reusable infrastructure and UI primitives

Architecture details: [docs/architecture.md](./docs/architecture.md)

## Design and Content Docs

- [docs/styles-docs/ui-template-style-guide.md](./docs/styles-docs/ui-template-style-guide.md)
- [docs/styles-docs/specification.md](./docs/styles-docs/specification.md)
- [docs/styles-docs/leadergroup-site-copy.md](./docs/styles-docs/leadergroup-site-copy.md)

## Deployment

GitHub Pages deployment is handled through GitHub Actions on pushes to `main`.

The production build is published under the repository path `/leader-group/`, so the router and asset base are configured specifically for project pages.
