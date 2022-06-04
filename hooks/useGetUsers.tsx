import { User } from "../types/User";

export const useGetUsers = (): Array<User> => {
  return [
    {
      id: "1",
      name: "Commodore",
      avatarUrl: "/commodore.png",
      address: "0x0000",
    },
    {
      id: "2",
      name: "Flex Chapman",
      avatarUrl: "/flex.png",
      address: "0x2234",
    },
    // {
    //   id: "3",
    //   name: "Mario Lopes",
    //   avatarUrl: "",
    //   address: "0xea19",
    // },
  ];
};
