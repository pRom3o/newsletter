/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Roboto: 'Roboto',
      },
      fontSize: {
        para: '16px',
      },
      backgroundImage: {
        'tomato-orange': 'linear-gradient(45deg, #f0374f, #f97316)', // Custom gradient
      },
      transitionProperty: {
        background: 'background-color, background-image, border-color', // For smooth hover transitions
      },
      colors: {
        tomato: '#f0374f',
        'slate-grey': '#1d1e28',
        'charcoal-grey': '#252a34',
        grey: '#e3e4e7',
      },
    },
  },
  plugins: [],
};
