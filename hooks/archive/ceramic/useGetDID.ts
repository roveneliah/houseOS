import { useClient } from "@self.id/framework";
import { useEffect, useState } from "react";
import { EthereumAddress } from "../../../types/EthereumAddress";

export const useGetDID = (address: EthereumAddress) => {
  const client = useClient();
  const [res, setRes] = useState<any>();
  useEffect(() => {
    client.getAccountDID(`eip155:1:${address}`).then(setRes);
  }, []);
  return res;
};
