import { createHook } from "async_hooks";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getUsers } from "../../utils/firebase/user";

export const useGetUsers = (): Array<User> => {
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    getUsers().then((users) => setUsers(users || []));
  }, []);

  return users;
};
