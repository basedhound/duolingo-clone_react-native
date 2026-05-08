// ─── Language ────────────────────────────────────────────────────────────────

export type LanguageId = 'es' | 'fr' | 'ja' | 'de';

export interface Language {
  id: LanguageId;
  /** Display name in English */
  name: string;
  /** Name in the target language itself */
  nativeName: string;
  /** Emoji flag */
  flag: string;
  /** Short tagline shown on language selection */
  description: string;
  /** Brand accent color for UI cards */
  color: string;
}

// ─── Lesson types ────────────────────────────────────────────────────────────

export type LessonType =
  | 'vocabulary'    // learn new words
  | 'grammar'       // grammar rules with exercises
  | 'conversation'  // phrases and dialogue
  | 'ai_teacher';   // live audio session with Vision Agent

// ─── Vocabulary ──────────────────────────────────────────────────────────────

export interface VocabularyItem {
  /** Word or short phrase in the target language */
  word: string;
  /** English translation */
  translation: string;
  /** Phonetic pronunciation guide (IPA or simplified) */
  pronunciation: string;
  /** Example sentence in the target language */
  example: string;
  /** English translation of the example */
  exampleTranslation: string;
}

// ─── Phrases ─────────────────────────────────────────────────────────────────

export interface Phrase {
  /** Full phrase in the target language */
  phrase: string;
  /** English translation */
  translation: string;
  /** Phonetic pronunciation guide */
  pronunciation: string;
  /** When or how to use this phrase */
  context: string;
}

// ─── Activities ──────────────────────────────────────────────────────────────

export interface VocabularyActivity {
  type: 'vocabulary';
  instruction: string;
  items: VocabularyItem[];
}

export interface PhraseMatchActivity {
  type: 'phrase_match';
  instruction: string;
  phrases: Phrase[];
}

export interface TranslationActivity {
  type: 'translation';
  instruction: string;
  /** Prompt shown to the user in English */
  prompt: string;
  /** Correct answer in the target language */
  targetPhrase: string;
  /** Alternative accepted spellings / contractions */
  acceptedAnswers: string[];
  hint?: string;
}

export type Activity =
  | VocabularyActivity
  | PhraseMatchActivity
  | TranslationActivity;

// ─── AI Teacher (Vision Agent) ───────────────────────────────────────────────

export interface AITeacherConfig {
  /** Base system prompt defining the teacher persona */
  systemPrompt: string;
  /** What this specific lesson session should cover */
  lessonContext: string;
  /** Ordered list of topics the teacher should walk through */
  topicsToCover: string[];
  /** Sample exchanges to give the model conversation style */
  exampleExchanges: Array<{
    teacher: string;
    student: string;
  }>;
}

// ─── Lesson ──────────────────────────────────────────────────────────────────

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  type: LessonType;
  /** XP awarded on completion */
  xpReward: number;
  /** Estimated time in minutes */
  durationMinutes: number;
  /** Short bullet-point goals shown before the lesson starts */
  goals: string[];
  /** Ordered exercises inside the lesson */
  activities: Activity[];
  /** Present only on ai_teacher lessons */
  aiTeacher?: AITeacherConfig;
}

// ─── Unit ────────────────────────────────────────────────────────────────────

export interface Unit {
  id: string;
  languageId: LanguageId;
  title: string;
  description: string;
  /** Sort order within the language course */
  order: number;
  /** Emoji used as unit icon in the UI */
  icon: string;
  /** Ordered lesson IDs belonging to this unit */
  lessonIds: string[];
}
