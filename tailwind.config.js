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
        myGreen: "#69D94E",
        myGreenMed: "#bad4a6",
        myGreenLight: "#e9f2e2",
        10: "#2CA93B",
        30: "#FFFFFF",
        60: "#FAFAFA",
        textC: "#020202",

        myYellow: "#FFF1B1",
        myGreen: "#DDFFD1",

        grayb: "#F6F7F9",

        b50: "#E6E6E6",
        b100: "#6C6C6C",
        b200: "#2D2D2D",
        b300: "#020202",

        g50: "#F0FBED",
        g75: "#C2EFB6",
        g200: "#83DF6C",
        g300: "#69D94E",
        g400: "#4A9837",
        myOrange: "#FF6B00",
      },
    },
  },
  plugins: [],
};
