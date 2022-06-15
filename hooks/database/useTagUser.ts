import { tagUser, untagUser } from "../../utils/firebase/user";
import { EthereumAddress } from "../../types/EthereumAddress";
import { useGetUserProfile } from "../users/useGetUserProfile";
import { useEffect, useState } from "react";

export const useTagUser = () => {
  const user = useGetUserProfile();
  const [tag, setTag] = useState<Function>(
    () => () => console.log("No user logged in, doing nothing.")
  );

  useEffect(() => {
    user?.address &&
      setTag(
        () => (userAddress: EthereumAddress, tag: string) =>
          tagUser(userAddress, tag, user.address)
      );
  }, [user?.loading]);
  return tag;
};

export const useUntagUser = () => {
  const user = useGetUserProfile();
  const [untag, setUntag] = useState<Function>(
    () => () => console.log("No user logged in, doing nothing.")
  );

  useEffect(() => {
    user?.address &&
      setUntag(
        () => (userAddress: EthereumAddress, tag: string) =>
          untagUser(userAddress, tag, user.address)
      );
  }, [user?.loading]);
  return untag;
};
