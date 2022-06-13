import { Comment } from "../../types/Comment";
import { createHook } from "../createHook";
import { fetchVotes } from "../../utils/fetchVotes";

/**
 * Get votes for a proposal from Snapshot.
 * Originally designed to read metadata, for comment, but this does not work.
 */
const useFetchVotes = createHook(fetchVotes);
export const useGetVotes = (proposalId: string): Array<Comment> => {
  const votes = useFetchVotes(proposalId);
  return votes.map((vote: any) => ({
    author: vote.voter,
    src: "/flex.png",
    comment: vote.metadata?.comment,
    ...vote,
  }));
};
