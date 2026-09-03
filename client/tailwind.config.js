/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#2E0F4F',
          violetDark: '#1A0B2E',
          violetLight: '#3B1464',
          magenta: '#E6007E',
          magentaLight: '#EC1E79',
          black: '#0D0D0D',
          charcoal: '#1A1A1A',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2E0F4F 0%, #3B1464 45%, #E6007E 100%)',
        'brand-gradient-soft': 'linear-gradient(180deg, #2E0F4F 0%, #1A0B2E 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(230, 0, 126, 0.35)',
      },
    },
  },
  plugins: [],
};
