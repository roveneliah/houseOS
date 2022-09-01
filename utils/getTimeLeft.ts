import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { Proposal, ProposalState } from "../types/Proposal";

// TODO:
export const getTimeLeft = (proposal: Proposal): string => {
  // const timestamp = proposal.end;
  // const formattedTime = new Date(timestamp).toDateString();

  return proposal.state === ProposalState.Closed
    ? "Closed"
    : String(proposal.end);
};
