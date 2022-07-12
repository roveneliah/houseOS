import { update } from "@/features/users/usersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { listenUser } from "../../utils/firebase/user";

export const useGetUser = (address: EthereumAddress | undefined): any => {
  const [user, setUser] = useState<any>({ loading: true });
  const userRedux = useSelector((state: any) => state.users[address]);
  const dispatch = useDispatch();

  useEffect(() => {
    userRedux
      ? setUser(userRedux)
      : address &&
        listenUser(address, (user: User) => {
          setUser({ ...user, loading: false });
          dispatch(update(user));
        });
  }, [address]);

  return user;
};
