import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { EthereumAddress } from "@/types/EthereumAddress";
import { Maybe } from "@/types/Maybe";
import { useSignIn } from "../useSignIn";

import { userTags } from "../../config";
import { useTagUser, useUntagUser } from "../database/useTagUser";
import { listenUserTags } from "../../utils/firebase/user";
import { Tag } from "@/types/Tag";

export const useGetAllUserTags = (
  address: Maybe<EthereumAddress>
): Array<any> => {
  const tagUser = useTagUser();
  const untagUser = useUntagUser();
  const { data: account } = useAccount();
  const [tags, setTags] = useState([]);
  const { signedIn } = useSignIn();

  const sortedTags = useMemo(
    () => tags.sort((a: Tag, b: Tag) => b.taggers.length - a.taggers.length),
    [tags]
  );

  useEffect(() => {
    signedIn &&
      address &&
      listenUserTags(address, (tags: any) => {
        const allTags = tags.concat(
          userTags
            .filter(
              // filtering out before I can add description, I really want to attach descriptoin
              ({ name }) => !tags.map(({ tag }: any) => tag).includes(name)
            )
            .map(({ name, description }) => ({
              name,
              description,
              taggers: [],
            }))
        );

        setTags(
          allTags.map(({ name, taggers, description }: any) => ({
            tag: name,
            taggers,
            toggle: () => {
              if (account?.address) {
                if (taggers.includes(address)) {
                  console.log("Untagging", address, " with ", tag);
                  untagUser(address, tag);
                } else {
                  console.log("Tagging", address, " with ", tag);
                  tagUser(address, tag);
                }
              } else console.log("NO USER");
            },
            description,
          }))
        );
      });
  }, [account?.address, untagUser, tagUser, signedIn]);
  return sortedTags;
};
