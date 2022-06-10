import { pickRandom } from "../../utils/pickRandom";

export const useGetProposalTags = (proposalId: string) =>
  pickRandom(2)([
    "Compensation",
    "Ball Hogs",
    "Big3",
    "Community",
    "Full-Time",
    "Project",
    "Investment",
    "Treasury",
  ]);
