// The composed component map. A separate module because `App.tsx` may export
// only components (the Fast Refresh rule) — and because composing at MODULE
// scope is the point: an addition colliding with a manifest name, an SDK
// default or another addition throws when this module loads, not on the first
// render of whichever ticket happened to use it (R3-1290).
//
// These ten names are what every ticket repository's marker registers today
// (RoadmapBoard, RoadmapMeta, NextAvailable, Dependencies, ProjectIndex,
// ProjectItems, ProjectMembers, ProjectMeta, StatusBadge, TopicIndex). They are
// the SHELL's own vocabulary, not the engine's, so they are added with
// `extendComponents` over the stock map — `composeComponents` is for overriding
// what the Grove manifest declares, and this app overrides nothing.
//
// The result serves both render paths: compiled entries through
// `boot({ mdxComponents })` and `render: safe` entries through the shell
// vocabulary the safe renderers read.
import { GROVE_MDX, extendComponents } from '@immediately-run/grove';
import Dependencies from './components/Dependencies';
import NextAvailable from './components/NextAvailable';
import ProjectIndex from './components/ProjectIndex';
import ProjectItems from './components/ProjectItems';
import ProjectMembers from './components/ProjectMembers';
import ProjectMeta from './components/ProjectMeta';
import RoadmapBoard from './components/RoadmapBoard';
import RoadmapMeta from './components/RoadmapMeta';
import StatusBadge from './components/StatusBadge';
import TopicIndex from './components/TopicIndex';

export const COMPONENTS = extendComponents(GROVE_MDX, {
  RoadmapBoard,
  RoadmapMeta,
  NextAvailable,
  Dependencies,
  ProjectIndex,
  ProjectItems,
  ProjectMembers,
  ProjectMeta,
  StatusBadge,
  TopicIndex,
});
