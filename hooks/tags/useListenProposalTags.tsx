import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { listenProposalTags } from "../../utils/firebase/post";
import { useTagProposal } from "./useTagProposal";
import { useUntagProposal } from "./useUntagProposal";

export const useListenProposalTags = (proposalId: string) => {
  const [tags, setTags] = useState([]);
  const { data: account } = useAccount();
  const tagProposal = useTagProposal();
  const untagProposal = useUntagProposal();

  useEffect(() => {
    listenProposalTags(proposalId, (tags: any) => {
      setTags(
        tags
          .filter(({ taggers }) => taggers.length > 0)
          .map(({ tag, taggers }: any) => ({
            tag,
            taggers,
            toggle: () => {
              if (account?.address) {
                if (taggers.includes(account?.address)) {
                  console.log("Untagging", proposalId, " with ", tag);
                  untagProposal(proposalId, tag);
                } else {
                  console.log("Tagging", proposalId, " with ", tag);
                  tagProposal(proposalId, tag);
                }
              } else console.log("NO USER");
            },
          }))
      );
    });
  }, [untagProposal, tagProposal, proposalId]);
  return tags;
};
