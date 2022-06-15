import { getAccount } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { EthereumAddress } from "../../types/EthereumAddress";
import { listenUserTags } from "../../utils/firebase/user";
import { useTagUser, useUntagUser } from "./useTagUser";

export const useListenUserTags = (address: EthereumAddress) => {
  const [tags, setTags] = useState([]);
  const { status, data: account } = useAccount();
  const tagUser = useTagUser();
  const untagUser = useUntagUser();

  useEffect(() => {
    listenUserTags(address, (tags: any) => {
      setTags(
        tags.map(({ tag, taggers }: any) => ({
          tag,
          taggers,
          toggle: () => {
            if (account?.address) {
              if (taggers.includes(account?.address)) {
                console.log("Untagging", address, " with ", tag);
                untagUser(address, tag);
              } else {
                console.log("Tagging", address, " with ", tag);
                tagUser(address, tag);
              }
            } else console.log("NO USER");
          },
        }))
      );
    });
  }, [account?.address]);
  return tags;
};
