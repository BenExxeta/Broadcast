import type { Category, Lang, Localized } from './types';

/**
 * Interface texts. Always English: navigation, buttons and headings do not change
 * with the language the visitor chose. Only article content is translated.
 */
const UI = {
  siteName: 'Abroadcast',
  edition: 'Guadalajara Edition',
  todaysEdition: "Today's Edition",
  topStory: 'Top Story',
  allSections: 'All Sections',
  noStories: 'No stories in this section today. Check back after the next refresh.',
  whyItMatters: 'Why this matters to you',
  readOriginal: 'Read the full article',
  source: 'Source',
  published: 'Published',
  relevance: 'Relevance',
  rateTitle: 'Was this summary useful and understandable?',
  rateLabel: 'Rate from 1 to 5',
  reportButton: 'Report inaccurate summary',
  reportDone: 'Thanks, the report was recorded.',
  rateDone: 'Thanks for your rating.',
  sampleBanner: 'Demo mode: sample articles and simulated AI output. No live news.',
  backToEdition: '← Back to the edition',
  statsTitle: 'Usage Statistics',
  visitsToday: 'Visits today',
  visitsTotal: 'Visits (all days)',
  uniqueToday: 'Unique visitors today',
  avgRating: 'Average usefulness rating',
  ratingsCount: 'Ratings received',
  reportsCount: 'Inaccurate-summary reports',
  byDay: 'Daily visits',
  dayHeader: 'Day',
  perArticle: 'Per article',
  noData: 'No data yet.',
  articlesHeader: 'Article',
  ratingsHeader: 'Avg rating',
  reportsHeader: 'Reports',
  lastUpdated: 'Last refresh',
  welcomeText:
    'Abroadcast gives you a short daily overview of local news from Guadalajara. Every story has a summary, a note on why it matters to you as a foreigner, and a link to the original source. Reading takes under five minutes.',
  tryOut: 'Try it out',
  wizCityTitle: 'Where do you live?',
  wizCityHelp: 'Abroadcast currently covers Guadalajara. More cities will follow.',
  wizCityGuadalajara: 'Guadalajara, Jalisco',
  wizLangTitle: 'In which language do you want to read the articles?',
  wizLangHelp: 'Headlines, summaries and notes are translated into this language. The menus stay in English.',
  wizTopicsTitle: 'Which news matter most to you?',
  wizTopicsHelp: 'Pick as many as you like. You can change this later.',
  wizBack: 'Back',
  wizNext: 'Next',
  wizFinish: 'Show my edition',
  myTopics: 'My Topics',
  openArticle: 'Open article',
  moreStories: 'More stories',
  changeSetup: 'Change my settings',
  noTopicsSelected: 'No topics selected yet. Choose at least one in the setup.',
  relevanceHelp: 'How relevant this is for foreigners in Guadalajara, scored 0–10 by the AI.',
  originalHeadline: 'Original headline',
  symbolPhoto: 'Symbol photo',
  save: 'Save',
  saved: 'Saved',
  savedTopics: 'Saved',
  noSaved: 'You have not saved any articles yet.',
  share: 'Share on WhatsApp',
  previewTitle: "Today's headlines",
  subscribeTitle: 'Daily summary by email',
  subscribeText: 'Get the top stories for your topics in your inbox. You can unsubscribe at any time.',
  subscribeConsent: 'I agree that my email address is stored so I can receive this summary.',
  subscribeButton: 'Subscribe',
  subscribeDone: 'Thanks, you are subscribed.',
  subscribeError: 'Please enter a valid email address and confirm the consent.',
  digestUnsubscribe: 'Unsubscribe',
};

export type Dict = typeof UI;

export function t(): Dict {
  return UI;
}

/** Language choices for the wizard and the switcher. Names are in English, like the rest of the interface. */
export const LANGUAGE_OPTIONS: { code: Lang; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish (Mexico)' },
  { code: 'fr', name: 'French' },
  { code: 'sv', name: 'Swedish' },
];

/** Section labels, always in English. */
export const CATEGORY_LABELS: Record<Category, string> = {
  Safety: 'Safety',
  'Transport & Traffic': 'Transport & Traffic',
  Weather: 'Weather',
  'Politics & Administration': 'Politics & Administration',
  'Events & Culture': 'Events & Culture',
  Economy: 'Economy',
};

export function categoryLabel(category: Category): string {
  return CATEGORY_LABELS[category];
}

/** Picks the text in the visitor's language. Falls back to English for articles not yet translated. */
export function tr(text: Partial<Localized>, lang: Lang): string {
  return text[lang] ?? text.en ?? '';
}

export function parseLang(value: string | undefined | null): Lang {
  return LANGUAGE_OPTIONS.some((o) => o.code === value) ? (value as Lang) : 'en';
}
