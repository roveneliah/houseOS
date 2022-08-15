import { tagUser, untagUser } from "../../utils/firebase/user";
import { EthereumAddress } from "../../types/EthereumAddress";
import { useGetUserProfile } from "../users/useGetUserProfile";
import { useEffect, useState } from "react";
import { useSignIn } from "../useSignIn";

// TODO: merge into one hook that returns both functions (tag, untag, toggle) from user
export const useTagUser = () => {
  const user = useGetUserProfile();
  const { signedIn } = useSignIn();
  const [tag, setTag] = useState<Function>(
    () => () => console.log("No user logged in, doing nothing.")
  );

  useEffect(() => {
    signedIn &&
      user?.address &&
      setTag(
        () => (userAddress: EthereumAddress, tag: string) =>
          tagUser(userAddress, tag, user.address)
      );
  }, [user?.loading, signedIn]);
  return tag;
};

export const useUntagUser = () => {
  const { signedIn } = useSignIn();
  const user = useGetUserProfile();
  const [untag, setUntag] = useState<Function>(
    () => () => console.log("No user logged in, doing nothing.")
  );

  useEffect(() => {
    signedIn &&
      user?.address &&
      setUntag(
        () => (userAddress: EthereumAddress, tag: string) =>
          untagUser(userAddress, tag, user.address)
      );
  }, [user?.loading, signedIn]);
  return untag;
};
