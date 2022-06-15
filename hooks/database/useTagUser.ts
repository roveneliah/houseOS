import { tagUser, untagUser } from "../../utils/firebase/user";
import { EthereumAddress } from "../../types/EthereumAddress";
import { useGetUserProfile } from "../users/useGetUserProfile";

export const useTagUser = () => {
  const user = useGetUserProfile();

  return user
    ? (userAddress: EthereumAddress, tag: string) =>
        tagUser(userAddress, tag, user.address)
    : () => console.log("No user logged in, doing nothing.");
};

export const useUntagUser = () => {
  const user = useGetUserProfile();

  return user
    ? (userAddress: EthereumAddress, tag: string) =>
        untagUser(userAddress, tag, user.address)
    : () => console.log("No user logged in, doing nothing.");
};
