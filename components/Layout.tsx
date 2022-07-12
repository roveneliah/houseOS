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
import { capitalize } from "./ProposalHeader";
import Link from "next/link";
// import { useFirebase } from "@/hooks/useFirebase";
const SearchIcon = dynamic(() => import("./icons/SearchIcon"));
const CommandPalette = dynamic(() => import("./CommandPalette"));

const usePath = (): Array<any> => {
  const { asPath: route } = useRouter();

  const path = route
    .split("/")
    .slice(1)
    .map(capitalize)
    .map((pathSlice: string, i: number) => ({
      pathSlice,
      route: route
        .split("/")
        .slice(0, i + 2)
        .join("/"),
    }));

  return path;
};

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
  const path = usePath();
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
      <main className="bg-base-300 flex min-h-[100vh] w-full flex-1 flex-col items-center justify-start">
        <div className="fixed top-0 z-20 flex w-full flex-row justify-between">
          <div className="breadcrumbs self-center p-4 px-6">
            <ul>
              <li>
                <a>Krause House</a>
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
                <button
                  // disabled={!connector.ready}
                  onClick={() => connect(connector)}
                  className="btn"
                >
                  Connect
                </button>
              ) : !signedInSIWE ? (
                <button
                  // disabled={!connector.ready}
                  onClick={() => signIn()}
                  className="btn"
                >
                  Sign in with Ethereum
                </button>
              ) : (
                <button
                  // disabled={!connector.ready}
                  className="btn loading"
                >
                  Loading
                </button>
              )
            ) : (
              <>
                <button className="btn">{krauseBalance} $KRAUSE</button>
                <button
                  className="btn group"
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
              className="btn btn-active flex flex-row space-x-2"
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
