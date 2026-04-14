# Leader Group

<div align="center">
  <p><strong>Editorial bilingual website for a vertical mobility brand.</strong></p>
  <p>
    A presentation-first frontend for Leader Group with a clean architectural rhythm,
    glass-style navigation, curated project storytelling, and a strong contact-driven finish.
  </p>
  <p>
    <a href="https://github.com/3hunnaDev/leader-group">Repository</a>
    ·
    <a href="https://3hunnadev.github.io/leader-group/">GitHub Pages URL</a>
    ·
    <a href="./docs/styles-docs/specification.md">Specification</a>
    ·
    <a href="./CHANGELOG.md">Changelog</a>
  </p>
</div>

---

## Overview

This repository contains the public-facing Leader Group website reworked as a modern editorial landing page.
Instead of a generic corporate layout, the project positions the brand through composition, pacing, and typography:
large directional headlines, rounded content slabs, light surfaces, dark contact contrast, and a narrative that moves
from solutions to proof, approach, selected projects, and contact.

The site is built as a real product frontend, not as a static mockup. It is designed to present Leader Group as a
confident B2B partner for lifts, escalators, and travelators across residential, commercial, and public-space projects.

## What The Experience Delivers

- A full editorial homepage built as one continuous product story
- A shared desktop and mobile visual system rather than two disconnected layouts
- English and Russian versions of the same experience
- Smooth section navigation with state-aware scroll behavior
- Selected project cases presented as a portfolio narrative
- A dark full-width contact slab that closes the page with a strong CTA

## Design Direction

- Minimal and architectural, with strong typography doing most of the work
- Bright surfaces, soft grayscale contrast, and restrained dark accents
- Rounded cards, rounded media blocks, and a light glass-like header language
- Clear spacing rhythm instead of dense marketing clutter
- Motion used to smooth the experience, not to decorate it

## Page Structure

### Hero

An opening statement about vertical mobility for modern architecture, paired with a supporting editorial description and
wide media placeholders that frame the page like a campaign landing.

### Solutions

Four service cards covering business lifts, residential lifts, panoramic lifts, and escalators or travelators, presented
as a clean product overview instead of a catalog dump.

### Why Us

A proof-oriented section focused on reliability, installation discipline, architectural integration, and post-warranty
support rather than inflated claims or synthetic metrics.

### Approach

An editorial trust block describing how Leader Group works with clients: experience, quality standards, adaptation to
project context, and long-term partnership.

### Projects

A curated installation section based on real Leader Group cases, shaped as a presentation portfolio with featured
storytelling and supporting project cards.

### Contact

A strong dark footer slab with the project CTA, menu, contact channels, and the closing brand statement.

## Project Value

This repository is useful as:

- the production frontend for the Leader Group marketing presence
- a reference implementation of the approved editorial redesign
- a source of reusable structure for future company pages and landing screens
- a base for further content, media, and conversion optimization work

## Key Links

- Pages URL: [https://3hunnadev.github.io/leader-group/](https://3hunnadev.github.io/leader-group/)
- Architecture: [docs/architecture.md](./docs/architecture.md)
- Visual rules: [docs/styles-docs/ui-template-style-guide.md](./docs/styles-docs/ui-template-style-guide.md)
- Content bank: [docs/styles-docs/leadergroup-site-copy.md](./docs/styles-docs/leadergroup-site-copy.md)
- Product specification: [docs/styles-docs/specification.md](./docs/styles-docs/specification.md)
- ADR index: [docs/adr/README.md](./docs/adr/README.md)

## Usage Rights

This repository is provided for viewing only.

- License status: `UNLICENSED`
- Legal notice: see [LICENSE](./LICENSE)
- Reuse, copying, modification, redistribution, deployment, or derivative use is not permitted without prior written permission
- Third-party packages remain governed by their own licenses

<details>
  <summary>Development Notes</summary>

### Local Run

```bash
npm install
npm run dev
```

### Quality Checks

```bash
npm run test:run
npm run build
npm run lint
npm run lint:styles
npm run format:check
```

### Core Stack

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Vitest

</details>
