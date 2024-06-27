/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        darkgrey: "#212121 ",
        midgrey: "#666666",
        lightgrey: "#9E9E9E ",
        darkwhite: "#E8E8E8",
        midwhite: "#F0F2F5",
        lightwhite: "#FAFAFA",
        myGreen: "#51A90E",
        myGreenMed: "#bad4a6",
        myGreenLight: "#e9f2e2",
        10: "#2CA93B",
        30: "#FFFFFF",
        60: "#FAFAFA",
        myOrange: "#F7AF40",
      },
    },
  },
  plugins: [],
};
