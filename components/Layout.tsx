import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { dao, themes } from "../config";
import { useGetCommands } from "../hooks/useGetCommands";
import { Command } from "../types/Command";
import { useConnect, useDisconnect, useEnsName } from "wagmi";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useSignIn } from "../hooks/useSignIn";
import { useIsNewUser } from "../hooks/useIsNewUser";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { useSIWE } from "@/hooks/useSIWE";
import Link from "next/link";
import { usePath } from "@/hooks/usePath";
import { useFirebase } from "@/hooks/useFirebase";
import { useCommand, useOnKeydown } from "@/hooks/generic/useCommand";
import NewUserFlow from "./SignupModal";
import Image from "next/image";
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

  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const connector = connectors[1];

  const [isOpen, setIsOpen] = useState<boolean>(paletteStartsOpen);
  const open = isOpen || fixedOpen;

  const { signOut, signIn, signedIn } = useSignIn();
  const { signedIn: signedInSIWE } = useSIWE();

  const newUserFlow = useIsNewUser();
  const path = usePath();

  return (
    <div data-theme={themeName} className="no-scrollbar min-h-screen">
      <Head>
        <title>House OS</title>
        {/* TODO: #11 customize in config */}
        <link rel="icon" href="/initials.svg" />
        <meta name={dao.description} />
      </Head>

      <CommandPalette
        commands={commands}
        isOpen={open}
        setIsOpen={setIsOpen}
        noOpacity={noOpacity}
        deactivated={newUserFlow}
        demo={demo}
      />
      <main className="bg-base-200 no-scrollbar flex min-h-[100vh] w-full flex-1 flex-col items-center justify-start overflow-x-auto">
        <div className="fixed top-0 z-20 flex h-[8vh] w-full flex-row justify-between overflow-hidden">
          <div className="breadcrumbs text-base-content self-center p-4 px-6">
            <ul>
              {/* <li>{dao.name}</li> */}
              <li className="relative h-[5vh] w-[2vw]">
                <Image src="/initials.svg" layout="fill" />
              </li>
              {path.map(({ pathSlice, route }, i) => (
                <Link href={route} key={i}>
                  <li>
                    <a>{pathSlice.slice(0, 10)}</a>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex flex-row space-x-2 p-4">
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
                <button onClick={() => signIn()} className="btn">
                  Sign in with Ethereum
                </button>
              ) : (
                <button className="btn loading">
                  Signing in with Ethereum...
                </button>
              )
            ) : !newUserFlow ? (
              <button
                className="btn group"
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
                <label className="btn modal-btn" htmlFor="signup-modal">
                  <p>Create Profile</p>
                </label>
                <input
                  type="checkbox"
                  id="signup-modal"
                  className="modal-toggle"
                />

                <label htmlFor="signup-modal" className="modal cursor-pointer">
                  <div className="w-[70vw]">
                    <label className="relative" htmlFor="">
                      <NewUserFlow />
                    </label>
                  </div>
                </label>
              </>
            )}
            <button
              className="btn btn-active group flex flex-row space-x-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="">
                <SearchIcon />
              </div>
              {/* <p className="flex group-hover:hidden">Search</p> */}
              <p className="flex">⌘k</p>
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
