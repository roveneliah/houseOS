import Head from "next/head";
import { ReactNode, useState } from "react";
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
  useProvider,
  useSigner,
  useWebSocketProvider,
} from "wagmi";
import Web3Provider from "./Web3Provider";
import { $KRAUSE, useGetBalanceOf } from "../hooks/useGetBalanceOf";
import SearchIcon from "./icons/SearchIcon";
import ConnectButton from "./CeramicConnectButton";
import { useViewerConnection } from "@self.id/framework";

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

  const { data: account } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address });
  const { data: ensName } = useEnsName({ address: account?.address });
  const {
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
    isConnected,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const connector = connectors[1];
  const krauseBalance = useGetBalanceOf({
    tokenAddress: $KRAUSE,
    address: account?.address,
  });
  const provider = useWebSocketProvider();
  const [connection, connectCeramic, disconnectCeramic] = useViewerConnection();

  return (
    <div data-theme={themeName} className="min-h-screen">
      <Head>
        <title>LFG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommandPalette commands={commands} startsOpen={paletteOpen} />
      <main className="flex h-[100vh] w-full flex-1 flex-col items-start justify-start bg-gray-500 bg-cover">
        <div className="fixed top-0 flex w-full flex-row justify-between">
          <div></div>
          <div className="flex flex-row space-x-2 p-4">
            <ConnectButton />
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
                    {ensName || account?.address?.slice(0, 9)}...
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
