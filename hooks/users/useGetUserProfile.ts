import { useViewerRecord } from "@self.id/framework";
import { useAccount, useEnsAddress, useEnsName } from "wagmi";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { addFriend, removeFriend } from "../../utils/firebase/user";
import { recordToUser } from "../../utils/recordToUser";
import { useGetUser } from "../database/useGetUser";
import { useKrauseBalance } from "../ethereum/useKrauseBalance";

// CERAMIC
// export const useGetUserProfile = (): User => {
//   const record = useViewerRecord("basicProfile");
//   return recordToUser(record);
// };

export const useGetUserProfile = () => {
  const { data: account } = useAccount();
  const user = useGetUser(account?.address);
  const krauseBalance = Number(useKrauseBalance(account?.address));
  const hodler = krauseBalance > 0;
  const { data: ensName } = useEnsName({ address: account?.address });

  return (
    user && {
      ...user,
      hodler,
      krauseBalance,
      ensName,
      addFriend: (friend: EthereumAddress) => addFriend(user.address, friend),
      removeFriend: (friend: EthereumAddress) =>
        removeFriend(user.address, friend),
    }
  );
};
