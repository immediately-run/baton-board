// The entry immediately.run runs (`package.json` → `main`).
//
// Without it the platform falls back to the SDK's default route table, which
// renders `src/App.tsx`'s default export through the file router. The viewer
// then renders — but `boot()` is never called with its OWN component map, so
// `./components` is dead code and a ticket marker's `<RoadmapBoard />` silently
// renders as nothing. Exactly the arrangement Grove's thin shell uses: the
// engine arrives as a pinned dependency and the SHELL decides what its
// vocabulary renders as.
//
// `children` rather than a `routingSpec` because the SDK installs a catch-all
// for children, and Grove's own gate (`GroveApp`) owns dispatch from there.
import { boot } from '@immediately-run/sdk/boot';
import type { MdxComponents } from '@immediately-run/sdk';
import App from './App';
import { COMPONENTS } from './components';

// The cast is needed for two reasons that are not the board's props: `GROVE_MDX`'s own
// stock components carry REQUIRED props (\`KeyValue\`'s `pairs`, \`DocsByTag\`'s `tag`), so the
// composed map cannot be a `Record<string, FC>` as it stands; and `extendComponents`
// returns `T & Record<string, unknown>`, so its type says nothing about the additions.
// The board's ten names are type-checked where they are ADDED — `src/components.ts`
// writes the additions object with `satisfies Record<string, FC>` (round 1, 1-A-0),
// so a component that is not an FC, or a name added without an import, fails `tsc`.
boot({ mdxComponents: COMPONENTS as unknown as MdxComponents, children: <App /> });
