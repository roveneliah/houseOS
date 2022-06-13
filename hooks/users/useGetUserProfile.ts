import { useViewerRecord } from "@self.id/framework";
import { useAccount } from "wagmi";
import { User } from "../../types/User";
import { recordToUser } from "../../utils/recordToUser";
import { useGetUser } from "../database/useGetUser";
import { useKrauseBalance } from "../ethereum/useKrauseBalance";

// CERAMIC
// export const useGetUserProfile = (): User => {
//   const record = useViewerRecord("basicProfile");
//   return recordToUser(record);
// };

export const useGetUserProfile = () => {
  const { data: account } = useAccount();
  const user = useGetUser(account?.address || "");

  const hodler = Number(useKrauseBalance(account?.address)) > 0;

  return {
    ...user,
    hodler,
    address: user.address,
    name: user.name,
  };
};
