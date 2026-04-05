/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
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
