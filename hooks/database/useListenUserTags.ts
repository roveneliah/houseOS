import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EthereumAddress } from "../../types/EthereumAddress";
import { listenUserTags } from "../../utils/firebase/user";
import { useTagUser, useUntagUser } from "./useTagUser";
import { Maybe } from "../../types/Maybe";
import { userTags } from "@/config";

const getDescription = (tagName: string) =>
  userTags.find((tag) => tag.name === tagName)?.description;

export const useListenUserTags = (address: Maybe<EthereumAddress>) => {
  const [tags, setTags] = useState([]);
  const { data: account } = useAccount();
  const tagUser = useTagUser();
  const untagUser = useUntagUser();

  useEffect(() => {
    address &&
      listenUserTags(address, (tags: any) => {
        setTags(
          tags
            .filter(
              ({ taggers }: { taggers: Array<EthereumAddress> }) =>
                taggers.length > 0
            )
            .map(({ tag, taggers }: any) => ({
              tag,
              description: getDescription(tag),
              taggers,
              toggle: () => {
                if (account?.address) {
                  taggers.includes(account?.address)
                    ? untagUser(address, tag)
                    : tagUser(address, tag);
                } else console.log("NO USER");
              },
            }))
        );
      });
  }, [account?.address, tagUser, untagUser, address]);
  return tags;
};
