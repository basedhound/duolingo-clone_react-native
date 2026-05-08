import type { Language } from '@/types/learning';

export const languages: Language[] = [
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    description: 'The world\'s second most-spoken native language',
    color: '#E63946',
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    description: 'The language of love, art, and diplomacy',
    color: '#0066CC',
  },
  {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    description: 'A rich language of culture, anime, and tech',
    color: '#BC002D',
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    description: 'Precise, logical, and spoken across central Europe',
    color: '#2D6A4F',
  },
];
