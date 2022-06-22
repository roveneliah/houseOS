import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { userTags } from "../../config";
import { EthereumAddress } from "../../types/EthereumAddress";
import { listenUserTags } from "../../utils/firebase/user";
import { useTagUser, useUntagUser } from "../database/useTagUser";
import { Maybe } from "../../types/Maybe";
import { useSignIn } from "../useSignIn";

export const useGetAllUserTags = (
  address: Maybe<EthereumAddress>
): Array<any> => {
  const tagUser = useTagUser();
  const untagUser = useUntagUser();
  const { data: account } = useAccount();
  const [tags, setTags] = useState([]);
  const { signedIn } = useSignIn();

  useEffect(() => {
    signedIn &&
      address &&
      listenUserTags(address, (tags: any) => {
        const allTags = tags.concat(
          userTags
            .filter((tag) => !tags.map(({ tag }: any) => tag).includes(tag))
            .map((tag: string) => ({ tag, taggers: [] }))
        );

        setTags(
          allTags.map(({ tag, taggers }: any) => ({
            tag,
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
          }))
        );
      });
  }, [account?.address, untagUser, tagUser, signedIn]);
  return tags;
};
