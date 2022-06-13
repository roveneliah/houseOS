import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { listenUserTags } from "../../utils/firebase/user";

export const useListenUserTags = (address: EthereumAddress) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    listenUserTags(address, setTags);
  }, []);
  return tags;
};
