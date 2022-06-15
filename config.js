module.exports = {
  dao: {
    name: "Krause House",
    treasury: "0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
    gnosisSafes: [
      {
        name: "Main Treasury",
        network: 1,
        address: "0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
      },
    ],
  },
  snapshotSpace: "krausehouse.eth",
  defaultAvatar: "/coachrick.png",
  userTags: [
    "Steward",
    "Contributor",
    "Full-Time",
    "Media Team",
    "Dev Team",
    "Pig Pen",
  ],
  proposalTags: [
    "Compensation",
    "Ball Hogs",
    "Big3",
    "Community",
    "Full-Time",
    "Project",
    "Investment",
    "Treasury",
  ],
  commands: {
    links: [
      {
        name: "Profile",
        link: "/profile",
      },
      {
        name: "Proposals",
        link: "/proposals",
      },
      {
        name: "Treasury (Etherscan)",
        link: "https://etherscan.io/address/0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
      },
      // {
      //   name: "Discord",
      //   link: "",
      // },
      // {
      //   name: "Twitter",
      //   link: "https://twitter.com/krausehousedao",
      // },
      // {
      //   name: "Website",
      //   link: "https://krausehouse.club",
      // },
    ],
  },
  themes: [
    {
      mytheme: {
        primary: "gray",
        secondary: "white",
        accent: "teal",
        neutral: "#7D7259",
        "base-100": "black",
        info: "#2463EB",
        success: "#16A249",
        warning: "orange",
        error: "red",
      },
    },
    "light",
    "dark",
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
