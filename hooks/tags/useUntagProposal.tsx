import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { untagProposal } from "../../utils/firebase/post";
import { useGetUserProfile } from "../users/useGetUserProfile";

export const useUntagProposal = () => {
  const user = useGetUserProfile();
  const [untag, setUntag] = useState<Function>(
    () => () => console.log("No user logged in, doing nothing.")
  );

  useEffect(() => {
    user?.address &&
      setUntag(
        () => (proposalId: string, tag: string) =>
          untagProposal(proposalId, tag, user.address)
      );
  }, [user?.address]);

  return untag;
};
