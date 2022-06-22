import { configureChains, createClient, defaultChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "@wagmi/core";

// import { Provider as SelfIdProvider } from "@self.id/react";
export const useWagmiClient = () => {
  const { chains, provider, webSocketProvider } = configureChains(
    defaultChains,
    [alchemyProvider({ alchemyId: process.env.ALCHEMY_ID })]
  );

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
  return client;
};
