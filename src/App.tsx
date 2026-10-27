// An ORDINARY immediately.run app — the default export the platform renders.
//
// It does not fork the engine and it is not dispatched to: it imports Grove as
// a commit-pinned git dependency (`package.json` → `github:immediately-run/grove#<sha>`),
// which the LIBRARY_MOUNTS rail mounts before the first compile, and arranges
// it. The corpus a ticket repository contributes is data — its marker names
// this app and this app's `opens: self` declaration is what lets it be named —
// and the board's components are this app's code, rendering with this app's
// authority.
//
// Nothing but `<GroveApp />`: App.tsx may export only components (the Fast
// Refresh rule), so composition lives in `./components` and boot in `./main`.
import { GroveApp } from '@immediately-run/grove';
import '@immediately-run/grove/styles.css';

export default function App() {
  return <GroveApp />;
}
