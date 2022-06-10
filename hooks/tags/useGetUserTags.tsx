import { pickRandom } from "../../utils/pickRandom";

export const useGetUserTags = (userId: string) => {
  return pickRandom(3)([
    "Steward",
    "Contributor",
    "Full-Time",
    "Media Team",
    "Dev Team",
    "Pig Pen",
  ]);
};
