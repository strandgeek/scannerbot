import daisyui from 'daisyui';
import defaultTheme from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.stories.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...defaultTheme["[data-theme=light]"],
          "primary": "#1d4ed8",
        },
      },
    ],
  },
}
