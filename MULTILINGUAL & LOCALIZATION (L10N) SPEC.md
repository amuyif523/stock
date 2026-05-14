MULTILINGUAL & LOCALIZATION (L10N) SPEC

Version: 1.0 (Ethiopic Script & Calendar Engine)

1. THE OBJECTIVE

To ensure the Addis Profit Finder is accessible to all levels of business staff, regardless of English proficiency, while maintaining standardized data for institutional reporting. This is a "Language-First" approach to data quality.

2. ETHIOPIC SCRIPT SUPPORT (UI/UX)

Since the platform is a React PWA, we must ensure high-readability of the Ethiopic script on small mobile screens.

Primary Font: Noto Sans Ethiopic (Variable weight).

Fallback Font: Abyssinica SIL or Nyala.

Rendering Rule: All buttons and critical status messages must be at least 16px when using Ethiopic script to prevent "legibility fatigue."

3. THE "DUAL-CALENDAR" ENGINE

Ethiopian SMEs operate on the Ethiopian Calendar ($E.C.$) for daily sales, but the Ministry of Revenue and international systems use the Gregorian Calendar ($G.C.$).

The Conversion Logic:
The system stores all timestamps in the database in UTC (ISO-8601). The UI performs the conversion based on the user's preference.

$$Date_{display} = \begin{cases} GC_{format}, & \text{if Owner View} \\ EC_{format}, & \text{if Clerk View} \end{cases}$$

Requirement: The system must handle the 13th Month (Pagume) correctly in the Audit model to prevent logic breaks during year-end transitions.

4. LANGUAGE TIERS & MAPPING

We use a key-value dictionary for UI strings.

Key

English

Amharic (አማርኛ)

Afaan Oromoo

btn_add_stock

Add Stock

ምርት ጨምር

Meeshaa Dabali

btn_complete_sale

Complete Sale

ሽያጭ ጨርስ

Gurgurtaa Fixi

status_leakage

Leakage Found

ጉድለት ተገኝቷል

Hanqinni Argameera

label_expected

Expected

የሚጠበቅ

Kan Eegamu

label_physical

Physical

በአካል ያለ

Qaamaan Kan Jiru

5. LOCALIZED NUMBER & CURRENCY FORMATTING

Currency Symbol: ETB (English) / ብር (Amharic).

Thousands Separator: Use commas for ETB values ($1,000.00$) to align with banking standards.

Numeric Input: Support for Ethiopic numerals ($\u1369$ - $\u1371$) in OCR, but always normalize to Western Arabic numerals ($0-9$) for database storage.

6. TECHNICAL IMPLEMENTATION (REACT i18next)

// i18n configuration for Addis Profit Finder
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { "RECOVERY_TOTAL": "Total Recovered: {{amount}} ETB" } },
    am: { translation: { "RECOVERY_TOTAL": "አጠቃላይ የተገኘ፡ {{amount}} ብር" } },
    om: { translation: { "RECOVERY_TOTAL": "Ida'ama Argame: {{amount}} ETB" } }
  },
  lng: "am", // Default to Amharic for Clerks
  fallbackLng: "en",
});

export default i18n;


7. SLANG-TO-STANDARD MAPPING (THE "CULTURAL FUZZY")

The L10n spec works in tandem with the OCR & Fuzzy Match Logic.

Scenario: A Clerk enters "Aticero" (Local slang).

L10n Logic: The system looks up "Aticero" in the ProductAlias table.

Result: It confirms the match to "Rebar 12mm" and displays: "Rebar 12mm (አቲቼሮ) ተመርጧል" to build confidence.

Speaking the Language of the Merchant. Thinking in the Language of the Data.