import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { listenUserTags, tagUser, untagUser } from "../../utils/firebase/user";
import { useGetUserProfile } from "../users/useGetUserProfile";

export const useListenUserTags = (address: EthereumAddress) => {
  const [tags, setTags] = useState([]);
  const user = useGetUserProfile(); // TODO: should be a wagmi hook

  useEffect(() => {
    listenUserTags(address, (tags: any) => {
      setTags(
        tags.map(({ tag, taggers }: any) => ({
          tag,
          taggers,
          toggle: () => {
            if (user?.address) {
              if (taggers.includes(user.address)) {
                console.log("Untagging", address, " with ", tag);
                untagUser(address, tag, user.address);
              } else {
                console.log("Tagging", address, " with ", tag);
                tagUser(address, tag, user?.address);
              }
            } else console.log("NO USER");
          },
        }))
      );
    });
  }, []);
  return tags;
};
