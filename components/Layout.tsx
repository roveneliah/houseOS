import Head from "next/head";
import { ReactNode, useRef } from "react";
import { dao, snapshotSpace, snapshotUrl, themes } from "../config";
import { useGetCommands } from "../hooks/useGetCommands";
import { Command } from "../types/Command";
import { useConnect, useDisconnect, useEnsName } from "wagmi";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useSignIn } from "../hooks/useSignIn";
import { useIsNewUser } from "../hooks/useIsNewUser";
import dynamic from "next/dynamic";
import { useSIWE } from "@/hooks/useSIWE";
import { usePath } from "@/hooks/usePath";
import { useOnKeydown } from "@/hooks/generic/useOnKeydown";
import SignupModal from "./SignupModal";
import Image from "next/image";
import AppFrame from "./views/AppFrame";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { close, launch, toggle } from "@/redux/features/windows/windowsSlice";
import { useGetProposals } from "@/hooks/snapshot/useGetProposals";
import { compose, filter, length, prop, propEq } from "ramda";
import { Proposal, ProposalState } from "@/types/Proposal";
import XIcon from "./icons/XIcon";
import { useCycler } from "../hooks/generic/useCycler";
const SearchIcon = dynamic(() => import("./icons/SearchIcon"));
const CommandPalette = dynamic(() => import("./search/CommandPalette"));
import { filterActive } from "@/types/Proposal";
import NewUserFlow from "./NewUserFlow";
import { useAppLauncher } from "@/hooks/useAppLauncher";

interface Props {
  children?: ReactNode;
  fixedOpen?: boolean;
  noOpacity?: boolean;
}

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
  const {
    connect,
    connectors,
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
  } = useConnect();
  const address = useUserAddress();
  const { signOut, signIn, signedIn } = useSignIn();
  const { signedIn: signedInSIWE } = useSIWE();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const connector = connectors[1];

  // Redux hooks, window management
  const dispatch = useAppDispatch();
  const toggleSearch = () => dispatch(toggle({ windowName: "search" }));
  const { launchCreateProfile } = useAppLauncher();
  const searchOpen = useAppSelector((state) => state.windows.open.search);

  // TODO: should load a lot of this in via redux, and then get from app state
  const commands: Array<Command> = useGetCommands();
  const user = useGetUserProfile();
  const newUserFlow = useIsNewUser();
  const path = usePath();
  const proposals = useGetProposals(snapshotSpace);
  const countActive = length(filterActive(proposals));
  const date = new Date();

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

      <main className="bg-base-200 no-scrollbar flex max-h-screen min-h-screen w-full flex-1 flex-col items-center justify-start overflow-x-auto sm:max-h-0">
        <CommandPalette
          commands={commands}
          noOpacity={noOpacity}
          fixedOpen={fixedOpen}
        />
        <div className="border-base-content bg-base-200 fixed z-50 flex w-full flex-row items-center justify-between overflow-hidden border-b px-4 py-2 sm:bottom-auto sm:top-0 sm:z-10 sm:p-0">
          <div className="flex px-4 sm:hidden">
            <a href="/">
              <Image src="/initials.svg" height={40} width={30} />
            </a>
          </div>
          <div className="breadcrumbs text-base-content hidden self-center px-4 font-mono sm:flex">
            <ul>
              <li className="relative h-[3vh] w-[2vw]">
                <a href="/">
                  <Image src="/initials.svg" layout="fill" />
                </a>
              </li>
              {path.map(({ pathSlice, route }, i) => (
                <li key={i}>
                  <a href={route} key={i}>
                    {pathSlice == "" ? "Desktop" : pathSlice.slice(0, 10)}
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
          <div className="hidden flex-row items-center space-x-4 px-4 sm:flex">
            <>
              {!signedIn ? (
                !isConnected ? (
                  isReconnecting ? (
                    <button className="btn btn-sm loading rounded-md border-black bg-transparent font-normal hover:bg-transparent">
                      Reconnecting
                    </button>
                  ) : (
                    <button
                      onClick={() => connect(connector)}
                      className="btn btn-sm rounded-md border-black bg-transparent font-normal hover:bg-transparent"
                    >
                      Connect
                    </button>
                  )
                ) : !signedInSIWE ? (
                  <button
                    onClick={() => signIn()}
                    className="btn btn-sm rounded-md border-black bg-transparent font-normal hover:bg-transparent"
                  >
                    Sign in with Ethereum
                  </button>
                ) : (
                  <button className="btn btn-sm loading rounded-md border-black bg-transparent font-normal hover:bg-transparent">
                    Signing in with Ethereum...
                  </button>
                )
              ) : !newUserFlow ? (
                <button
                  className="btn btn-sm group rounded-md border-black bg-transparent font-normal hover:bg-transparent"
                  onClick={() => {
                    signOut();
                    disconnect();
                    connect();
                  }}
                >
                  <p className="loading block rounded-md group-hover:hidden">
                    {user?.name ?? "Loading Profile"}
                  </p>
                  <p className="hidden rounded-md group-hover:block">
                    Disconnect
                  </p>
                </button>
              ) : (
                <button
                  onClick={launchCreateProfile}
                  className="border-base-content rounded-md border px-3 py-1 text-sm"
                >
                  Create Profile
                </button>
              )}
            </>
            <button className="hidden font-mono text-sm sm:flex">
              {date.toDateString()}
            </button>

            <button
              className={`group hidden flex-row space-x-2 border-black bg-transparent hover:bg-transparent sm:flex`}
              onClick={!searchOpen ? toggleSearch : () => {}}
            >
              <div className={`rounded-md pr-2  pl-3 pb-1 pt-2`}>
                <SearchIcon />
              </div>
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
