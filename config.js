module.exports = {
  dao: {
    name: "Krause House",
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
      description: "",
    },
    {
      name: "Dev Team",
      description: "",
    },
    {
      name: "Pig Pen",
      description: "",
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
    {
      mytheme: {
        primary: "purple",
        secondary: "pink",
        accent: "teal",
        neutral: "gray",
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
