import { useEffect, useState } from "react";
import { getPfp } from "../utils/firebase/user";
import { useSIWE } from "./useSIWE";
import { EthereumAddress } from "../types/EthereumAddress";
import { Maybe } from "../types/Maybe";

export const usePFP = (address: Maybe<EthereumAddress>) => {
  const [pfpUrl, setPfpUrl] = useState<any>();
  const { signedIn } = useSIWE();
  useEffect(() => {
    if (signedIn && address) {
      getPfp(address).then(setPfpUrl);
    }
  }, [address]);

  return [pfpUrl, setPfpUrl];
};
