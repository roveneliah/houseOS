import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { EthereumAddress } from "@/types/EthereumAddress";
import { Maybe } from "@/types/Maybe";
import { useSignIn } from "../useSignIn";

import { userTags as allUserTags } from "../../config";
import { useTagUser, useUntagUser } from "../database/useTagUser";
import { listenUserTags } from "../../utils/firebase/user";
import { Tag } from "@/types/Tag";
import { map } from "ramda";

export const useGetAllUserTags = (
  address: Maybe<EthereumAddress>
): Array<any> => {
  const tagUser = useTagUser();
  const untagUser = useUntagUser();
  const { data: account } = useAccount();
  const { signedIn } = useSignIn();

  const [tags, setTags] = useState([]);
  const sortedTags = useMemo(
    () => tags.sort((a: Tag, b: Tag) => b.taggers.length - a.taggers.length),
    [tags]
  );

  const declareToggle = (o: any) => ({
    ...o,
    toggle: () => {
      // TODO: account?.address might be a bug
      if (account?.address) {
        if (o.taggers.includes(address)) {
          console.log("Untagging", address, " with ", o.name);
          untagUser(address, o.name);
        } else {
          console.log("Tagging", address, " with ", o.name);
          tagUser(address, o.name);
        }
      } else console.log("NO USER");
    },
  });

  const addDescription = (tag: any) => ({
    ...tag,
    description: allUserTags.find(({ name }) => name === tag.tag)?.description,
  });

  useEffect(() => {
    address &&
      listenUserTags(address, (tags: any) => {
        const otherTags = allUserTags
          .filter(({ name }) => !tags.map(({ tag }: any) => tag).includes(name))
          .map((o) => ({ ...o, taggers: [] }));

        const allTags = tags
          .concat(otherTags)
          .map(addDescription)
          .map(declareToggle);

        setTags(allTags);
      });
  }, [account?.address, untagUser, tagUser, signedIn]);

  return sortedTags;
};

export function printPass(a: any) {
  console.log(a);
  return a;
}
