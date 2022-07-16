import { update } from "@/features/users/usersSlice";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { listenUser } from "../../utils/firebase/user";

export const useGetUser = (address: EthereumAddress | undefined): any => {
  if (!address) return {};

  const [user, setUser] = useState<any>({ loading: true });
  const userRedux = useAppSelector((state: any) => state.users[address]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    userRedux
      ? setUser({ ...userRedux, loading: false })
      : address &&
        listenUser(address, (user: User) => {
          setUser({ ...user, loading: false });
          dispatch(update(user));
        });
  }, [address]);

  return user;
};
