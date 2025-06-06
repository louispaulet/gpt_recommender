export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0f4c81',
          dark: '#08315f',
          light: '#dbe4f1',
          muted: '#f5f5f7',
        },
        accent: '#36b3a8',
        secondary: '#ff7e67',
      },
      spacing: {
        section: '2.5rem',
      },
      fontFamily: {
        brand: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};