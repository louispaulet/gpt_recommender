export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#711DB0',
          secondary: '#C21292',
          accent: '#EF4040',
          light: '#FAFAFC',
          dark: '#1B1B32',
        },
      },
      spacing: {
        section: '4rem',
      },
      fontFamily: {
        brand: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};