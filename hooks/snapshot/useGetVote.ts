import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { fetchVote } from "../../utils/snapshot/fetchVote";
import createHook from "../createHook";

// export const useGetVote = createHook(fetchVote);
export const useGetVote = (proposalId: string, voter: EthereumAddress) => {
  const [vote, setVote] = useState();

  useEffect(() => {
    fetchVote({ proposalId, voter }).then(setVote);
  }, [proposalId, voter]);

  return vote;
};
