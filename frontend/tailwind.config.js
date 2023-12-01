/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'background1': "url('/public/image/bg.jpg')",
        // Add as many custom background images as you want
      },
      colors: {
        'header': '#243c5a',
        'purp': '#d77df8'
      },
    },
  },
  plugins: [],
}

