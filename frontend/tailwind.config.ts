import path from 'path';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};