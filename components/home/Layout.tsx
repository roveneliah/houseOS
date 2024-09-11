import Head from "next/head";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { dao, snapshotSpace, snapshotUrl, themes } from "../../config";
import { useGetCommands } from "../../hooks/useGetCommands";
import { Command } from "../../types/Command";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsName,
} from "wagmi";
import dynamic from "next/dynamic";
import { usePath } from "@/hooks/usePath";
import { useOnKeydown } from "@/hooks/generic/useOnKeydown";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { toggle } from "@/redux/features/windows/windowsSlice";
import { useGetProposals } from "@/hooks/snapshot";
import { length } from "ramda";
import { useCycler } from "../../hooks/generic/useCycler";
const SearchIcon = dynamic(() => import("../icons/SearchIcon"));
const CommandPalette = dynamic(() => import("../search/CommandPalette"));
import { filterActive } from "@/types/Proposal";
import { useAppLauncher } from "@/hooks/useAppLauncher";
import { RootState } from "@/redux/app/store";
import { useSIWE } from "@/hooks/sign-in/useSIWE";
const WalletSidebar = dynamic(() => import("../wallet/WalletSidebar"));
import { injected } from "wagmi/connectors";

import { ethers } from "ethers";

const KRAUSE_TOKEN_ADDRESS = "0x9f6f91078a5072a8b54695dafa2374ab3ccd603b";
const NFT_TICKET_ADDRESS = "0xc4e0f3ec24972c75df7c716922096f4270b7bb4e";
const KRAUSE_COURT_PIECES_ADDRESS =
  "0x591E13ed6C78c0dc715336947db818ddB85a6ffE";
const SEED_TOKEN_ADDRESS = "0xf76d80200226ac250665139b9e435617e4ba55f9";
const KRAUSEHOUSE_ETH_ADDRESS = "0xE4762eAcEbDb7585D32079fdcbA5Bb94eb5d76F2";

const ConnectButton = dynamic(() => import("../wallet/ConnectButton"));

interface Props {
  children?: ReactNode;
  fixedOpen?: boolean;
  noOpacity?: boolean;
}

// Create a single provider instance
const provider = new ethers.providers.InfuraProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_INFURA_KEY
);

// Simple cache implementation
const cache = new Map<string, { value: string; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute in milliseconds

const fetchWithCache = async (key: string, fetchFn: () => Promise<string>) => {
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.value;
  }
  const value = await fetchFn();
  cache.set(key, { value, timestamp: now });
  return value;
};

const retryFetch = async (
  fetchFn: () => Promise<string>,
  retries = 3
): Promise<string> => {
  try {
    return await fetchFn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
      return retryFetch(fetchFn, retries - 1);
    }
    throw error;
  }
};

const createContract = (address: string, abi: string[]) =>
  new ethers.Contract(address, abi, provider);

const formatBalance = (balance: ethers.BigNumber, decimals = 18) =>
  parseFloat(ethers.utils.formatUnits(balance, decimals)).toFixed(2);

const formatIntegerBalance = (balance: ethers.BigNumber) =>
  ethers.utils.formatUnits(balance, 0);

const fetchBalance = async (
  contract: ethers.Contract,
  method: string,
  address: string,
  formatAsInteger = false
) => {
  const balance = await contract[method](address);
  return formatAsInteger
    ? formatIntegerBalance(balance)
    : formatBalance(balance);
};

const fetchEthBalance = async (address: string) => {
  const balance = await provider.getBalance(address);
  return formatBalance(balance);
};

const createBalanceFetcher =
  (contract: ethers.Contract, method: string) => (address: string) =>
    fetchBalance(contract, method, address);

export default function Layout({
  children,
  noOpacity = false,
  fixedOpen = false,
}: Props) {
  // theme iteration, can cycle through themes by pressing "[" or "]"
  const { index: theme, nxt: nextTheme, prv: prevTheme } = useCycler(themes);
  const themeName = themes[theme]?.toString();
  useOnKeydown("[", prevTheme);
  useOnKeydown("]", nextTheme);

  // Connection hooks
  const { address, isConnected, isReconnecting } = useAccount();

  // const address = useUserAddress();
  // const { signOut, signIn, signedIn } = useSignIn();
  // const { signedIn, signIn, signOut } = useSIWE();
  const { disconnect } = useDisconnect();

  // Redux hooks, window management
  // const dispatch = useAppDispatch();
  // const toggleSearch = () => dispatch(toggle({ windowName: "search" }));
  // const { launchCreateProfile } = useAppLauncher();
  // const searchOpen = useAppSelector(
  //   (state: RootState) => state.windows.open.search
  // );

  const { data: ensName } = useEnsName({ address });
  const displayName = useMemo(
    () => ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`,
    [ensName, address]
  );

  // TODO: should load a lot of this in via redux, and then get from app state
  const commands: Array<Command> = useGetCommands();
  // const user = useGetUserProfile();
  // const newUserFlow = useIsNewUser();
  const path = usePath();
  const proposals = useGetProposals(snapshotSpace);
  const countActive = length(filterActive(proposals));
  // const date = new Date();

  const [isSidebarOpen, setIsSidebarOpen] = useState(isConnected);
  const [krauseBalance, setKrauseBalance] = useState<string>("0");
  const [nftBalance, setNftBalance] = useState<string>("0");
  const [krauseCourtPiecesBalance, setKrauseCourtPiecesBalance] =
    useState<string>("0");
  const [treasuryBalances, setTreasuryBalances] = useState({
    eth: "0",
    krause: "0",
    seed: "0",
    nft: "0",
  });

  useEffect(() => {
    if (isConnected) {
      setIsSidebarOpen(true);
    }
  }, [isConnected]);

  useEffect(() => {
    const fetchBalances = async () => {
      console.log("fetchBalances");
      if (address) {
        const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
        const erc721Abi = [
          "function balanceOf(address) view returns (uint256)",
        ];

        const krauseContract = createContract(KRAUSE_TOKEN_ADDRESS, erc20Abi);
        const nftContract = createContract(NFT_TICKET_ADDRESS, erc721Abi);
        const krauseCourtPiecesContract = createContract(
          KRAUSE_COURT_PIECES_ADDRESS,
          erc721Abi
        );

        const fetchKrauseBalance = createBalanceFetcher(
          krauseContract,
          "balanceOf"
        );
        const fetchNftBalance = (address: string) =>
          fetchBalance(nftContract, "balanceOf", address, true);
        const fetchKrauseCourtPiecesBalance = (address: string) =>
          fetchBalance(krauseCourtPiecesContract, "balanceOf", address, true);

        try {
          const [krauseBalance, nftBalance, krauseCourtPiecesBalance] =
            await Promise.all([
              fetchKrauseBalance(address),
              fetchNftBalance(address),
              fetchKrauseCourtPiecesBalance(address),
            ]);

          setKrauseBalance(krauseBalance);
          setNftBalance(nftBalance);
          setKrauseCourtPiecesBalance(krauseCourtPiecesBalance);
        } catch (error) {
          console.error("Error fetching balances:", error);
          // Optionally, set an error state or show a notification to the user
        }
      }
    };

    fetchBalances();
  }, [address]);

  useEffect(() => {
    const fetchTreasuryBalances = async () => {
      const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
      const erc721Abi = ["function balanceOf(address) view returns (uint256)"];

      const krauseContract = createContract(KRAUSE_TOKEN_ADDRESS, erc20Abi);
      const seedContract = createContract(SEED_TOKEN_ADDRESS, erc20Abi);
      const nftContract = createContract(NFT_TICKET_ADDRESS, erc721Abi);

      const fetchKrauseBalance = createBalanceFetcher(
        krauseContract,
        "balanceOf"
      );
      const fetchSeedBalance = createBalanceFetcher(seedContract, "balanceOf");
      const fetchNftBalance = (address: string) =>
        fetchBalance(nftContract, "balanceOf", address, true);

      try {
        const [eth, krause, seed, nft] = await Promise.all([
          fetchEthBalance(KRAUSEHOUSE_ETH_ADDRESS),
          fetchKrauseBalance(KRAUSEHOUSE_ETH_ADDRESS),
          fetchSeedBalance(KRAUSEHOUSE_ETH_ADDRESS),
          fetchNftBalance(KRAUSEHOUSE_ETH_ADDRESS),
        ]);

        setTreasuryBalances({ eth, krause, seed, nft });
      } catch (error) {
        console.error("Error fetching treasury balances:", error);
      }
    };

    fetchTreasuryBalances();
  }, []);

  return (
    <div data-theme={themeName} className="no-scrollbar min-h-screen font-mono">
      <Head>
        <title>House OS</title>
        {/* TODO: #11 customize in config */}
        <link rel="icon" href="/initials.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name={dao.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </Head>

      <main className="no-scrollbar flex max-h-screen min-h-screen w-full flex-1 flex-col items-center justify-start overflow-x-auto bg-base-200 sm:max-h-0">
        <CommandPalette
          commands={commands}
          noOpacity={noOpacity}
          fixedOpen={fixedOpen}
        />
        <div className="fixed z-50 flex w-full flex-row items-center justify-between overflow-hidden border-b border-base-content bg-base-200 px-4 py-2 sm:bottom-auto sm:top-0 sm:z-10 sm:p-0">
          <div className="flex px-4 sm:hidden">
            <a href="/">
              <Image
                alt="House OS"
                src="/initials.svg"
                height={40}
                width={30}
              />
            </a>
          </div>
          <div className="breadcrumbs hidden self-center px-4 font-mono text-base-content sm:flex">
            <ul>
              <li className="relative h-[3vh] w-[2vw]">
                <a href="/">
                  <Image alt="House OS" src="/initials.svg" layout="fill" />
                </a>
              </li>
              {path.map(({ pathSlice, route }, i) => (
                <li key={i}>
                  <a href={route} key={i}>
                    {pathSlice == "" ? "Owners' Box" : pathSlice.slice(0, 10)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {countActive > 0 && (
            <a href={snapshotUrl} target={"_blank"}>
              <div className="px-4 text-sm">{countActive} Live Proposals</div>
            </a>
          )}
          <ConnectButton />
        </div>
        {children}
      </main>
      {isSidebarOpen && (
        <WalletSidebar
          onClose={() => {
            setIsSidebarOpen(false);
            disconnect();
          }}
          address={address ?? null}
          krauseBalance={krauseBalance}
          nftBalance={nftBalance}
          krauseCourtPiecesBalance={krauseCourtPiecesBalance}
          treasuryEthBalance={treasuryBalances.eth}
          treasuryKrauseBalance={treasuryBalances.krause}
          treasurySeedBalance={treasuryBalances.seed}
          treasuryNftBalance={treasuryBalances.nft}
          displayName={displayName}
        />
      )}
    </div>
  );
}
