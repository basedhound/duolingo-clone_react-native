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
    lessonIds: [
      'es-lesson-1',
      'es-lesson-2',
      'es-lesson-3',
      'es-lesson-4',
      'es-lesson-5',
      'es-lesson-6',
    ],
  },

  // ─── French ────────────────────────────────────────────────────────────────
  {
    id: 'fr-unit-1',
    languageId: 'fr',
    title: 'Getting Started',
    description: 'Learn to greet people and introduce yourself in French',
    order: 1,
    icon: '👋',
    lessonIds: [
      'fr-lesson-1',
      'fr-lesson-2',
      'fr-lesson-3',
      'fr-lesson-4',
      'fr-lesson-5',
      'fr-lesson-6',
    ],
  },

  // ─── Japanese ──────────────────────────────────────────────────────────────
  {
    id: 'ja-unit-1',
    languageId: 'ja',
    title: 'Getting Started',
    description: 'Learn essential Japanese greetings and polite expressions',
    order: 1,
    icon: '👋',
    lessonIds: [
      'ja-lesson-1',
      'ja-lesson-2',
      'ja-lesson-3',
      'ja-lesson-4',
      'ja-lesson-5',
      'ja-lesson-6',
    ],
  },

  // ─── German ────────────────────────────────────────────────────────────────
  {
    id: 'de-unit-1',
    languageId: 'de',
    title: 'Getting Started',
    description: 'Learn to greet people and introduce yourself in German',
    order: 1,
    icon: '👋',
    lessonIds: [
      'de-lesson-1',
      'de-lesson-2',
      'de-lesson-3',
      'de-lesson-4',
      'de-lesson-5',
      'de-lesson-6',
    ],
  },
];
