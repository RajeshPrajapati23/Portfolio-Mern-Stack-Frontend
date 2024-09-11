/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue1: "#eee8f6",
      blue2: "#adbada",
      blue3: "#8697c3",
      blue4: "#3d52a1",
    },
    extend: {},
  },
  plugins: [],
};
