/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#3D1470',
          violetDark: '#1F0A42',
          violetLight: '#7C3AED',
          magenta: '#E6167E',
          magentaLight: '#F0388F',
          black: '#0D0D0D',
          charcoal: '#1A1A1A',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3D1470 0%, #7C3AED 45%, #E6167E 100%)',
        'brand-gradient-soft': 'linear-gradient(180deg, #3D1470 0%, #1F0A42 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(230, 22, 126, 0.35)',
      },
    },
  },
  plugins: [],
};
