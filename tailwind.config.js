/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: 'class', // enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
