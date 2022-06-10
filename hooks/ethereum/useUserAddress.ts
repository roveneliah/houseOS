import { useAccount } from "wagmi";
import { EthereumAddress } from "../../types/EthereumAddress";
import { Maybe } from "../../types/Maybe";

export const useUserAddress = (): Maybe<EthereumAddress> => {
  const { data: account } = useAccount();
  return account?.address;
};
