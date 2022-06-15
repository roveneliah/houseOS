import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { Comment } from "../../types/Comment";
import { listenUserComments } from "../../utils/firebase/user";
import { useGetProposals } from "../snapshot/useGetProposals";
import { snapshotSpace } from "../../config";
import { Proposal } from "../../types/Proposal";
import { fetchVote } from "../../utils/fetchVote";

/**
 * Get all of a users' comments.
 */
export const useComments = (address: EthereumAddress): Array<Comment> => {
  const [comments, setComments] = useState<any>([]);
  const proposals = useGetProposals(snapshotSpace);

  useEffect(() => {
    listenUserComments(address).then((comments: Array<any>) => {
      address &&
        proposals &&
        Promise.all(
          comments.map(async ({ author, body, proposalId, choice }) => {
            const proposal = proposals.find(
              (p: Proposal) => p.id === proposalId
            );
            const [vote] = await fetchVote(proposalId, address);
            return {
              author,
              body,
              proposalId,
              proposalTitle: proposal?.title,
              choice: proposal?.choices[choice + 1],
              vp: vote?.vp,
              end: proposal?.end,
            };
          })
        ).then(setComments);
    });
  }, [address, proposals]);

  return comments;
};
