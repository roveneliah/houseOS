import { useEffect, useState } from "react";
import { getPfp } from "../../utils/firebase/user";
import { EthereumAddress } from "../../types/EthereumAddress";
import { Maybe } from "../../types/Maybe";
import { useSIWE } from "../sign-in/useSIWE";

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
