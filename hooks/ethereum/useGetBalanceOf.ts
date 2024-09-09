// import { erc20ABI, useContractRead } from "wagmi";
import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";
import { EthereumAddress } from "../../types/EthereumAddress";
import { Maybe } from "../../types/Maybe";

// TODO: move to config
export const $KRAUSE = "0x9f6f91078a5072a8b54695dafa2374ab3ccd603b";

export const useGetBalanceOf = ({
  tokenAddress,
  address,
  roundTo = 0,
}: {
  tokenAddress: EthereumAddress;
  address: Maybe<EthereumAddress>;
  roundTo?: number;
}) => {
  const {
    data: balance,
    isError,
    isLoading,
    error,
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    args: [address],
    functionName: "balanceOf",
  });
  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
  });

  const adjustment = 10 ** Number(decimals);
  const adjusted = Number(balance) / adjustment;
  return adjusted.toFixed(roundTo);
};
