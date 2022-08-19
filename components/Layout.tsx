import Head from "next/head";
import { ReactNode, useEffect, useRef, useState } from "react";
import { dao, themes } from "../config";
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
import { useOnKeydown } from "@/hooks/generic/useCommand";
import SignupModal from "./SignupModal";
import Image from "next/image";
import AppFrame from "./views/AppFrame";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { close, launch } from "@/redux/features/windows/windowsSlice";
const SearchIcon = dynamic(() => import("./icons/SearchIcon"));
const CommandPalette = dynamic(() => import("./search/CommandPalette"));

export default function Layout({
  children,
  noOpacity = false,
  paletteStartsOpen = false,
  fixedOpen = false,
}: {
  children?: ReactNode;
  paletteStartsOpen?: boolean;
  fixedOpen?: boolean;
  noOpacity?: boolean;
}) {
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const themeName = themes[themeIndex]?.toString();
  const commands: Array<Command> = useGetCommands();
  useOnKeydown("[", () =>
    setThemeIndex((i) => (i + themes.length - 1) % themes.length)
  );
  useOnKeydown("]", () => setThemeIndex((i) => (i + 1) % themes.length));

  const address = useUserAddress();
  const user = useGetUserProfile();

  const {
    connect,
    connectors,
    isConnected,
    isDisconnected,
    isConnecting,
    isReconnecting,
  } = useConnect();
  const dispatch = useAppDispatch();

  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const connector = connectors[1];

  const toggleSearch = () =>
    dispatch({ type: "windows/toggle", payload: { windowName: "search" } });

  const { signOut, signIn, signedIn } = useSignIn();
  const { signedIn: signedInSIWE } = useSIWE();

  const newUserFlow = useIsNewUser();
  const path = usePath();

  const date = new Date();

  const welcomeMessage = useAppSelector((state) => state.windows.open.welcome);
  const help = useAppSelector((state) => state.windows.open.help);
  const searchOpen = useAppSelector((state) => state.windows.open.search);
  const closeWelcome = () => dispatch(close({ windowName: "welcome" }));

  const launchCreateProfile = () => dispatch(launch(<SignupModal />));

  return (
    <div data-theme={themeName} className="no-scrollbar min-h-screen font-mono">
      <Head>
        <title>House OS</title>
        {/* TODO: #11 customize in config */}
        <link rel="icon" href="/initials.svg" />
        <meta name={dao.description} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </Head>

      <main className="bg-base-200 no-scrollbar flex min-h-[100vh] w-full flex-1 flex-col items-center justify-start overflow-x-auto">
        <CommandPalette
          commands={commands}
          noOpacity={noOpacity}
          deactivated={newUserFlow}
        />
        <div className="border-base-content bg-base-200 fixed z-10 flex w-full flex-row items-center justify-between overflow-hidden border-b sm:bottom-auto sm:top-0 sm:px-0">
          <div className="breadcrumbs text-base-content self-center px-4 font-mono">
            <ul>
              {/* <li>{dao.name}</li> */}
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
          <div className="flex flex-row items-center space-x-4 px-4">
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
                className="border-base-content rounded-md border px-3 py-1"
              >
                Create Profile
              </button>
            )}
            <button
              className="group flex flex-row space-x-2 border-black bg-transparent hover:bg-transparent"
              onClick={toggleSearch}
            >
              <div
                className={`${
                  searchOpen == true && "bg-base-300"
                } rounded-md pr-2  pl-3 pb-1 pt-2
                `}
              >
                <SearchIcon />
              </div>
            </button>
            {/* <button className="font-mono text-sm">{date.toDateString()}</button> */}
          </div>
        </div>
        {welcomeMessage && (
          <div className="absolute">
            <AppFrame>
              <div className="flex flex-col space-y-4 p-4">
                <p className="font-mono font-bold">Welcome to House OS</p>
                <p className="font-mono">This is your map around the DAO</p>
                <div>
                  <p className="font-mono text-sm">
                    - Open <span className="font-bold">Search</span> with ctrl-k
                    or cmd-k.
                  </p>
                  <p className="font-mono text-sm">
                    - Find <span className="font-bold">quick links</span> on
                    your desktop.
                  </p>
                </div>
                {/* <p className="font-mono text-sm">By signing in, you can...</p>
              <div>
              <p className="font-mono text-sm">- Follow other Jerry's</p>
              <p className="font-mono text-sm">
              - Help the DAO by labeling proposals and users.
              </p>
            </div> */}
              </div>
            </AppFrame>
          </div>
        )}
        {help && (
          <div className="absolute">
            <AppFrame width={60}>
              <div className="flex flex-col space-y-4 p-4">
                <p className="font-mono font-bold">Help!</p>
                <p className="font-mono">This is your map around the DAO</p>
                <div>
                  <p className="font-mono text-sm">
                    - Open <span className="font-bold">Search</span> with ctrl-k
                    or cmd-k.
                  </p>
                  <p className="font-mono text-sm">
                    - Find <span className="font-bold">quick links</span> on
                    your desktop.
                  </p>
                </div>
              </div>
            </AppFrame>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
