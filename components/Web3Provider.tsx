import { WagmiConfig } from "wagmi";
import { ReactNode } from "react";
import { useWagmiClient } from "./useWagmiClient";
interface Props {
  children: ReactNode;
}

export default function Web3Provider({ children }: Props) {
  const client = useWagmiClient();
  return (
    <WagmiConfig client={client}>
      {/* <SelfIdProvider client={{ ceramic: "testnet-clay" }}> */}
      {children}
      {/* </SelfIdProvider> */}
    </WagmiConfig>
  );
}
