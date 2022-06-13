import { useEffect, useState } from "react";
import { Comment } from "../../types/Comment";
import { listenComments } from "../../utils/firebase/post";

export const useGetComments = (proposalId: string): Array<Comment> => {
  const [res, setRes] = useState<any>([]);
  useEffect(() => {
    listenComments(proposalId, setRes);
  }, []);
  return res;
};
