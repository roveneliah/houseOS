import { useViewerRecord } from "@self.id/framework";
import { User } from "../../types/User";
import { recordToUser } from "../../utils/recordToUser";

export const useGetUserProfile = (): User => {
  const record = useViewerRecord("basicProfile");
  return recordToUser(record);
};
