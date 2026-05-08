import type { Unit } from '@/types/learning';

export const units: Unit[] = [
  // ─── Spanish ───────────────────────────────────────────────────────────────
  {
    id: 'es-unit-1',
    languageId: 'es',
    title: 'Getting Started',
    description: 'Learn to greet people and introduce yourself in Spanish',
    order: 1,
    icon: '👋',
    lessonIds: ['es-lesson-1', 'es-lesson-2', 'es-lesson-3'],
  },

  // ─── French ────────────────────────────────────────────────────────────────
  {
    id: 'fr-unit-1',
    languageId: 'fr',
    title: 'Getting Started',
    description: 'Learn to greet people and introduce yourself in French',
    order: 1,
    icon: '👋',
    lessonIds: ['fr-lesson-1', 'fr-lesson-2', 'fr-lesson-3'],
  },

  // ─── Japanese ──────────────────────────────────────────────────────────────
  {
    id: 'ja-unit-1',
    languageId: 'ja',
    title: 'Getting Started',
    description: 'Learn essential Japanese greetings and polite expressions',
    order: 1,
    icon: '👋',
    lessonIds: ['ja-lesson-1', 'ja-lesson-2', 'ja-lesson-3'],
  },

  // ─── German ────────────────────────────────────────────────────────────────
  {
    id: 'de-unit-1',
    languageId: 'de',
    title: 'Getting Started',
    description: 'Learn to greet people and introduce yourself in German',
    order: 1,
    icon: '👋',
    lessonIds: ['de-lesson-1', 'de-lesson-2', 'de-lesson-3'],
  },
];
