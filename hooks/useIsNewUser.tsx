import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { useGetUserProfile } from "./users/useGetUserProfile";

export const useIsNewUser = (): boolean => {
  const user = useGetUserProfile();
  const { isConnected } = useConnect();
  const [newUser, setNewUser] = useState<boolean>(false);

  useEffect(() => {
    const newbie = !user?.loading && !user?.name;
    setNewUser(isConnected && newbie ? true : false);
  }, [user, isConnected, user?.name]);

  return newUser;
};
