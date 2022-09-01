import { useState } from "react";
import { dao, defaultAvatar, userTags } from "../config";
import { createUser } from "../utils/firebase/user";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useRouter } from "next/router";
import { useSignIn } from "../hooks/useSignIn";
import { Maybe } from "../types/Maybe";
import { concat, filter, mergeRight } from "ramda";

export default function SignupModal() {
  const address = useUserAddress();
  const router = useRouter();
  const { signedIn } = useSignIn();

  const [name, setName] = useState<Maybe<string>>();
  const [twitter, setTwitter] = useState<Maybe<string>>();
  const [email, setEmail] = useState<Maybe<string>>();
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  const demoTags = userTags.map(({ name, description }) => ({
    tag: name,
    description,
    taggers: [],
    toggle: () =>
      !selectedTags.includes(name)
        ? setSelectedTags((state) => concat(state)([name]))
        : setSelectedTags(filter((t) => t !== name)),
  }));

  return !signedIn ? (
    <div className="flex h-[60vh] w-full flex-row items-center justify-center pt-36">
      <p className="text-3xl font-semibold">Please sign in.</p>
    </div>
  ) : (
    <div className="text-base-content z-50 flex w-full flex-row justify-center">
      <div className="flex w-full flex-row space-x-4">
        <div className="bg-base-200 flex w-full flex-col space-y-8 rounded-lg p-8">
          <div className="flex h-fit flex-row items-center justify-between">
            <p className="text-3xl font-semibold">Create Profile</p>
            <button
              className={`${
                name && name.length > 2 ? "visible" : "invisible"
              } border-base-content w-fit rounded-md border px-3 py-1`}
              onClick={() => {
                signedIn &&
                  address &&
                  name &&
                  createUser({
                    address,
                    name,
                    tags: selectedTags,
                    twitter,
                    email,
                  });
                // router.push("/me");
              }}
            >
              Create Profile
            </button>
          </div>
          <div className="flex w-full flex-col items-start justify-start space-y-4">
            {/* <h1 className="text-md text-neutral border-neutral w-fit rounded-full border px-3 py-1 font-semibold">
              Profile
            </h1> */}
            <div className="text-base-content/50 flex w-full flex-col space-y-4 ">
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Username</p>
                <input
                  className="text-md text-base-content/75 w-full rounded-lg border-b bg-black/10 p-2 outline-none"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Twitter (optional)</p>
                <input
                  className="text-md text-base-content/75 w-full rounded-lg border-b bg-black/10 p-2 outline-none"
                  value={`@${twitter || ""}`}
                  onChange={(e) => setTwitter(e.target.value.slice(1))}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Email (optional)</p>
                <input
                  className="text-md text-base-content/75 w-full rounded-lg border-b bg-black/10 p-2 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="bg-base-100 flex flex-col space-y-0 rounded-lg">
            <div>
              <div className=" flex flex-row items-center space-x-4 p-4">
                <h1 className="text-md text-base-content/75 w-fit rounded-full font-semibold">
                  Tags
                </h1>
                <p className="text-md text-base-content/50">
                  Choose some tags to describe yourself.
                </p>
              </div>
            </div>
            <div className="border-1 flex flex-col flex-wrap justify-start space-y-0 overflow-auto rounded-lg">
              {demoTags.map(
                ({ tag, taggers, toggle, description }: any, i: number) => (
                  <div
                    className="flex w-full cursor-pointer flex-col space-y-0 border-t p-1 px-2"
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
                                    ? "text-base-content"
                                    : `${
                                        signedIn && "hover:text-base-content"
                                      } text-base-content/10`
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
                            className={`text-md text-base-content whitespace-nowrap ${
                              i < 3 && taggers.length > 0
                                ? "font-bold"
                                : "font-normal"
                            }`}
                          >
                            {tag}
                          </p>
                        </div>
                        <div className="flex w-2/3 flex-row items-center justify-between">
                          <p className="text-base-content text-ellipsis  whitespace-nowrap px-2 text-left text-sm font-normal lg:flex">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
