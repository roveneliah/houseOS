import { Comment } from "../../types/Comment";
import { createHook } from "../createHook";
import { fetchVotes } from "../../utils/fetchVotes";

export const useGetVotes = (proposalId: string): Array<Comment> => {
  const votes = createHook(fetchVotes)(proposalId);

  return votes.map((vote: any) => ({
    ...vote,
    ...vote.metadata,
    author: vote.voter,
    src: "/flex.png",
  }));
};
