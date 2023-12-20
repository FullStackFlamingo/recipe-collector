import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,ts}', './index.html'],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
