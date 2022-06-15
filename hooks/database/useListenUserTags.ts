import { getAccount } from "@wagmi/core";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { EthereumAddress } from "../../types/EthereumAddress";
import { listenUserTags, tagUser, untagUser } from "../../utils/firebase/user";
import { useGetUserProfile } from "../users/useGetUserProfile";

export const useListenUserTags = (address: EthereumAddress) => {
  const [tags, setTags] = useState([]);
  const { status, data: account } = useAccount();

  useEffect(() => {
    listenUserTags(address, (tags: any) => {
      setTags(
        tags.map(({ tag, taggers }: any) => ({
          tag,
          taggers,
          toggle: () => {
            if (status === "success" && account?.address) {
              console.log(status, account?.address);
              if (taggers.includes(account?.address)) {
                console.log("Untagging", address, " with ", tag);
                untagUser(address, tag, account?.address);
              } else {
                console.log("Tagging", address, " with ", tag);
                tagUser(address, tag, account?.address);
              }
            } else console.log("NO USER");
          },
        }))
      );
    });
  }, [account?.address]);
  return tags;
};
