import { User } from "../types/User";

export const useGetUsers = (): Array<User> => {
  return [
    {
      id: "1",
      name: "Commodore",
      avatarUrl: "/commodore.png",
      address: "0xc8af50428848b28ec5168037b54b7c7d83e168ee",
    },
    {
      id: "2",
      name: "Flex Chapman",
      avatarUrl: "/flex.png",
      address: "0x5715e8a86c4b785de5114ed9b2233c566f73756c",
    },
    // {
    //   id: "3",
    //   name: "Mario Lopes",
    //   avatarUrl: "",
    //   address: "0xea19",
    // },
  ];
};
