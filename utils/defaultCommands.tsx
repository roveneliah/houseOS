import Help from "@/pages/help";
import MyProfile from "@/pages/me";
import ProposalsListPage from "@/pages/proposals";

export default [
  {
    name: "Profile",
    // link: "/me",
    app: <MyProfile />,
    favorite: true,
  },
  {
    name: "Proposals",
    // link: "/proposals",
    app: <ProposalsListPage />,
    favorite: true,
  },
  {
    name: "Help",
    // link: "/help",
    app: <Help />,
    favorite: true,
  },
  // {
  //   name: "Home",
  //   link: "/",
  //   favorite: true,
  // },
];
