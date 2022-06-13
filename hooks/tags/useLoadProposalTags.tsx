import { useEffect, useState } from "react";
import { getProposalTags } from "../../utils/firebase/post";

export const useGetProposalTags = (proposalId: string) => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getProposalTags(proposalId, setTags);
  }, []);
  return tags;
};
