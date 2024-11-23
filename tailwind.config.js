/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0D0D0D',
        gray: '#ADADAD',
        yellow: '#FEB428',
        background: '#F9F8F8',
        white: '#FFF'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        yeseva: ["Yeseva One", "sans-serif"]
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1280px",
    },
  },
  plugins: [],
};
