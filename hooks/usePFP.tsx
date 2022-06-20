import { useEffect, useState } from "react";
import { getPfp } from "../utils/firebase/user";
import { useSIWE } from "./useSIWE";
import { EthereumAddress } from "../types/EthereumAddress";
import { Maybe } from "../types/Maybe";

export const usePFP = (address: Maybe<EthereumAddress>) => {
  const [pfpUrl, setPfpUrl] = useState<string>();
  const { signedIn } = useSIWE();
  useEffect(() => {
    if (signedIn && address) {
      console.log("trying to get at address: ", address);
      getPfp(address).then(setPfpUrl);
    }
  }, [address]);

  return [pfpUrl, setPfpUrl];
};
