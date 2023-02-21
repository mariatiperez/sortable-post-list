/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6357b1",
        secondary: "#00ff86",
        gray: "#f4f4f4"
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px"
    }
  },
  plugins: [],
}
