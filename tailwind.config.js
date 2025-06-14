/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        satim: {
          primary: '#C41E3A', // Crimson red
          secondary: '#8B0000', // Dark red
          accent: '#DC143C', // Scarlet
          light: '#FFE4E1', // Misty rose
          dark: '#800000', // Maroon
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'satim': '0 4px 6px -1px rgba(196, 30, 58, 0.1), 0 2px 4px -1px rgba(196, 30, 58, 0.06)',
      },
    },
  },
  plugins: [],
};
