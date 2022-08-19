import { useEffect, useState } from "react";
import { EthereumAddress } from "../../types/EthereumAddress";
import { fetchVote } from "../../utils/snapshot/fetchVote";

export const useGetVote = (proposalId: string, address: EthereumAddress) => {
  const [vote, setVote] = useState();

  useEffect(() => {
    fetchVote(proposalId, address).then(setVote);
  }, [proposalId, address]);

  return vote;
};
