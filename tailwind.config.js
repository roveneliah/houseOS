const { themes } = require("./config.js");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // NEXT.JS, can't assume this works everywhere
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes,
  },
};
