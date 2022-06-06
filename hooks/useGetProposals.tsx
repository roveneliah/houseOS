import { useEffect, useState } from "react";
import { Proposal } from "../types/Proposal";
import { fetchProposals } from "../utils/fetchProposals";

// export const useGetProposals = (snapshotSpace: string): Array<Proposal> => {
//   const [proposals, setProposals] = useState([]);

//   useEffect(() => {
//     fetchProposals(snapshotSpace).then(setProposals);
//   }, []);

//   return proposals;
// };

// can i generate hooks from underlying functions programmatically instead of explicitly defining them?
export const createHook =
  (fn: Function): Function =>
  (param: any) => {
    const [state, setState] = useState([]);

    useEffect(() => {
      fn(param).then(setState);
    }, []);

    return state;
  };
export const useGetProposals = createHook(fetchProposals);
