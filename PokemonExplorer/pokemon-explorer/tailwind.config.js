/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./ui/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        breathe: "breathe 3s ease-in-out infinite",
      },
      colors: {
        grass: "#A7DB8D",
        sky: "#DAECF2",
        pokeRed: "#EE1515",
        pokeYellow: "#F4D23A",
      },
    },
  },
  plugins: [],
};
