import { useState } from "react";
import { dao, defaultAvatar } from "../config";
import { createUser } from "../utils/firebase/user";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useGetAllUserTags } from "../hooks/tags/useGetAllUserTags";
import { useRouter } from "next/router";
import { useCommand } from "../hooks/generic/useCommand";
import { useSignIn } from "../hooks/useSignIn";
import { Maybe } from "../types/Maybe";
import Link from "next/link";
import Image from "next/image";
import TagsList from "./profiles/TagsList";
import { ChatIcon } from "./icons/ChatIcon";
import UsersIcon from "./icons/UsersIcon";
import LinkIcon from "./icons/LinkIcon";

export default function NewUserFlow() {
  const [name, setName] = useState<Maybe<string>>();
  const address = useUserAddress();
  const allTags = useGetAllUserTags(address);
  const router = useRouter();
  const [task1a, setTask1a] = useState<boolean>(false);
  const [task1b, setTask1b] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  useCommand("k", () => setTask1a(true));
  useCommand("ArrowRight", () => setTask1b(true));

  const { signedIn } = useSignIn();

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

  return !signedIn ? (
    <div className="flex h-[60vh] w-full flex-row items-center justify-center pt-36">
      <p className="text-3xl font-semibold">Please sign in.</p>
    </div>
  ) : (
    <div className="flex w-full flex-row justify-center ">
      <div className="w-[60vw] pt-36">
        {step === 0 && (
          <div className="text-primary-content flex w-full flex-col space-y-8 rounded-lg border py-10 px-8">
            <h1 className="text-primary-content border-primary-content w-fit rounded-full border px-3 py-1 text-lg font-semibold">
              The Portal
            </h1>
            <div className="flex flex-col space-y-2 border-l py-4 pl-4">
              <p className="text-xl font-normal">
                The Portal is your, uh, portal around the DAO.
              </p>
              <div className="flex flex-col space-y-2">
                <p className="text-md font-normal">
                  You can search anything you need there.
                </p>
                <ul className="space-y-1 pl-3 pt-1 font-semibold">
                  <li>
                    <div className="flex flex-row items-center space-x-2">
                      <ChatIcon />
                      <p>Proposals</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-row items-center space-x-2">
                      <UsersIcon />
                      <p>Users</p>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-row items-center space-x-2">
                      <LinkIcon />
                      <p>Links</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {!(task1a && task1b) && (
              <>
                <div className="flex flex-row justify-start space-x-2">
                  <input
                    type="checkbox"
                    checked={task1a}
                    className="checkbox bg-gray-200"
                  />
                  <p className="text-md">
                    Open up the Command Palette with{" "}
                    <span className="bg-primary-content text-neutral mx-1 cursor-none rounded-lg px-2 py-1">
                      ⌘k
                    </span>{" "}
                    or{" "}
                    <span className="bg-primary-content text-neutral mx-1 cursor-none rounded-lg px-2 py-1">
                      {" "}
                      ctrl k
                    </span>
                  </p>
                </div>
                <div className="flex flex-row justify-start space-x-2">
                  <input
                    type="checkbox"
                    checked={task1b}
                    className="checkbox bg-gray-200"
                  />
                  <p className="text-md">
                    Use{" "}
                    <span className="bg-primary-content text-neutral mx-1 cursor-none rounded-lg px-2 py-1">
                      ⌘→
                    </span>{" "}
                    and{" "}
                    <span className="bg-primary-content text-neutral mx-1 cursor-none rounded-lg px-2 py-1">
                      ⌘←
                    </span>{" "}
                    to switch between filters.
                  </p>
                </div>
              </>
            )}
            {task1a && task1b && (
              <button
                className="btn btn-outline text-primary-content w-fit"
                onClick={() => setStep(1)}
              >
                Next
              </button>
            )}
          </div>
        )}
        {step === 1 && (
          <div className="flex w-[60-vw] flex-col space-y-4">
            <div className="text-primary-content flex flex-row items-center space-x-4">
              <h1 className="text-md w-fit rounded-full border px-3 py-1 font-semibold">
                Tags
              </h1>
              <p className="text-xl">Choose some tags to describe yourself.</p>
            </div>
            <div className="alert flex flex-row items-start justify-start shadow-lg">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-shrink-0 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-col items-start justify-start">
                <span className="text-lg font-semibold">
                  Tags let the DAO label data (people, proposals, etc.) in a
                  decentralized way.
                </span>
                <div className="flex flex-col border-l px-4">
                  <span>1. You can tag other users and proposals.</span>
                  <span>2. You use the tags of anyone you follow.</span>
                </div>
                {/* <span>Read more here.</span> */}
              </div>
            </div>

            <div className="bg-primary-content flex flex-col space-y-4 rounded-lg p-4">
              <div className="flex w-full flex-row items-baseline justify-between overflow-hidden rounded-lg">
                <div className="flex w-full flex-row items-start space-x-4 bg-gray-200 px-6 py-4">
                  <Link href={`/profiles/${address}`}>
                    <Image
                      src={defaultAvatar}
                      width={80}
                      height={80}
                      className="cursor-pointer rounded-full"
                    />
                  </Link>
                  <div className="flex w-full flex-col items-start justify-center space-y-2">
                    <div className="text-neutral flex w-full flex-row items-baseline justify-between space-x-2">
                      <p className="text-lg font-semibold">You</p>
                      <p className="border-neutral rounded-full border px-3 py-1 text-sm">
                        {address?.slice(0, 6)}..
                      </p>
                    </div>
                    <TagsList
                      tags={selectedTags.map((tag) => ({
                        tag,
                        taggers: [address],
                        toggle: () => {},
                      }))}
                      disabled={true}
                      numbered={false}
                      size={"sm"}
                      theme="dark"
                    />
                  </div>
                </div>
              </div>{" "}
              <div className="border-1 bg-primary-content flex flex-col flex-wrap justify-start space-y-0 overflow-auto rounded-lg">
                {demoTags.map(
                  ({ tag, taggers, toggle, description }: any, i: number) => (
                    <div
                      className="bg-primary-content flex w-full cursor-pointer flex-col space-y-0 border-t p-1 px-2"
                      key={i}
                      onClick={toggle}
                    >
                      <div className="group flex w-full flex-row justify-start space-x-2 py-2 px-2">
                        <div className="flex w-full flex-row  items-center justify-start space-x-0">
                          <div className="flex w-1/4 flex-row items-center space-x-4 overflow-hidden">
                            <div className="flex flex-row space-x-2">
                              <div onClick={toggle}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-6 w-6 ${
                                    selectedTags.includes(tag)
                                      ? "text-neutral"
                                      : `${
                                          signedIn && "hover:text-neutral"
                                        } text-gray-200`
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={1.5}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>

                            <p
                              className={`text-md whitespace-nowrap text-gray-900 ${
                                i < 3 && taggers.length > 0
                                  ? "font-bold"
                                  : "font-normal"
                              }`}
                            >
                              {tag}
                            </p>
                          </div>
                          <div className="flex w-2/3 flex-row items-center justify-between">
                            <p className="text-ellipsis whitespace-nowrap  px-2 text-left text-sm font-normal text-gray-700 lg:flex">
                              {description}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="group flex flex-row items-center space-x-2">
                      <div className="flex flex-row -space-x-2">
                        {taggers.map((tagger: string, i: number) => (
                          <div className={"rounded-full bg-black p-1"}>
                            .....
                          </div>
                        ))}
                      </div>
                      <p className="invisible text-gray-800 group-hover:visible">
                        Greg
                      </p>
                    </div> */}
                    </div>
                  )
                )}
              </div>
            </div>

            {task2 && (
              <button
                className="btn btn-outline w-fit"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="flex w-full flex-col space-y-8">
            <div
              className={`flex w-full flex-row items-baseline justify-between overflow-hidden rounded-lg`}
            >
              <div className="flex w-full flex-row items-start space-x-4 bg-gray-200 px-6 py-6">
                <Link href={`/profiles/${address}`}>
                  <Image
                    src={defaultAvatar}
                    width={80}
                    height={80}
                    className="cursor-pointer rounded-full"
                  />
                </Link>
                <div className="flex w-full flex-col items-start justify-center space-y-2">
                  <div className="flex w-full flex-row items-center justify-between space-x-2">
                    <p className="text-neutral text-lg font-semibold">
                      {name || "You"}
                    </p>
                    <p className="border-neutral text-neutral rounded-full border px-3 py-1 text-sm">
                      {address?.slice(0, 6)}..
                    </p>
                  </div>
                  <TagsList
                    tags={selectedTags.map((tag) => ({
                      tag,
                      taggers: [address],
                      toggle: () => {},
                    }))}
                    disabled={true}
                    numbered={false}
                    theme={"dark"}
                    size="sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col space-y-4 ">
              <h1 className="text-xl font-semibold">
                Let's finish setting up your profile.
              </h1>
              <div className="flex w-full flex-row space-x-2">
                <p className="whitespace-nowrap text-lg font-semibold">
                  What's your name?
                </p>
                <input
                  className="text-md w-full border-b bg-transparent outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {name && name.length > 2 && (
                <button
                  className="btn btn-outline w-fit"
                  onClick={() => {
                    signedIn &&
                      address &&
                      createUser(address, name, selectedTags);
                    router.push("/me");
                  }}
                >
                  Create Profile
                </button>
              )}
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
