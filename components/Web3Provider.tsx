import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "@wagmi/core";
import { ReactNode } from "react";
import { Provider as SelfIdProvider } from "@self.id/react";

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

interface Props {
  children: ReactNode;
}

export default function Web3Provider({ children }: Props) {
  return (
    <WagmiConfig client={client}>
      <SelfIdProvider client={{ ceramic: "testnet-clay" }}>
        {children}
      </SelfIdProvider>
    </WagmiConfig>
  );
}
