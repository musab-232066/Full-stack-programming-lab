/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F07800',
          dark: '#333333',
          light: '#F5F5F5',
        },
      },
    },
  },
  plugins: [],
};

export default config;