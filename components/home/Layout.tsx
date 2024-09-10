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
// import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { useUserAddress } from "../../hooks/ethereum/useUserAddress";
import { useSignIn } from "../../hooks/sign-in/useSignIn";
import { useIsNewUser } from "../../hooks/useIsNewUser";
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
  const { connect, connectors } = useConnect();
  const { address, isConnected, isReconnecting } = useAccount();

  // const address = useUserAddress();
  // const { signOut, signIn, signedIn } = useSignIn();
  const { signedIn, signIn, signOut } = useSIWE();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const connector = connectors[1];

  const displayName = useMemo(() => ensName || address, [ensName, address]);

  // Redux hooks, window management
  // const dispatch = useAppDispatch();
  // const toggleSearch = () => dispatch(toggle({ windowName: "search" }));
  // const { launchCreateProfile } = useAppLauncher();
  // const searchOpen = useAppSelector(
  //   (state: RootState) => state.windows.open.search
  // );

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
  const [treasuryEthBalance, setTreasuryEthBalance] = useState<string>("0");
  const [treasuryKrauseBalance, setTreasuryKrauseBalance] =
    useState<string>("0");
  const [treasurySeedBalance, setTreasurySeedBalance] = useState<string>("0");
  const [treasuryNftBalance, setTreasuryNftBalance] = useState<string>("0");

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

        const krauseContract = new ethers.Contract(
          KRAUSE_TOKEN_ADDRESS,
          erc20Abi,
          provider
        );
        const nftContract = new ethers.Contract(
          NFT_TICKET_ADDRESS,
          erc721Abi,
          provider
        );
        const krauseCourtPiecesContract = new ethers.Contract(
          KRAUSE_COURT_PIECES_ADDRESS,
          erc721Abi,
          provider
        );
        const seedContract = new ethers.Contract(
          SEED_TOKEN_ADDRESS,
          erc20Abi,
          provider
        );

        try {
          const [
            krauseBalance,
            nftBalance,
            krauseCourtPiecesBalance,
            treasuryEthBalance,
            treasuryKrauseBalance,
            treasurySeedBalance,
            treasuryNftBalance,
          ] = await Promise.all([
            fetchWithCache(`krause-${address}`, () =>
              retryFetch(() => krauseContract.balanceOf(address))
            ),
            fetchWithCache(`nft-${address}`, () =>
              retryFetch(() => nftContract.balanceOf(address))
            ),
            fetchWithCache(`krauseCourt-${address}`, () =>
              retryFetch(() => krauseCourtPiecesContract.balanceOf(address))
            ),
            fetchWithCache(`eth-${KRAUSEHOUSE_ETH_ADDRESS}`, () =>
              retryFetch(() =>
                provider
                  .getBalance(KRAUSEHOUSE_ETH_ADDRESS)
                  .then((balance) => ethers.utils.formatEther(balance))
              )
            ),
            fetchWithCache(`krause-${KRAUSEHOUSE_ETH_ADDRESS}`, () =>
              retryFetch(() =>
                krauseContract.balanceOf(KRAUSEHOUSE_ETH_ADDRESS)
              )
            ),
            fetchWithCache(`seed-${KRAUSEHOUSE_ETH_ADDRESS}`, () =>
              retryFetch(() => seedContract.balanceOf(KRAUSEHOUSE_ETH_ADDRESS))
            ),
            fetchWithCache(`nft-${KRAUSEHOUSE_ETH_ADDRESS}`, () =>
              retryFetch(() => nftContract.balanceOf(KRAUSEHOUSE_ETH_ADDRESS))
            ),
          ]);

          setKrauseBalance(
            parseFloat(ethers.utils.formatEther(krauseBalance)).toFixed(2)
          );
          setNftBalance(nftBalance.toString());
          setKrauseCourtPiecesBalance(krauseCourtPiecesBalance.toString());
          setTreasuryEthBalance(
            parseFloat(ethers.utils.formatEther(treasuryEthBalance)).toFixed(2)
          );
          setTreasuryKrauseBalance(
            parseFloat(ethers.utils.formatEther(treasuryKrauseBalance)).toFixed(
              2
            )
          );
          setTreasurySeedBalance(
            parseFloat(ethers.utils.formatEther(treasurySeedBalance)).toFixed(2)
          );
          setTreasuryNftBalance(treasuryNftBalance.toString());
        } catch (error) {
          console.error("Error fetching balances:", error);
          // Optionally, set an error state or show a notification to the user
        }
      }
    };

    fetchBalances();
  }, [address]);

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
          treasuryEthBalance={treasuryEthBalance}
          treasuryKrauseBalance={treasuryKrauseBalance}
          treasurySeedBalance={treasurySeedBalance}
          treasuryNftBalance={treasuryNftBalance}
        />
      )}
    </div>
  );
}
