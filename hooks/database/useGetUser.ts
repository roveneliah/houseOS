import { RootState } from "@/redux/app/store";
import { update } from "@/redux/features/users/usersSlice";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { listenUser } from "../../utils/firebase/user";
import { useKrauseBalance } from "../ethereum";

export const useGetUser = (address: EthereumAddress | undefined): any => {
  const [user, setUser] = useState<any>({ loading: true });
  const dispatch = useAppDispatch();
  const userRedux = useAppSelector(
    (state: RootState) => address && state.users?.[address]
  );

  useEffect(() => {
    userRedux
      ? setUser({ ...userRedux, loading: false })
      : address &&
        listenUser(address, (user: User) => {
          setUser({
            ...user,
            loading: false,
          });
          dispatch(update(user));
        });
  }, [address]);

  return user;
};
