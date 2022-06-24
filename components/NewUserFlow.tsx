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
    <div className="flex w-full flex-row justify-center">
      <div className="flex min-h-[70vh] max-w-[50vw] flex-col space-y-8 pt-36">
        {step === 0 && (
          <>
            <h1 className="text-4xl font-bold">The Command Palette</h1>
            <div>
              <p className="text-lg font-semibold">
                The Command Palette is your portal around the DAO.
              </p>
              <p className="text-lg font-semibold">
                You can search anything you need there.
                {/* <ul className="pl-3 pt-1 font-normal">
                <li>• proposals</li>
                <li>• users</li>
                <li>• useful links</li>
              </ul> */}
              </p>
            </div>
            {!(task1a && task1b) && (
              <>
                <div className="flex flex-row justify-start space-x-2">
                  <input
                    type="checkbox"
                    checked={task1a}
                    className="checkbox bg-gray-200"
                  />
                  <p className="text-lg">
                    Open up the Command Palette{" ("}
                    <span className="cursor-none rounded-lg bg-gray-800 p-2 text-gray-400">
                      ⌘k
                    </span>{" "}
                    or{" "}
                    <span className="cursor-none rounded-lg bg-gray-800 p-2 text-gray-400">
                      {" "}
                      ctrl k
                    </span>
                    {")"}
                  </p>
                </div>
                <div className="flex flex-row justify-start space-x-2">
                  <input
                    type="checkbox"
                    checked={task1b}
                    className="checkbox bg-gray-200"
                  />
                  <p className="text-lg">
                    Use{" "}
                    <span className="cursor-none rounded-lg bg-gray-800 p-2 font-normal text-gray-400">
                      ⌘→
                    </span>{" "}
                    and{" "}
                    <span className="cursor-none rounded-lg bg-gray-800 p-2 font-normal text-gray-400">
                      ⌘←
                    </span>{" "}
                    to switch between filters.
                  </p>
                </div>
              </>
            )}
            {task1a && task1b && (
              <button
                className="btn btn-outline w-fit"
                onClick={() => setStep(1)}
              >
                Next
              </button>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <h1 className="text-4xl font-semibold ">Tags</h1>
            <p className="text-lg">
              Users can tag other users and proposals. These get shared with
              their friends.
            </p>

            <div className="flex flex-col space-y-2">
              <p className="text-xl">Choose some tags to describe yourself.</p>
              <div
                className={`flex w-full flex-row items-baseline justify-between overflow-hidden rounded-lg`}
              >
                <div
                  className={`flex w-full flex-row items-start space-x-4 bg-gray-200 px-6 py-4`}
                >
                  <Link href={`/profiles/${address}`}>
                    <Image
                      src={defaultAvatar}
                      width={80}
                      height={80}
                      className="cursor-pointer rounded-full"
                    />
                  </Link>
                  <div className="flex w-full flex-col items-start justify-center space-y-2">
                    <div className="flex w-full flex-row items-baseline justify-between space-x-2">
                      <p className="text-lg font-semibold text-gray-700">
                        {dao.memberName}
                      </p>
                      <p className="badge badge-dark badge-sm">0x1234567</p>
                    </div>
                    <TagsList
                      tags={selectedTags.map((tag) => ({
                        tag,
                        taggers: [address],
                        toggle: () => {},
                      }))}
                      disabled={true}
                      numbered={false}
                    />
                  </div>
                </div>
              </div>{" "}
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
              <button
                className="btn btn-outline w-fit"
                onClick={() => setStep(2)}
              >
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
            <div
              className={`flex w-full flex-row items-baseline justify-between overflow-hidden rounded-lg`}
            >
              <div
                className={`flex w-full flex-row items-start space-x-4 bg-gray-200 px-6 py-4`}
              >
                <Link href={`/profiles/${address}`}>
                  <Image
                    src={defaultAvatar}
                    width={80}
                    height={80}
                    className="cursor-pointer rounded-full"
                  />
                </Link>
                <div className="flex w-full flex-col items-start justify-center space-y-2">
                  <div className="flex w-full flex-row items-baseline justify-between space-x-2">
                    <p className="text-lg font-semibold text-gray-700">
                      {name}
                    </p>
                    <p className="badge badge-dark badge-sm">0x1234567</p>
                  </div>
                  <TagsList
                    tags={selectedTags.map((tag) => ({
                      tag,
                      taggers: [address],
                      toggle: () => {},
                    }))}
                    disabled={true}
                    numbered={false}
                  />
                </div>
              </div>
            </div>

            <p className="text-lg font-semibold">What's your name?</p>
            <input
              className="border-b-2 bg-transparent text-xl outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          </>
        )}
      </div>
    </div>
  );
}
