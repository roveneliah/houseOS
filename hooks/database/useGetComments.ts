import { useEffect, useState } from "react";
import { Comment } from "../../types/Comment";
import { listenComments } from "../../utils/firebase/post";
import { useGetVotes } from "../snapshot/useGetVotes";

export const useGetComments = (proposalId: string): Array<Comment> => {
  const [res, setRes] = useState<any>([]);
  const votes = useGetVotes(proposalId);

  useEffect(() => {
    listenComments(proposalId, (comments: Array<Comment>) =>
      setRes(
        comments.map((comment: any) => ({
          ...comment,
          vp: votes.find(({ voter }) => voter === comment.author)?.vp,
        }))
      )
    );
  }, [proposalId, votes]);
  return res;
};
