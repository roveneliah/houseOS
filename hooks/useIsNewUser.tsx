import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { useGetUserProfile } from "./users/useGetUserProfile";
import { useUserAddress } from "./ethereum/useUserAddress";

export const useIsNewUser = (): boolean => {
  const user = useGetUserProfile();
  const { isConnected } = useConnect();
  const address = useUserAddress();
  const [newUser, setNewUser] = useState<boolean>(false);

  useEffect(() => {
    const newbie = user && !user.loading && !user.name;

    if (isConnected && newbie && address) {
      setNewUser(true);
    } else setNewUser(false);
  }, [user, isConnected, user?.name]);

  return newUser;
};
