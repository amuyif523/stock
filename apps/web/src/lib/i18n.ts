import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en.json';
import amTranslation from '../locales/am.json';
import omTranslation from '../locales/om.json';

// Per L10N spec: Default to Amharic for Clerks
const storedLang = typeof window !== 'undefined' 
  ? localStorage.getItem('preferred_language') 
  : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { 
      translation: enTranslation,
    },
    am: { 
      translation: amTranslation,
    },
    om: { 
      translation: omTranslation,
    },
  },
  lng: storedLang || 'am', // Default to Amharic per L10N spec
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false,
  },
});

// Helper function to change language
export const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('preferred_language', lang);
};

// Ethiopian Calendar conversion utilities
export const ethiopianMonths = [
  'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
  'Megabit', 'Miyazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'
];

export const ethiopianMonthsAmharic = [
  'መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
  'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'
];

/**
 * Convert Gregorian date to Ethiopian Calendar
 * Note: This is a simplified conversion. For production, use a dedicated library.
 */
export const toEthiopianDate = (date: Date): { year: number; month: number; day: number; monthName: string } => {
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  // Ethiopian New Year is on September 11 (or 12 in leap year)
  let ethiopianYear = gregorianYear - 8;
  let ethiopianMonth = gregorianMonth - 8;
  let ethiopianDay = gregorianDay;

  if (gregorianMonth >= 9) {
    ethiopianYear = gregorianYear - 7;
    ethiopianMonth = gregorianMonth - 8;
    if (ethiopianMonth <= 0) {
      ethiopianMonth += 12;
    }
  }

  // Adjust for Ethiopian months (13 months, last one has 5 or 6 days)
  if (ethiopianMonth > 12) {
    ethiopianMonth -= 12;
  }

  return {
    year: ethiopianYear,
    month: ethiopianMonth,
    day: ethiopianDay,
    monthName: ethiopianMonthsAmharic[ethiopianMonth - 1] || ethiopianMonths[ethiopianMonth - 1],
  };
};

/**
 * Format date for display based on user preference
 */
export const formatDateDisplay = (date: Date | string, useEthiopian: boolean = true): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (useEthiopian) {
    const ec = toEthiopianDate(d);
    return `${ec.day} ${ec.monthName} ${ec.year}`;
  }
  
  return d.toLocaleDateString('en-ET', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default i18n;
