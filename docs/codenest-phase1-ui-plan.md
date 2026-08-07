# CodeNest Phase 1 UI Plan

## Goals

- Ship a polished UI-only learning app for beginner programming fundamentals.
- Keep the current Expo Router shell stable while replacing the placeholder home screen.
- Establish reusable layout, card, and content primitives that can support later module expansion.
- Ensure all visible routes have explicit, human-readable titles.

## Scope

- In scope:
  - Home screen with featured hero, progress summary, learning path list, and visual module cards.
  - Module detail screen with readable long-form content, code example, concept callouts, and next-step actions.
  - Obvious route linking from the module list to module detail screens.
  - Theme refresh for CodeNest branding in light and dark mode.
  - Static/mock module data strictly for presentation.
- Out of scope:
  - Persistence, completion tracking, auth, backend wiring, APIs, React Query, Zustand product state.
  - Real form logic, assessments, code execution, analytics, notifications.

## User + IA Assumptions

- Primary user: Spanish-speaking beginner who wants short, approachable mobile lessons on programming basics.
- Primary task: browse modules, open a lesson, read concept explanations, preview examples, move to the next lesson.
- Information architecture for Phase 1:
  - Root stack
  - `index` redirects to a dedicated learning screen
  - `app/(learning)/index.tsx` for module discovery
  - `app/(learning)/module/[slug].tsx` for module detail
  - `(learning)/_layout.tsx` for human-friendly headers

## UX Direction

- Product tone: welcoming, focused, confidence-building, not childish.
- Visual direction:
  - Deep ink / electric cyan / warm amber accents instead of default purple.
  - High-contrast hero area, soft card surfaces, and subtle section separation.
  - Inter font remains acceptable since already configured; improve type scale and spacing rather than swapping font packages.
- Layout principles:
  - Strong top summary section before the list.
  - Cards should communicate difficulty, estimated time, and module status at a glance.
  - Detail screen optimized for reading with compact code blocks and digestible sections.

## Data Shape for Mock UI

- Create a local module data source with:
  - `slug`
  - `title`
  - `subtitle`
  - `description`
  - `duration`
  - `level`
  - `accent`
  - `icon`
  - `keyPoints`
  - `exampleCode`
  - `exampleLabel`
  - `takeaways`
  - `nextSlug`
- Use 4 to 6 starter modules to make the list feel real without overbuilding.

## Components to Add

- `components/layout/screen.tsx`
  - Shared SafeArea + optional scroll wrapper + consistent horizontal padding and background.
- `components/codenest/home-hero.tsx`
  - Welcome header, progress summary, and supporting microcopy.
- `components/codenest/module-card.tsx`
  - Tappable module card with icon, metadata, and CTA affordance.
- `components/codenest/code-block.tsx`
  - Readable mock code snippet container with monospaced visual treatment.
- `components/codenest/section-card.tsx`
  - Reusable content grouping block for detail screen sections.

## Routing + Header Plan

- Keep `app/index.tsx` as redirect-only.
- Add `(learning)` route group and stack layout.
- Header titles:
  - Learning home: `CodeNest`
  - Module detail: `Detalle del módulo`
  - Not found: `Not Found`
- Remove route-name leakage from headers.

## Theming Plan

- Update theme tokens in `theming/themes/light.ts` and `theming/themes/dark.ts`.
- Adjust:
  - `background`, `card`, `primary`, `secondary`, `accent`, `muted`, `border`, `ring`
  - typography scale for `h1`, `h2`, `h3`, `body`, `caption`, `button`
- Maintain readable contrast in both modes.

## Implementation Sequence

1. Add a local mock data module and minimal route-group layout so navigation compiles immediately.
2. Convert root `index` screen into a redirect to the learning route.
3. Add shared layout primitives and basic reusable cards/code block components.
4. Build learning home screen against mock data.
5. Build dynamic module detail screen with safe fallback for unknown slugs.
6. Refine theme tokens and header styling for the new product identity.
7. Run lint, typecheck, and preview status checks; fix regressions.

## QA Checklist

- App launches with no missing-import or missing-route errors.
- `index` redirects into the learning home screen.
- Tapping any module card opens the correct detail screen.
- Detail screen renders safely for valid and invalid slugs.
- Light and dark themes remain readable.
- TypeScript and ESLint pass.

## Follow-ups for Phase 2

- Persist completion state and progress summaries.
- Add quizzes, checkpoints, and lesson completion flows.
- Wire modules from a CMS / backend or typed local repository.
- Add search, filters, bookmarks, and personalized recommendations.
