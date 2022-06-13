import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { ProposalState } from "../../types/Proposal";

// TODO: #7 should not be a hook
export const useGetTimeLeft = (proposal: any): string => {
  // const timestamp = proposal.end;
  // const formattedTime = new Date(timestamp).toDateString();

  return proposal.state === ProposalState.Closed ? "Closed" : proposal.end;
};
