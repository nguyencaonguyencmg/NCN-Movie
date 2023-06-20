/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#EAB308",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        loading: {
          "0%,100%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
