import { useViewerRecord } from "@self.id/framework";
import { useAccount, useEnsAddress, useEnsName } from "wagmi";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { tagProposal, untagProposal } from "../../utils/firebase/post";
import {
  addFriend,
  removeFriend,
  tagUser,
  untagUser,
  updateName,
  setProfilePic,
} from "../../utils/firebase/user";
import { recordToUser } from "../../utils/recordToUser";
// import { updateName } from "../ceramic/ceramic";
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

  return !user?.loading
    ? {
        ...user,
        loading: false,
        hodler,
        krauseBalance,
        ensName,
        addFriend: (friend: EthereumAddress) => addFriend(user.address, friend),
        removeFriend: (friend: EthereumAddress) =>
          removeFriend(user.address, friend),
        tagUser: (userAddress: EthereumAddress, tag: string) =>
          tagUser(userAddress, tag, user.address),
        untagUser: (userAddress: EthereumAddress, tag: string) =>
          untagUser(userAddress, tag, user.address),
        updateName: (name: string) => updateName(user.address, name),
        setProfilePic: (file: any) => setProfilePic(user.address, file),
      }
    : { loading: true };
};
