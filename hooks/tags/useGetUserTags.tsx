import { pickRandom } from "../../utils/pickRandom";

export const useGetUserTags = (userId: string) => {
  return pickRandom(0.4)([
    "Steward",
    "Contributor",
    "Full-Time",
    "Media Team",
    "Dev Team",
    "Pig Pen",
  ]);
};
