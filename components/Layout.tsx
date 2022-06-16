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
import { useGetAllUserTags } from "../hooks/tags/useGetAllUserTags";
import { Router, useRouter } from "next/router";
import { useCommand } from "../hooks/generic/useCommand";

const useCreateProfile = () => {
  const user = useGetUserProfile();
  const { isConnected } = useConnect();
  const address = useUserAddress();
  const [newUser, setNewUser] = useState<boolean>(false);

  useEffect(() => {
    const newbie = user && !user.loading && !user.name;
    if (isConnected && newbie && address) {
      console.log("Newbie account @", address);
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

  // useCreateProfile();

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

function NewUserFlow() {
  const [name, setName] = useState();
  const address = useUserAddress();
  const allTags = useGetAllUserTags(address);
  const router = useRouter();
  const [task1a, setTask1a] = useState<boolean>(false);
  const [task1b, setTask1b] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const task2 = selectedTags.length > 0;
  const demoTags = allTags.map((tag) => ({
    ...tag,
    toggle: () =>
      !selectedTags.includes(tag.tag)
        ? setSelectedTags((selectedTags) => selectedTags.concat(tag.tag))
        : setSelectedTags((selectedTags) =>
            selectedTags.filter((t) => t !== tag.tag)
          ),
  }));

  useCommand("k", () => setTask1a(true));
  useCommand("ArrowRight", () => setTask1b(true));

  return (
    <div className="flex min-h-[70vh] w-full flex-col justify-center space-y-8 px-72 pt-36">
      {step === 0 && (
        <>
          <h1 className="text-4xl font-bold">
            Welcome {name || dao.memberName}
          </h1>
          <p className="text-lg font-semibold">
            The Command Palette is your portal around the DAO. You can open it
            with
            <span className="text-gray-700"> ⌘k</span>,{" "}
            <span className="text-gray-700"> ctrl k</span>, or with the button
            at the top-right.
          </p>
          <p className="text-lg font-semibold">
            You can search anything you need there.
            <ul className="pl-3 pt-1">
              <li>• proposals</li>
              <li>• user profiles</li>
              <li>• informational resources</li>
              <li>• useful links</li>
            </ul>
          </p>
          <div className="flex flex-row justify-start space-x-2">
            <input
              type="checkbox"
              checked={task1a}
              className="checkbox bg-gray-200"
            />
            <p className="text-lg font-semibold">
              Open up the Command Palette and have a peek around (it's disabled,
              so you won't be able to navigate anywhere else)
            </p>
          </div>
          <div className="flex flex-row justify-start space-x-2">
            <input
              type="checkbox"
              checked={task1b}
              className="checkbox bg-gray-200"
            />
            <p className="text-lg font-semibold">
              Use the ⌘→ and ⌘← shortcut to switch between filters.
            </p>
          </div>
          {task1a && task1b && (
            <button className="badge badge-lg" onClick={() => setStep(1)}>
              Next
            </button>
          )}
        </>
      )}
      {step === 1 && (
        <>
          <h1 className="text-4xl font-semibold ">Tags</h1>
          <p className="text-lg font-semibold">
            Users are able to tag other users and proposals, which gets shared
            with their friends.
          </p>
          <p className="text-lg font-semibold">
            This gives us a decentralized, opt-in ability to sensemake as a
            community. If you dislike someone else's takes, don't follow them!
          </p>
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold">
              Choose some tags to describe yourself.
            </p>
            <div className="border-1 flex flex-row flex-wrap justify-start space-x-2 overflow-auto rounded-lg border  p-3">
              {demoTags.map(({ tag, toggle }: any, i: number) => (
                <p
                  className={`badge my-1 ${
                    selectedTags.includes(tag)
                      ? "badge-dark"
                      : "hover:bg-gray-400"
                  }`}
                  key={i}
                  onClick={toggle}
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
          {task2 && (
            <button className="badge badge-lg" onClick={() => setStep(2)}>
              Next
            </button>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <h1 className="text-4xl font-bold">
            Let's finish setting up your profile.
          </h1>
          <p className="text-lg font-semibold">What's your name?</p>
          <input
            className="border-b-2 bg-transparent text-xl outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name && name.length > 2 && (
            <button
              className="badge badge-lg"
              onClick={() => {
                createUser(address, name, selectedTags);
                router.push("/me");
              }}
            >
              Create Profile
            </button>
          )}
        </>
      )}
    </div>
  );
}
