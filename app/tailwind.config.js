/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#112D4E",
        secondary: "#3F72AF",
        tertiary: "#DBE2EF",
        quaternary: "#F9F7F7",
      }
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "corporate", "bumblebee"],
  },
  plugins: [require("daisyui")],
}