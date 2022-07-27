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
    "Important",
    "Major Expense",
  ],
  commands: {
    links: [
      {
        name: "Dashboard",
        link: "https://www.terminal.co/community/social/krausehouse.eth",
        favorite: true,
      },
      {
        name: "Contributor Dashboard",
        link: "https://krausehousework.notion.site/Krause-House-Contributor-Dashboard-a00860761dd4486792aed12cc8187ce2",
        favorite: true,
      },
      {
        name: "Main Treasury",
        link: "https://etherscan.io/address/0xe4762eacebdb7585d32079fdcba5bb94eb5d76f2",
      },
      {
        name: "Submit a Proposal",
        link: "https://krausehousework.notion.site/Submit-a-Proposal-fcf858c80a0c40b6a2a83aec5ed588dc",
        favorite: true,
      },
      {
        name: "Gnosis Chain Treasury",
        network: 1,
        address: "gno:0x5844c36D6f803213Ca3f7fDac39A0d78f918ee3c",
        link: "https://blockscout.com/xdai/mainnet/address/0x5844c36D6f803213Ca3f7fDac39A0d78f918ee3c/transactions",
      },
      {
        name: "Polygon Treasury",
        network: 1,
        address: "matic:0x40eDBC75C543954CDD9c5ae7398342788F46A85B",
        link: "https://polygonscan.com/address/0x40eDBC75C543954CDD9c5ae7398342788F46A85B",
      },
      {
        name: "Optimism Treasury",
        network: 1,
        address: "matic:0x40eDBC75C543954CDD9c5ae7398342788F46A85B",
        link: "https://optimistic.etherscan.io/address/0xe245d82DDeDfB95ccaf68B9B609F1717B1A14A54",
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
      {
        name: "Draft Proposals",
        link: "https://www.notion.so/a5d990ad04624d9daa70366b88e88ce4?v=62daad62e62a4395a7be0edaa26e630c",
      },
      {
        name: "Calendar",
        link: "https://calendar.google.com/calendar/u/0?cid=dTRobTU2NDQ4NWZoN201MHR0Z2N2NTNlNmdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
        favorite: true,
      },
      {
        name: "Bounty Board",
        link: "https://app.dework.xyz/krause-house",
      },
      {
        name: "Brand Guidelines",
        link: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c46e9a4e-d30f-4842-9909-7c7c9c0571ab/KrauseHouse_BrandGuidelines-V1_lo.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220720%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220720T180456Z&X-Amz-Expires=86400&X-Amz-Signature=1a5db7f68a876e86709e6c66a094374f0847921e605917c6cc251d7cea91260d&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Krause%2520House%2520Brand%2520Guidelines%252004.2022.pdf%22&x-id=GetObject",
      },
      {
        name: "Youtube",
        link: "https://www.youtube.com/channel/UCtiCOIi2V5U8EixchY01VVQ/videos",
      },
    ],
  },
  themes: [
    {
      mytheme: {
        primary: "green",
        // "primary-focus": "#24143D",
        // "primary-content": "#F4F0FA",

        secondary: "#F72585",
        // "secondary-focus": "#760438",
        // "secondary-content": "",

        accent: "teal",
        // "accent-focus": "#760438",
        // "accent-content": "",

        neutral: "#F4F0FA",
        // "neutral-focus": "#760438",
        // "neutral-content": "",

        "base-100": "#DFFFD6",
        "base-200": "#1F8F00",
        "base-300": "#104A00",

        // info: "#2463EB",
        // "info-content": "",

        // success: "#16A249",
        // "success-content": "",

        // warning: "orange",
        // "warning-content": "",

        // error: "red",
        // "error-content": "",
      },
    },
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
