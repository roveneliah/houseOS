import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../types/User";
import { getUsers } from "../../utils/firebase/user";
import { track } from "@/features/users/usersSlice";
import { compose } from "redux";
import { map, tap } from "ramda";

export const useGetUsers = (): Array<User> => {
  const [users, setUsers] = useState<any>([]);
  const dispatch = useDispatch();
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
