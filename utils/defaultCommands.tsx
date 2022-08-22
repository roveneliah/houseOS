import Help from "@/components/help";
import MyProfile from "@/components/me";
import ProposalsListPage from "@/components/proposals";
import { snapshotSpace, snapshotUrl } from "@/config";

export default [
  // {
  //   name: "Profile",
  //   // link: "/me",
  //   app: <MyProfile />,
  //   favorite: true,
  // },
  {
    name: "Proposals",
    keywords: ["Snapshot"],
    link: snapshotUrl,
    // app: <ProposalsListPage />,
    favorite: true,
  },
  // {
  //   name: "Help",
  //   // link: "/help",
  //   app: <Help />,
  //   favorite: true,
  // },
  // {
  //   name: "Home",
  //   link: "/",
  //   favorite: true,
  // },
];
