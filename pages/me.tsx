import Image from "next/image";

import { dao, defaultAvatar } from "../config";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import { useKrauseBalance } from "../hooks/ethereum/useKrauseBalance";
import { useListenUserTags } from "../hooks/database/useListenUserTags";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useMemo, useRef, useState } from "react";
import { useGetAllUserTags } from "../hooks/tags/useGetAllUserTags";
import { useComments } from "../hooks/database/useComments";
import { usePFP } from "../hooks/usePFP";
import { useSignIn } from "../hooks/useSignIn";

import dynamic from "next/dynamic";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { useOnKeydown } from "@/hooks/generic/useCommand";
import TagIcon from "@/components/icons/TagIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { ChatIcon } from "@/components/icons/ChatIcon";
import { useAppSelector } from "../app/hooks";

const Layout = dynamic(() => import("../components/Layout"));
const CommentList = dynamic(() => import("../components/profiles/CommentList"));
const FriendsList = dynamic(() => import("../components/profiles/FriendsList"));
const TagsList = dynamic(() => import("../components/profiles/TagsList"));
const LoginView = dynamic(() => import("../components/LoginView"));

export default function MyProfile() {
  const user = useGetUserProfile(); // all this
  const address = useUserAddress(); //    can be composed
  const tags = useListenUserTags(address); //   into something
  const allTags = useGetAllUserTags(address); //     better....
  const krauseBalance = useKrauseBalance(address); //     ...this too

  const { signedIn } = useSignIn();
  const [editView, setEditView] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(user?.name);

  const comments = useComments(address);
  const sortedComments = useMemo(
    () => comments.sort((a, b) => b.end - a.end),
    [comments]
  );

  const {
    options: views,
    selected,
    next,
    prev,
  } = useSingleSelect([
    { name: "Activity", icon: ChatIcon },
    { name: "Tags", icon: TagIcon },
    { name: "Following", icon: UsersIcon },
  ]);
  const selectedView = views[selected];

  useOnKeydown("ArrowRight", next);
  useOnKeydown("ArrowLeft", prev);

  const uploadRef = useRef<any>(null);
  const triggerUpload = () => {
    console.log("Trigger upload");
    uploadRef?.current?.click();
  };

  const friends = user?.friends;
  const [pfpUrl, setPfpUrl] = usePFP(address);

  const users = useAppSelector((state: any) => state.users);

  return (
    <Layout>
      {!signedIn ? (
        <LoginView />
      ) : (
        <div className="flex w-full flex-col items-center">
          <div className="bg-neutral flex w-full flex-row justify-center pt-36">
            <div className="flex w-3/5 max-w-3xl flex-col items-start space-y-12">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex w-full flex-col items-start justify-start space-y-4">
                  <div className="flex w-full flex-row  space-x-2  ">
                    <TagsList tags={tags} max={3} disabled={true} />
                  </div>
                  {editView ? (
                    <input
                      value={nameInput}
                      onBlur={() => {
                        nameInput.length > 2 &&
                          nameInput != "..." &&
                          user.updateName(nameInput);
                        setEditView(false);
                      }}
                      onChange={(e) => setNameInput(e.target.value)}
                      defaultValue="..."
                      className="border-b-2 bg-transparent text-left text-5xl font-semibold text-gray-300 caret-current outline-none"
                    />
                  ) : (
                    <p
                      onDoubleClick={() => setEditView(true)}
                      className="-ml-2 w-10/12 p-2 pr-4 text-left text-6xl font-bold text-gray-200 hover:bg-black/50"
                    >
                      {user?.name}
                    </p>
                  )}
                </div>
                <div
                  className="group relative flex flex-col items-center justify-center overflow-hidden rounded-full border-4"
                  onClick={triggerUpload}
                >
                  <Image
                    src={pfpUrl || defaultAvatar}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                  <div className="absolute hidden min-h-full min-w-full flex-col items-center justify-center rounded-full bg-black/50 group-hover:flex"></div>
                  <input
                    type="file"
                    className="hidden"
                    ref={uploadRef}
                    onChange={(e) => {
                      user
                        .setProfilePic(e.target.files?.[0])
                        .then(() => setPfpUrl(pfpUrl + "/"));
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg border-b">
                {views.map(({ name: viewName, toggle, selected, icon }, i) => (
                  <div
                    className={`bg-primary-content flex w-full flex-row items-center space-x-2 ${
                      selected
                        ? "text-base-300 border-b-2 border-black"
                        : "text-base-100"
                    } px-6 py-3 hover:bg-gray-100`}
                    onClick={toggle}
                    key={i}
                  >
                    {icon({})}
                    <p className="text-md py-2 font-semibold">{viewName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-primary-content flex w-3/5 max-w-3xl flex-col items-center justify-center space-y-24 rounded-b-lg">
            {selectedView.name === "Activity" && (
              <div className="text-neutral flex w-full flex-col space-y-4 p-8">
                {sortedComments?.length > 0 ? (
                  <CommentList comments={sortedComments} />
                ) : (
                  <div className="text-base-100 flex flex-col space-y-2 p-8">
                    <p className="text-lg">No comments found.</p>
                    <p className="text-md">
                      Go nudge them to participate. There may be something
                      special for those who do.
                    </p>
                  </div>
                )}
              </div>
            )}

            {selectedView.name === "Tags" && (
              <div className="flex min-h-[50vh] w-full flex-col space-y-0 overflow-hidden rounded-b-lg">
                {allTags.map(
                  ({ tag, taggers, toggle, description }: any, i: number) => (
                    <div
                      className="bg-primary-content flex w-full flex-col space-y-0"
                      key={i}
                    >
                      <div className="flex w-full flex-col space-y-0">
                        <div className="group flex w-full flex-row justify-between space-x-2 border-b py-2 px-6">
                          <div className="flex w-full flex-row  items-center justify-start space-x-2">
                            <div className="flex w-1/3 flex-row items-center space-x-4 overflow-hidden">
                              <div className="flex flex-row space-x-2">
                                <p className="badge badge-light badge-sm flex">
                                  {taggers.length}
                                </p>
                                <div onClick={toggle}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 ${
                                      taggers.includes(address)
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

                              <div
                                className="tooltip tooltip-right"
                                data-tip={description}
                              >
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
                            </div>
                            <div className="flex w-2/3 flex-row items-center justify-between">
                              <p className="flex px-6 text-sm font-normal text-gray-700 group-hover:hidden lg:flex">
                                {taggers
                                  .slice(0, 3)
                                  .reduce(
                                    (acc: string, tagger: string, i: number) =>
                                      acc.concat(
                                        `${
                                          users[tagger]?.name ||
                                          tagger.slice(0, 6)
                                        }${taggers.length > i + 1 ? ", " : ""}`
                                      ),
                                    ""
                                  )
                                  .concat(
                                    `${
                                      taggers.length > 3
                                        ? `and ${taggers.length - 3} other${
                                            taggers.length > 4 ? "s" : ""
                                          }.`
                                        : ""
                                    }`
                                  )}
                              </p>
                              <p className="invisible px-6 text-sm font-normal text-gray-700 group-hover:visible lg:flex">
                                {description}...
                              </p>
                            </div>
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
            )}
            {selectedView.name === "Following" && (
              <div className="flex w-full flex-col space-y-2 overflow-hidden rounded-b-lg">
                {/* <p className="text-left text-3xl font-bold text-gray-200">
                Friends
              </p> */}
                {friends?.length > 0 ? (
                  <FriendsList friends={friends} />
                ) : (
                  <div className="bg-primary-content text-base-100 flex flex-col space-y-2 p-8">
                    <p className="text-lg">
                      {!user?.name
                        ? "Loading..."
                        : `${user.name} isn't following anyone.`}
                    </p>
                    <p className="">What a shame...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
