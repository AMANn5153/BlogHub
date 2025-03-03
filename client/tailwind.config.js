import daisyui from "daisyui";
import scrollbarHide from "tailwind-scrollbar-hide";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, scrollbarHide],
  daisyui: {
    themes: ["light"], // ✅ Fix: Use "themes" instead of "theme"
  },
};
