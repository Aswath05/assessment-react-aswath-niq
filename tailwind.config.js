/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexGrow: {
        2: '2'
      },
      fontSize: {
        13: '13px'
      }
    },
  },
  plugins: [require("tailwindcss"),  require("autoprefixer")],
}

