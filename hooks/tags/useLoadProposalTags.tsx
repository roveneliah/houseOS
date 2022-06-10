import { pickRandom } from "../../utils/pickRandom";

export const useGetProposalTags = (proposalId: string) =>
  pickRandom(0.2)([
    "Compensation",
    "Ball Hogs",
    "Big3",
    "Community",
    "Full-Time",
    "Project",
    "Investment",
    "Treasury",
  ]);
