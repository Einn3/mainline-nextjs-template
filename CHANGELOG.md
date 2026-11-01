# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Added `src/mdx-components.tsx` with the required App Router MDX component hook.

## [1.5.0] - 2026-10-31

### Changed
- **Framework and runtime upgrades**: Updated Next.js, @next/mdx, and eslint-config-next to 16.4.3; React and React DOM to 19.3.1; and @types/react, @types/react-dom, and @types/node to 19.3.0, 19.3.0, and 26.6.6 respectively.
- **Node.js support**: Pinned Node.js 26.13.0 LTS in `.nvmrc` and documented the Next.js minimum runtime requirement (Node.js 20.9.0+).
- **Lint command**: Replaced the removed `next lint` command with ESLint CLI while preserving automatic fixes.

## [1.4.0] - 2026-10-31

### Added
- **Reusable SEO & Metadata Configuration Module (`src/lib/seo.ts`)**: Built a reusable metadata helper (`createMetadata`) with dynamic title templating, custom descriptions, canonical URL resolution, OpenGraph and Twitter social sharing cards, and Schema.org JSON-LD structured data (`generateSoftwareSchema`).
- **Per-Page SEO Coverage**: Configured dynamic metadata across all application routes (`/`, `/about`, `/pricing`, `/faq`, `/contact`, `/privacy`, `/login`, `/signup`).
- **Search Engine Directives**: Added automated Googlebot indexing rules and `noIndex` flags for authentication routes.

## [1.3.0] - 2026-10-31

### Added
- **Reading Progress Bar**: Implemented a thin, spring-animated reading progress bar (`src/components/reading-progress-bar.tsx`) fixed to the very top of the viewport that fills up progressively as the user scrolls down through pages.
- **Root Changelog**: Created `/CHANGELOG.md` to track and maintain project release history and updates.

## [1.2.0] - 2026-10-31

### Added
- **Newsletter Subscription Component**: Implemented `src/components/blocks/newsletter-form.tsx` featuring email validation, animated loading and success feedback states, and full dark/light theme integration.
- **Footer Integration**: Integrated the newsletter form into the bottom of the footer above the branding graphics.
- **Newsletter Localization**: Added complete English and Spanish translation strings in `LanguageContext`.

## [1.1.0] - 2026-10-31

### Added
- **Vanish Transition Effect (`VanishWrapper`)**: Added smooth blur dissolution and rebuild animations triggered on language toggle.
- **Vanish Language HUD (`VanishLanguageHUD`)**: Added a floating micro-HUD with animated digit counter (`00%` to `100%`) when switching languages.
- **Animated Digit Counter (`DigitCounter`)**: Created rolling digit counters for stats and pricing cards with easeOut motion.
- **Comprehensive Spanish Translation**: Translated all website components, pages, subpages (Home, About, Pricing, FAQ, Contact, Login, Signup, 404), and UI controls.

## [1.0.1] - 2026-10-31

### Added
- **Scroll to Top Button**: Added floating back-to-top button (`src/components/scroll-to-top.tsx`) appearing when scrolling past 400px with smooth glide behavior.

## [1.0.0] - 2026-10-31

### Added
- **AI Studio Web Migration**: Normalized dependencies and configured Next.js 15 standalone build with dev server bound to port 3000 on `0.0.0.0`.
