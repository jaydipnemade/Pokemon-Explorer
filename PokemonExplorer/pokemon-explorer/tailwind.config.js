/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./ui/**/*.{ts,tsx}"],
  theme: {
    extend: {
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
