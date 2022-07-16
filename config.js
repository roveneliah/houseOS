module.exports = {
  dao: {
    name: "Krause House",
    description: "A community just crazy enough to buy an NBA team as a DAO.",
    memberName: "Jerry",
    treasury: "0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
    gnosisSafes: [
      {
        name: "Main Treasury",
        network: 1,
        address: "0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
      },
    ],
  },
  tokenGating: {
    status: true,
    filters: [
      {
        address: "0x9",
        gt: 0,
      },
    ],
  },
  snapshotSpace: "krausehouse.eth",
  defaultAvatar: "/coachrick.png",
  userTags: [
    {
      name: "Steward",
      description: "Responsible for proposal process and Snapshot space.",
    },
    {
      name: "Contributor",
      description: "Active or previous full- or part-time contributor.",
    },
    {
      name: "Full-Time",
      description: "Currently full-time.",
    },
    {
      name: "Media Team",
      description: "Meme'ing it up.",
    },
    {
      name: "Dev Team",
      description: "",
    },
    {
      name: "Pig Pen",
      description: "Contributes to Ball Hogs operations.",
    },
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
        name: "Treasury (Etherscan)",
        link: "https://etherscan.io/address/0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
      },
      // {
      //   name: "Discord",
      //   link: "",
      // },
      {
        name: "Twitter",
        link: "https://twitter.com/krausehousedao",
      },
      {
        name: "Website",
        link: "https://krausehouse.club",
      },
    ],
  },
  themes: [
    // {
    //   mytheme: {
    //     primary: "#34046F",
    //     "primary-focus": "#24143D",
    //     "primary-content": "#F4F0FA",

    //     secondary: "#F72585",
    //     "secondary-focus": "#760438",
    //     // "secondary-content": "",

    //     accent: "teal",
    //     "accent-focus": "#760438",
    //     // "accent-content": "",

    //     neutral: "gray",
    //     "neutral-focus": "#760438",
    //     // "neutral-content": "",

    //     "base-100": "black",
    //     "base-200": "gray",
    //     "base-300": "white",

    //     info: "#2463EB",
    //     // "info-content": "",

    //     success: "#16A249",
    //     // "success-content": "",

    //     warning: "orange",
    //     // "warning-content": "",

    //     error: "red",
    //     // "error-content": "",
    //   },
    // },
    "dark",
    "light",
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
