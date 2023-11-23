/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './renderer/ui/**/*.{js,ts,jsx,tsx}',
    './renderer/app/**/*.{js,ts,jsx,tsx}',
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/modules/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['business'],
  },
};
