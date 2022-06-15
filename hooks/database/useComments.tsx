import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { Comment } from "../../types/Comment";
import { listenUserComments } from "../../utils/firebase/user";
import { useGetProposals } from "../snapshot/useGetProposals";
import { snapshotSpace } from "../../config";
import { Proposal } from "../../types/Proposal";

/**
 * Get all of a users' comments.
 */
export const useComments = (address: EthereumAddress): Array<Comment> => {
  const [comments, setComments] = useState<Array<Comment>>([]);
  const proposals = useGetProposals(snapshotSpace);

  useEffect(() => {
    listenUserComments(address).then((comments: Array<any>) => {
      setComments(
        comments.map(({ author, body, proposalId, choice }) => {
          const proposal = proposals.find((p: Proposal) => p.id === proposalId);
          return {
            author,
            body,
            proposalId,
            votingPower: -1,
            proposalTitle: proposal?.title,
            choice: proposal?.choices[choice + 1],
            // proposal,
          };
        })
      );
    });
  }, [address]);

  return comments;
};
