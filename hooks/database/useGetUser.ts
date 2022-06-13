import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { listenUser } from "../../utils/firebase/user";

export const useGetUser = (address: EthereumAddress): User => {
  const [user, setUser] = useState<any>([]);
  useEffect(() => {
    listenUser(address, setUser);
  }, []);

  return user;
};
