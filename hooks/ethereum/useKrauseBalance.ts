import { $KRAUSE, useGetBalanceOf } from "./useGetBalanceOf";
import { EthereumAddress } from "../../types/EthereumAddress";
import { Maybe } from "../../types/Maybe";

export const useKrauseBalance = (
  address: Maybe<EthereumAddress>
): Maybe<string> => useGetBalanceOf({ tokenAddress: $KRAUSE, address });
