# Instalation Process of Daisy UI on Next.js

## 1. Install tailwind and daisy ui in Next.js

```bash
yarn add tailwindcss@latest postcss@latest autoprefixer@latest daisyui
```

## 2. Create tailwind.config.js

```bash
npx tailwindcss init -p
```

## 3. Add to global.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4. Be sure that _app.js includes global.css

```js
import '../styles/global.css'
```

## 5. Configure tailwind.config.js with daisyui plugin

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
```


