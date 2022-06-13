import { tagUser } from "../../utils/firebase/user";
import { EthereumAddress } from "../../types/EthereumAddress";
import { useGetUserProfile } from "../users/useGetUserProfile";

export const useTagUser = () => {
  const user = useGetUserProfile();

  return user
    ? (userAddress: EthereumAddress, tag: string) =>
        tagUser(userAddress, tag, user.address)
    : undefined;
};
