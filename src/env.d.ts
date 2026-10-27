// The immediately.run app's ambient types, and nothing else.
//
// `@immediately-run/sdk` ships the whole surface an app's code may assume the
// sandbox provides — the async `fs` module Grove's engine imports, `module` as
// the evaluation context — behind one triple-slash reference, and it is
// types-only (no runtime import, so it pulls nothing into the bundle). This is
// the line every app repo carries; Grove carries the same one in its
// `devfs.d.ts`. Without it the engine's `import fs from 'fs'` cannot be
// type-checked in a shell that consumes Grove as source.
//
// This file is also where the shell declares what TypeScript cannot know about
// its own imports: side-effect stylesheet imports (`@immediately-run/grove/styles.css`,
// `./components/roadmap.css`) have no types, and `tsc --noEmit` reports TS2882
// for each one without a declaration. `types: []` in tsconfig keeps Node's
// types out, so nothing in `src` imports a Node built-in; the test file imports
// only vitest, Grove and its own module graph.
/// <reference types="@immediately-run/sdk/ambient" />

declare module '*.css' {}
