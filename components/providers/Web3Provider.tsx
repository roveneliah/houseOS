import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, projectId } from "@/config/walletConnect";
import { WagmiProvider } from "wagmi";

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// });

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  // enableAnalytics: true, // Optional - defaults to your Cloud configuration
  // enableOnramp: true, // Optional - false as default
});

export default function Web3Provider({ children }) {
  // const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
