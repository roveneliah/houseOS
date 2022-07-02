import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { dao, themes } from "../config";
import { useGetCommands } from "../hooks/useGetCommands";
import { Command } from "../types/Command";
import { useConnect, useDisconnect, useEnsName } from "wagmi";
import { useKrauseBalance } from "../hooks/ethereum/useKrauseBalance";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useSignIn } from "../hooks/useSignIn";
import { useIsNewUser } from "../hooks/useIsNewUser";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { useSIWE } from "@/hooks/useSIWE";
// import { useFirebase } from "@/hooks/useFirebase";
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

  const address = useUserAddress();
  const krauseBalance = useKrauseBalance(address);
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
  // const { signedIn: signedInFirebase } = useFirebase();

  const newUserFlow = useIsNewUser();
  const router = useRouter();
  useEffect(() => {
    newUserFlow && router.push("/signup"); // don't want to redirect again if i'm here...
  }, [newUserFlow]);

  return (
    <div data-theme={themeName} className="min-h-screen">
      <Head>
        <title>{dao.name}</title>
        {/* TODO: #11 customize in config */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="DAO Social Network" />
      </Head>

      <CommandPalette
        commands={commands}
        isOpen={open}
        setIsOpen={setIsOpen}
        noOpacity={noOpacity}
        deactivated={newUserFlow}
        demo={demo}
      />
      <main className="flex min-h-[100vh] w-full flex-1 flex-col items-center justify-start bg-gray-700">
        <div className="fixed top-0 z-20 flex w-full flex-row justify-between">
          <div className="flex flex-row items-center p-4">
            {/* <p className="text-2xl font-semibold">
              Krause House Command Center
            </p> */}
          </div>
          <div className="flex flex-row space-x-2 p-4">
            {!signedIn ? (
              !isConnected ? (
                <button
                  // disabled={!connector.ready}
                  onClick={() => connect(connector)}
                  className="btn btn-outline"
                >
                  Connect
                </button>
              ) : !signedInSIWE ? (
                <button
                  // disabled={!connector.ready}
                  onClick={() => signIn()}
                  className="btn btn-outline"
                >
                  Sign in with Ethereum
                </button>
              ) : (
                <button
                  // disabled={!connector.ready}
                  className="btn btn-outline"
                >
                  Loading
                </button>
              )
            ) : (
              <>
                <button className="btn btn-outline">
                  {krauseBalance} $KRAUSE
                </button>
                <button
                  className="btn btn-outline group "
                  onClick={() => {
                    disconnect();
                    signOut();
                  }}
                >
                  <p className="block group-hover:hidden">
                    {user?.name ?? "Loading"}
                  </p>
                  <p className="hidden group-hover:block">Disconnect</p>
                </button>
              </>
            )}
            <button
              className="btn btn-outline flex flex-row space-x-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="">
                <SearchIcon />
              </div>
              <p className="">⌘k</p>
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
