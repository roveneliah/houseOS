import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { Comment } from "../../types/Comment";
import { listenUserComments } from "../../utils/firebase/user";
import { useGetProposals } from "../snapshot/useGetProposals";
import { snapshotSpace } from "../../config";
import { Proposal } from "../../types/Proposal";
import { fetchVote } from "../../utils/snapshot/fetchVote";
import { Maybe } from "../../types/Maybe";

/**
 * Get all of a users' comments.
 */
export const useComments = (
  address: Maybe<EthereumAddress>
): Array<Comment> => {
  const [comments, setComments] = useState<any>([]);
  const proposals = useGetProposals(snapshotSpace);

  useEffect(() => {
    address &&
      listenUserComments(address).then((comments: any) => {
        address &&
          proposals &&
          Promise.all(
            comments.map(async (comment: any) => {
              const proposal = proposals.find(
                (p: Proposal) => p.id === comment.proposalId
              );
              const [vote] = await fetchVote(comment.proposalId, address);
              return {
                author: comment.author,
                body: comment.body,
                proposalId: comment.proposalId,
                proposalTitle: proposal?.title,
                choice: proposal?.choices[comment.choice + 1],
                vp: vote?.vp,
                end: proposal?.end,
              };
            })
          ).then(setComments);
      });
  }, [address, proposals]);

  return comments;
};
