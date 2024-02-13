/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './renderer/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['corporate', 'business'],
  },
};
