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

// The cast is the one place this package loosens the SDK's types, and only in
// the direction React already accepts: `MdxComponents` is `Record<string, FC>`,
// so a component whose props are ALL optional — which every component here is,
// bar `InlineProse`'s required `text`, and that one is not in the map — fails
// `FC`'s `PropsWithChildren<P>` check under `strictFunctionTypes`. MDX renders
// a component either as `<Name />`, with no props at all, or with exactly the
// attributes the ticket wrote; both are compatible with these signatures at
// runtime. The ten names themselves are still type-checked against Grove and the
// SDK by `src/components.ts` — this cast does not hide whether a component
// exists or what it renders, only the contravariance of its optional props.
boot({ mdxComponents: COMPONENTS as unknown as MdxComponents, children: <App /> });
