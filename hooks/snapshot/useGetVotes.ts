import createHook from "../createHook";
import { useEffect, useState } from "react";
import { fetchVotes } from "@/utils/snapshot/fetchVotes";

/**
 * Get votes for a proposal from Snapshot.
 * Originally designed to read metadata, for comment, but this does not work.
 */
const useFetchVotes = createHook(fetchVotes);
export const useGetVotes = (proposalId: string): Array<any> => {
  const votes = useFetchVotes(proposalId);
  const [labeledVotes, setLabeledVotes] = useState([]);

  useEffect(() => {
    setLabeledVotes(
      votes.map((vote: any) => ({
        author: vote.voter,
        src: "/flex.png",
        comment: vote.metadata?.comment,
        ...vote,
      }))
    );
  }, [votes]);

  return labeledVotes;
};
