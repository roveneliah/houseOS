import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { User } from "../../types/User";
import { getUsers } from "../../utils/firebase/user";
import { track } from "@/features/users/usersSlice";
import { compose } from "redux";
import { map, tap } from "ramda";

export const useGetUsers = (): Array<User> => {
  const [users, setUsers] = useState<any>([]);
  const dispatch = useAppDispatch();
  const trackUsers = map(compose(dispatch, track));

  useEffect(() => {
    getUsers()
      .then(tap(trackUsers))
      .then((users) => {
        setUsers(users || []);
      });
  }, []);

  return users;
};
