import { Proposal } from "../../types/Proposal";

export const useGetProposalStats = (proposal: Proposal) => {
  // want to add { percentage, votingPower } to proposal choices

  return {
    ...proposal,
    choices: proposal.choices.map((choice) => ({
      choice,
      percentage: "0%",
      votingPower: 0,
    })),
  };
};
