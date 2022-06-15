import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { themes } from "../config";
import { useGetCommands } from "../hooks/useGetCommands";
import CommandPalette from "./CommandPalette";
import { Command } from "../types/Command";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import SearchIcon from "./icons/SearchIcon";
import CeramicConnectButton from "./CeramicConnectButton";
import { useViewerConnection } from "@self.id/framework";
import { useKrauseBalance } from "../hooks/ethereum/useKrauseBalance";

import {
  populateComments,
  populateUsers,
} from "../utils/firebase/testing/populate";
import { tagProposal } from "../utils/firebase/post";
import { useTagUser } from "../hooks/database/useTagUser";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import { createUser } from "../utils/firebase/user";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";

const useCreateProfile = () => {
  const user = useGetUserProfile();
  const { isConnected } = useConnect();
  const address = useUserAddress();

  useEffect(() => {
    const newUser = user && !user.loading && user.name;
    if (isConnected && newUser && address) {
      console.log("Creating account @", address);
      createUser(address);
    }
  }, [user, isConnected]);
};

export default function Layout({
  children,
  paletteOpen = false,
}: {
  children?: ReactNode;
  paletteOpen?: boolean;
}) {
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const themeName = themes[themeIndex]?.toString();
  const commands: Array<Command> = useGetCommands();
  const address = useUserAddress();
  const krauseBalance = useKrauseBalance(address);
  const user = useGetUserProfile();
  useCreateProfile();

  const { connect, connectors, isConnected } = useConnect();
  const { disconnect } = useDisconnect();
  const connector = connectors[1];

  const tagUser = useTagUser();

  const { data: ensName } = useEnsName({ address });

  return (
    <div data-theme={themeName} className="min-h-screen">
      <Head>
        <title>LFG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommandPalette commands={commands} startsOpen={paletteOpen} />
      <main className="flex h-[100vh] w-full flex-1 flex-col items-start justify-start bg-gray-500">
        <div className="fixed top-0 flex w-full flex-row justify-between">
          <div>
            {/* <button
              className="btn btn-accent"
              onClick={() => populateComments()}
            >
              Populate Comments
            </button>
            <button className="btn btn-accent" onClick={() => populateUsers()}>
              Populate Users
            </button>
            <button
              className="btn btn-accent"
              onClick={() =>
                tagProposal(
                  "",
                  "Big3",
                  "0x234"
                )
              }
            >
              Tag
            </button>
            <button
              className="btn btn-accent"
              onClick={() =>
                tagUser("", "SOI")
              }
            >
              Tag User
            </button> */}
          </div>
          <div className="flex flex-row space-x-2 p-4">
            {/* <CeramicConnectButton /> */}
            {!isConnected ? (
              <button
                // disabled={!connector.ready}
                onClick={() => {
                  connect(connector);
                }}
                className="btn btn-outline"
              >
                Connect
              </button>
            ) : (
              <>
                <button className="btn btn-outline">
                  {krauseBalance} $KRAUSE
                </button>
                <button
                  className="btn btn-outline group "
                  onClick={() => {
                    disconnect();
                  }}
                >
                  <p className="block group-hover:hidden">
                    {user?.name ||
                      ensName ||
                      address?.slice(0, 9).concat("...")}
                  </p>
                  <p className="hidden group-hover:block">Disconnect</p>
                </button>
              </>
            )}
            <button className="btn btn-outline group" onClick={() => {}}>
              <p className="hidden group-hover:block">⌘k</p>
              <div className="block group-hover:hidden">
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
