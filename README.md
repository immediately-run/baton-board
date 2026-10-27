# Baton Board — the ticket-wiki viewer

Every ticket repository (docs, baton, fieldhouse, hq) used to carry its own copy of the
same ten board components, so a ticket wiki was never a plain wiki. This repository is the
one viewer they all render through: an ordinary immediately.run app on the Grove thin-shell
pattern that owns the components and registers them with `extendComponents`.

A ticket repository stays a plain `render: safe` wiki whose marker names this app:

```json
"opensWith": { "app": "github:immediately-run/baton-board", "version": "^1" }
```

The corpus then contributes **data only** — frontmatter, records, markdown — and the
components render in this app's frame with this app's authority. That keeps the platform's
rule that a repository cannot choose the code that renders it, and it is why the board can
render `render: safe` content at all.

## What is here

- `src/main.tsx` — `boot({ mdxComponents: COMPONENTS, children: <App /> })`, the shell's
  map handed to the compiler and to the safe renderer. Without this line a marker's
  `<RoadmapBoard />` renders as nothing (R3-280, Drill 3).
- `src/App.tsx` — default-exports `<GroveApp />` and nothing else (the Fast Refresh rule).
- `src/components.ts` — `COMPONENTS = extendComponents(GROVE_MDX, { … })` over the **ten**
  names every ticket marker registers: `RoadmapBoard`, `RoadmapMeta`, `NextAvailable`,
  `Dependencies`, `ProjectIndex`, `ProjectItems`, `ProjectMembers`, `ProjectMeta`,
  `StatusBadge`, `TopicIndex`. These are additions, not overrides — nothing in the Grove
  manifest is composed over.
- `src/components/` — those components, their layout pieces (`ItemCard`, `QueueChips`,
  `InlineProse`) and their helpers (`roadmapData.ts`, `roadmapLib.ts`, `useProjectId.ts`,
  `useRoadmapRows.ts`, `roadmap.css`).
- `src/components.test.ts` — the contract: the ten names, that the map adds exactly ten,
  that every name in Baton's pre-switch marker fixture is covered, and that `Callout`
  still resolves to Grove's stock component.

## Where the components came from

They were Baton's, at commit
[`d0c5cf7`](https://github.com/immediately-run/baton/tree/d0c5cf79c646ae0ade053033a2edd2beb4cb9fb6/tickets/components)
`d0c5cf79c646ae0ade053033a2edd2beb4cb9fb6`, from `tickets/components/` — the most complete
of the copies. Git history does not cross repositories, so the move is a fresh first commit
here and Baton's copy goes away in the same change that points its marker at this app
(B-114).

Two things changed in the move and nothing else did:

- `InlineProse.tsx`'s header comment, which said the file was a corpus copy that could not
  path into the viewer's filesystem. It is app code now; the comment says so.
- `@immediately-run/mdx-plugins` became a direct dependency of this package. `InlineProse`
  imports `parseInlineProse` from it, and it used to arrive through Baton's toolchain
  rather than through a declared dependency; declared at Grove's own pin (`0.7.1`) so the
  parser is the one the engine parses with.

## Dependencies

```json
"@immediately-run/grove": "github:immediately-run/grove#a11354341d02a659c86d276c82e5408c11744df2",
"@immediately-run/sdk": "^0.80.0",
"react": "^19.2.5",
"react-dom": "^19.2.5"
```

Grove is pinned **by commit**, never a branch: `LIBRARY_MOUNTS_SPEC §6/§7` makes a
commit-pinned ref immutable and cache-first, so this app is reproducible and fast. The pin
is the commit that carries `extendComponents` (Grove R3-1290, package version 0.2.9).

The SDK line is not decoration. Grove declares the SDK and React in both `dependencies` and
`peerDependencies`; a shell whose range does not satisfy the engine's peer gets **no**
`ERESOLVE` — npm quietly satisfies the engine privately, and the shell ends up with two SDK
copies whose `TinkerableContext` objects are not the same object. Check it::

```
npm ls @immediately-run/sdk     # exactly one, deduped under @immediately-run/grove
```

## Type-checking the engine

Grove ships TSX **source**, not declarations, so `tsc --noEmit` type-checks the engine the
way its own build does: `moduleResolution: bundler`, `skipLibCheck: true` (Grove's own
setting, and only declaration-internal details are skipped), and `src/env.d.ts` carries the
one line that makes an app's ambient `fs` real —
`/// <reference types="@immediately-run/sdk/ambient" />`, Grove's `devfs.d.ts` by another
name. Every `.ts`/`.tsx` under `src` is checked against Grove's real exported types and the
SDK's, so a component whose surface changed fails here rather than at render time.

## Checks

```
npm install
npm ls @immediately-run/sdk   # one copy
npm run typecheck
npm test
```

## License

Copyright 2026 Peter Neumark. Baton Board is licensed under the
[Apache License, Version 2.0](LICENSE); see [NOTICE](NOTICE). Its components came from Baton
and Grove, both Apache-2.0 by the same copyright holder.
