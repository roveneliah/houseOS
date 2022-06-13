import { useEffect, useState } from "react";
import { listenProposalTags } from "../../utils/firebase/post";

export const useListenProposalTags = (proposalId: string) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    listenProposalTags(proposalId, setTags);
  }, []);
  return tags;
};
