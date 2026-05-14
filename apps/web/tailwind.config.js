/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Ethiopic script fonts per L10N spec
        sans: ['Noto Sans Ethiopic', 'Abyssinica SIL', 'Nyala', 'sans-serif'],
        ethiopic: ['Noto Sans Ethiopic', 'Abyssinica SIL', 'serif'],
      },
      fontSize: {
        // Minimum 16px for Ethiopic legibility
        base: ['16px', '1.5'],
        sm: ['14px', '1.4'],
        lg: ['18px', '1.6'],
        xl: ['20px', '1.6'],
      },
      colors: {
        // Ethiopian flag inspired palette (optional branding)
        ethiopia: {
          green: '#009A44',
          yellow: '#FEDD00',
          red: '#E31B23',
        },
        // Modern UI palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
