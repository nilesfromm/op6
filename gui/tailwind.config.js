/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#FF7F50",
        cornflower: "#6495ED",
      },
      fontFamily: {
        space: ["Space Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
