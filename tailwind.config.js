/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'button': {
          'back': '#ffedd5',  // orange-100
          'next': '#ffedd5',  // orange-100
        },
      },
    },
  },
  plugins: [],
}

