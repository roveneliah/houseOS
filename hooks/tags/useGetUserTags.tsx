import { EthereumAddress } from "../../types/EthereumAddress";
import { getUser } from "../../utils/firebase/user";
import { pickRandom } from "../../utils/pickRandom";
import { createHook } from "../createHook";
import { useGetUser } from "../database/useGetUser";

export const useGetUserTags = (address: EthereumAddress): Array<string> => {
  const user = useGetUser(address);
  return user?.tags?.map(({ tag }) => tag) || [];
};
