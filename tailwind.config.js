/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./instagram-auth.html",
    "./instagram-feed.js",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beauty-rose': '#8b6f7a',
        'beauty-dark': '#3d2e36',
        'beauty-light': '#f5e6e8',
      },
      fontFamily: {
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'sans': ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
