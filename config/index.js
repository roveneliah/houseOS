const commands = require("./commands");
const dao = require("./dao");
const proposalTags = require("./tags/proposalTags");
const userTags = require("./tags/userTags");

module.exports = {
  dao,
  snapshotSpace: "krausehouse.eth",
  snapshotUrl: "https://snapshot.org/#/krausehouse.eth",
  defaultAvatar: "/coachrick.png",
  userTags,
  proposalTags,
  commands,
  themes: [
    // {
    //   dark: {
    //     ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
    //     primary: "blue",
    //     "primary-focus": "mediumblue",
    //     "base-content": "white",
    //   },
    // },
    {
      mytheme: {
        primary: "green",
        "primary-focus": "#24143D",
        "primary-content": "#F4F0FA",

        secondary: "#F72585",
        "secondary-focus": "#760438",
        // "secondary-content": "",

        accent: "teal",
        // "accent-focus": "#760438",
        // "accent-content": "",

        neutral: "#F4F0FA",
        "neutral-focus": "#760438",
        // "neutral-content": "",

        "base-100": "#FFFFFF",
        "base-200": "#F4EFE9",
        "base-300": "#B9B5A6",
        "base-content": "#170B2B",

        info: "#2463EB",
        // "info-content": "",

        success: "#16A249",
        // "success-content": "",

        warning: "orange",
        // "warning-content": "",

        error: "red",
        // "error-content": "",

        "--app-bg": "#F3F1EA",
      },
    },
    // "light",
    // "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ],
};
