/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#004B87',
        'brand-secondary': '#F47B20',
        'brand-green': '#209869',
        'brand-dark-blue': '#260085',
        'brand-dark-purple': '#8666EF',
      }
    }
  },
  plugins: [],
}