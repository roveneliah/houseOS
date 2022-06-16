import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import { dao, themes } from "../config";
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
import { useKrauseBalance } from "../hooks/ethereum/useKrauseBalance";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { NewUserFlow } from "./NewUserFlow";

const useCreateProfile = () => {
  const user = useGetUserProfile();
  const { isConnected } = useConnect();
  const address = useUserAddress();
  const [newUser, setNewUser] = useState<boolean>(false);

  useEffect(() => {
    const newbie = user && !user.loading && !user.name;
    if (isConnected && newbie && address) {
      setNewUser(true);
    } else setNewUser(false);
  }, [user, isConnected, user?.name]);

  return newUser;
};

export default function Layout({
  children,
  paletteStartsOpen = false,
  fixedOpen = false,
  noOpacity = false,
}: {
  children?: ReactNode;
  paletteStartsOpen?: boolean;
  fixedOpen?: boolean;
  noOpacity?: boolean;
}) {
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const themeName = themes[themeIndex]?.toString();
  const commands: Array<Command> = useGetCommands();

  const address = useUserAddress();
  const krauseBalance = useKrauseBalance(address);
  const user = useGetUserProfile();
  const newUserFlow = useCreateProfile();

  const { connect, connectors, isConnected } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const connector = connectors[1];

  const [isOpen, setIsOpen] = useState<boolean>(paletteStartsOpen);
  const open = isOpen || fixedOpen;

  return (
    <div data-theme={themeName} className="min-h-screen">
      <Head>
        <title>{dao.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CommandPalette
        commands={commands}
        isOpen={open}
        setIsOpen={setIsOpen}
        noOpacity={noOpacity}
        deactivated={newUserFlow}
      />
      <main className="flex min-h-[100vh] w-full flex-1 flex-col items-start justify-start bg-gray-500 pb-20">
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
            <button
              className="btn btn-outline flex flex-row space-x-2"
              onClick={() => {
                console.log("Yo");
                setIsOpen(!isOpen);
              }}
            >
              <div className="">
                <SearchIcon />
              </div>
              <p className="">⌘k</p>
            </button>
          </div>
        </div>
        {newUserFlow ? <NewUserFlow /> : children}
      </main>
    </div>
  );
}
