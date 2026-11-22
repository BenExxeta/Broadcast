import type { Category } from './types';

/** Section pictures, one per category. Shown small beside each headline. */
export const CATEGORY_IMAGES: Record<Category, { src: string; alt: string }> = {
  Safety: { src: '/images/categories/safety.png', alt: 'Illustration of a padlock made of light points' },
  'Transport & Traffic': { src: '/images/categories/transport.png', alt: 'Traffic jam on a multi-lane elevated road' },
  Weather: { src: '/images/categories/weather.png', alt: 'Weather symbols: sun, clouds and rain' },
  'Politics & Administration': { src: '/images/categories/politics.png', alt: 'Empty rows of seats in a parliament chamber' },
  'Events & Culture': { src: '/images/categories/events.png', alt: 'Notepad with the word EVENTS' },
  Economy: { src: '/images/categories/economy.png', alt: 'Bar chart with a red arrow pointing down' },
};

/** Newspaper illustration used at the top of the setup wizard. */
export const NEWSPAPER_IMAGE = {
  src: '/images/categories/newspaper.png',
  alt: 'Illustration of a folded newspaper',
};
