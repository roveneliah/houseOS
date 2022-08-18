import Help from "@/components/help";
import MyProfile from "@/components/me";
import ProposalsListPage from "@/components/proposals";

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
