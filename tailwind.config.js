const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF3005',
        danger: '#FF1E56',
        success: '#06C138',
        gray1: '#E9ECEF',
        gray2: '#A8AAAC',
        black1: '#151515',
      },
      fontSize: {
        3.5: '0.875',
        4.25: '1.0625rem',
      },
      spacing: {
        1.25: '0.313rem',
        400: '90rem',
        500: '110rem',
      },
      maxHeight: {
        120: '30rem',
      },
      maxWidth: {
        400: '100rem',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const utilities = {
        '.capitalize-first:first-letter': {
          textTransform: 'uppercase',
        },
      };
      addUtilities(utilities, ['responsive', 'hover']);
    }),
  ],
};
