import { EthereumAddress } from "../../types/EthereumAddress";
import { useGetCeramicUser } from "../ceramic/useGetCeramicUser";
import { User } from "../../types/User";
import { useEffect, useState } from "react";
import { Maybe } from "../../types/Maybe";
import { recordToUser } from "../../utils/recordToUser";

export const useGetUser = (address: EthereumAddress): Maybe<User> => {
  const record = useGetCeramicUser(address);
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (record && !user) {
      record.content?.name && setUser(recordToUser(record));
    }
  }, [record]);

  return user;
};
