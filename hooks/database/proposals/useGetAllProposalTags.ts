import { proposalTags } from "../../../config";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { listenProposalTags } from "../../../utils/firebase/post";
import { useTagProposal } from "../tags/useTagProposal";
import { useUntagProposal } from "../tags/useUntagProposal";

export const useGetAllProposalTags = (proposalId: string) => {
  const [tags, setTags] = useState([]);
  const { data: account } = useAccount();
  const tagProposal = useTagProposal();
  const untagProposal = useUntagProposal();

  useEffect(() => {
    listenProposalTags(proposalId, (tags: any) => {
      const allTags = tags.concat(
        proposalTags
          .filter((tag) => !tags.map(({ tag }: any) => tag).includes(tag))
          .map((tag: string) => ({ tag, taggers: [] }))
      );

      setTags(
        allTags.map(({ tag, taggers }: any) => ({
          tag,
          taggers,
          toggle: () => {
            if (account?.address) {
              taggers.includes(account?.address)
                ? untagProposal(proposalId, tag)
                : tagProposal(proposalId, tag);
            } else console.log("NO USER");
          },
        }))
      );
    });
  }, [tagProposal, untagProposal, proposalId]);
  return tags;
};
