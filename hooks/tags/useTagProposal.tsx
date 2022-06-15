import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { tagProposal } from "../../utils/firebase/post";
import { useGetUserProfile } from "../users/useGetUserProfile";

export const useTagProposal = () => {
  const user = useGetUserProfile();
  const [tag, setTag] = useState<Function>(
    () => () => console.log("No user logged in, doing nothing.")
  );

  useEffect(() => {
    user?.address &&
      setTag(
        () => (proposalId: EthereumAddress, tag: string) =>
          tagProposal(proposalId, tag, user.address)
      );
  }, [user?.loading]);

  return tag;
};
