/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '320px',
      md: '640px',
      lg: '1200px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'primary': '#313237',
        'secondary': '#89939A',
        'icons': '#B4BDC3',
        'elements': '#E2E6E9',
        'hoverBG': '#FAFBFC',
        'white': '#FFFFFF',
        'green': '#27AE60',
        'red': '#EB5757',
      },
      height: {
        '4': '1rem',
        '22': '5.5rem',
      },
      borderWidth: {
        '0.5': '0.125rem'
      },
    },
  },
  plugins: [],
};
