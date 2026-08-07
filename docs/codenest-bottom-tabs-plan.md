# CodeNest Bottom Tabs Plan

## Goal

- Replace the temporary single-route home flow with a persistent 5-tab bottom navigation shell.

## Required Tabs

- Home
- Practice
- Resources
- Leaderboard
- Profile

## Navigation Structure

- Root `app/index.tsx` redirects to `/(tabs)`.
- Add `app/(tabs)/_layout.tsx` using Expo Router `Tabs`.
- Add one screen file per tab:
  - `app/(tabs)/index.tsx`
  - `app/(tabs)/practice.tsx`
  - `app/(tabs)/resources.tsx`
  - `app/(tabs)/leaderboard.tsx`
  - `app/(tabs)/profile.tsx`
- Move module detail to a root stack route at `app/module/[slug].tsx` so it remains reachable from Home without turning it into a tab.

## UX + Behavior

- Home is the default tab.
- Bottom bar remains visible across all primary screens in the tab group.
- Active tab uses the primary color; inactive tabs use muted foreground.
- Tab switches should not full-reload the app.
- Avoid resetting tab state by using the tab navigator as the primary shell and not enabling unmount-on-blur patterns.

## UI Direction

- Keep the existing CodeNest visual language.
- Use meaningful Lucide icons:
  - Home: house
  - Practice: code
  - Resources: book
  - Leaderboard: trophy
  - Profile: user
- Keep tab bar compact and polished.

## Implementation Steps

1. Add the tabs layout and configure labels, icons, colors, and headers.
2. Move the existing home learning screen into the Home tab.
3. Create four additional main screens with polished placeholder UI and independent local state.
4. Move module detail into a non-tab stack route and update Home links.
5. Update root layout to register the tabs group and module detail route.
6. Remove the previous `(learning)` route group to avoid duplicate navigation paths.
7. Run lint, typecheck, and preview verification.

## QA

- App opens on Home tab.
- Each tab renders a different screen.
- Active tab styling changes correctly.
- Switching tabs does not remount the app shell.
- Home can still navigate to module detail.
- Lint and typecheck pass.
