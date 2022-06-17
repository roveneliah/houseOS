import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { listenUser } from "../../utils/firebase/user";

export const useGetUser = (address: EthereumAddress | undefined): any => {
  const [user, setUser] = useState<any>({ loading: true });

  useEffect(() => {
    address &&
      listenUser(address, (user: User) => setUser({ ...user, loading: false }));
  }, [address]);

  return user;
};
