import { useEffect, useState } from "react";
import { Proposal } from "../../types/Proposal";
import { fetchProposals } from "../../utils/fetchProposals";
import createHook from "../createHook";

// export const useGetProposals = createHook(fetchProposals);
export const useGetProposals = (snapshotSpace: string): Array<Proposal> => {
  const [proposals, setProposals] = useState([]);
  useEffect(() => {
    fetchProposals(snapshotSpace).then(setProposals);
  }, []);
  return proposals;
};
