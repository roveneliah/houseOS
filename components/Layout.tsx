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
import Link from "next/link";
import { usePath } from "@/hooks/usePath";
import { useCommand, useOnKeydown } from "@/hooks/generic/useCommand";
import SignupModal from "./SignupModal";
import Image from "next/image";
import AppFrame, { NotificationFrame } from "./AppFrame";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Footer } from "./Footer";
import { close } from "@/features/windows/windowsSlice";
const SearchIcon = dynamic(() => import("./icons/SearchIcon"));
const CommandPalette = dynamic(() => import("./CommandPalette"));

export default function Layout({
  children,
  paletteStartsOpen = false,
  fixedOpen = false,
  noOpacity = false,
  demo = false,
}: {
  children?: ReactNode;
  paletteStartsOpen?: boolean;
  fixedOpen?: boolean;
  noOpacity?: boolean;
  demo?: boolean;
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

  // TODO: handle FIXED OPEN behavior

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

  return (
    <div data-theme={themeName} className="no-scrollbar min-h-screen font-mono">
      <Head>
        <title>House OS</title>
        {/* TODO: #11 customize in config */}
        <link rel="icon" href="/initials.svg" />
        <meta name={dao.description} />
      </Head>

      <main className="bg-base-200 no-scrollbar flex min-h-[100vh] w-full flex-1 flex-col items-center justify-start overflow-x-auto">
        <CommandPalette
          commands={commands}
          noOpacity={noOpacity}
          deactivated={newUserFlow}
          demo={demo}
        />
        <div className="border-base-content bg-base-200 fixed top-0 z-10 flex w-full flex-row items-center justify-between overflow-hidden border-b">
          <div className="breadcrumbs text-base-content self-center px-4 font-mono">
            <ul>
              {/* <li>{dao.name}</li> */}
              <li className="relative h-[3vh] w-[2vw]">
                <a href="/">
                  <Image src="/initials.svg" layout="fill" />
                </a>
              </li>
              {path.map(({ pathSlice, route }, i) => (
                <Link href={route} key={i}>
                  <li>
                    <a>
                      {pathSlice == "" ? "Desktop" : pathSlice.slice(0, 10)}
                    </a>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex flex-row items-center space-x-4 px-4">
            {!signedIn ? (
              !isConnected ? (
                isReconnecting ? (
                  <button className="btn loading">Reconnecting</button>
                ) : (
                  <button onClick={() => connect(connector)} className="btn">
                    Connect
                  </button>
                )
              ) : !signedInSIWE ? (
                <button
                  onClick={() => signIn()}
                  className="btn btn-sm border-black bg-transparent font-normal hover:bg-transparent"
                >
                  Sign in with Ethereum
                </button>
              ) : (
                <button className="btn btn-sm loading">
                  Signing in with Ethereum...
                </button>
              )
            ) : !newUserFlow ? (
              <button
                className="btn btn-sm group"
                onClick={() => {
                  signOut();
                  disconnect();
                  connect();
                }}
              >
                <p className="loading block group-hover:hidden">
                  {user?.name ?? "Loading Profile"}
                </p>
                <p className="hidden group-hover:block">Disconnect</p>
              </button>
            ) : (
              <>
                <label className="btn btn-sm modal-btn" htmlFor="signup-modal">
                  <p>Create Profile</p>
                </label>
                <input
                  type="checkbox"
                  id="signup-modal"
                  className="modal-toggle"
                />

                <label htmlFor="signup-modal" className="modal cursor-pointer">
                  <div className="w-[60vw]">
                    <label className="relative" htmlFor="">
                      <SignupModal />
                    </label>
                  </div>
                </label>
              </>
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
              {/* <p className="flex font-normal">Search</p> */}
              {/* <p className="flex font-normal">⌘k</p> */}
            </button>
            {/* <button className="font-mono text-sm">{date.toDateString()}</button> */}
          </div>
        </div>
        {newUserFlow && <NotificationFrame message="Hi there" />}
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
