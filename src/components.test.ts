// The viewer's contract with every ticket repository: the ten names their
// markers register must render here, and the stock Grove vocabulary must still
// be beneath them.
//
// The fixture is immediately-run/baton's REAL `tickets/immediately.run.json`
// `components` keys from before the switch (commit d0c5cf7), saved verbatim —
// the list the viewer must cover, per B-114. It is deliberately not derived
// from `COMPONENTS`: a fixture computed from the thing under test agrees with
// it by construction and could never fail.
//
// Grove ships TSX source with no declarations of its own, so it is imported by
// name like any other module and vitest's defaults compile it. The identity
// asserted below is then literally the map the engine spreads.
import { describe, expect, it } from 'vitest';
import { GROVE_MDX } from '@immediately-run/grove';
import { COMPONENTS } from './components';
import markerComponents from './__fixtures__/ticket-marker-components.json';

const TEN = [
  'RoadmapBoard',
  'RoadmapMeta',
  'NextAvailable',
  'Dependencies',
  'ProjectIndex',
  'ProjectItems',
  'ProjectMembers',
  'ProjectMeta',
  'StatusBadge',
  'TopicIndex',
];

describe('COMPONENTS — the board vocabulary the ticket markers name', () => {
  it('carries all ten board names', () => {
    for (const name of TEN) expect(COMPONENTS).toHaveProperty([name]);
  });

  it('adds exactly the ten names and nothing else', () => {
    const added = Object.keys(COMPONENTS).filter(
      (name) => !Object.prototype.hasOwnProperty.call(GROVE_MDX, name),
    );
    expect(added.sort()).toEqual([...TEN].sort());
  });

  it('covers every name in the pre-switch Baton marker fixture', () => {
    expect(markerComponents.length).toBeGreaterThan(0);
    for (const name of markerComponents) {
      expect(COMPONENTS).toHaveProperty([name]);
    }
  });

  it("still resolves Callout to Grove's stock component", () => {
    // `extendComponents` spreads its base, so a stock component survives as the
    // same function reference — not a wrapper, not a copy. A shell that meant
    // to override Callout must do it through `composeComponents`, and this test
    // is how a silent override here would be caught.
    expect(COMPONENTS.Callout).toBe(GROVE_MDX.Callout);
    expect(typeof COMPONENTS.Callout).toBe('function');
  });
});
