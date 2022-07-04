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
import { Tag } from "@/types/Tag";
import TagIcon from "@/components/icons/TagIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { ChatIcon } from "@/components/icons/ChatIcon";
const Layout = dynamic(() => import("../components/Layout"));
const CommentList = dynamic(() => import("../components/profiles/CommentList"));
const FriendsList = dynamic(() => import("../components/profiles/FriendsList"));
const TagsList = dynamic(() => import("../components/profiles/TagsList"));
const TagListBox = dynamic(() => import("../components/profiles/TagListBox"));
const LoginView = dynamic(() => import("../components/LoginView"));

export default function MyProfile() {
  const user = useGetUserProfile();
  const address = useUserAddress();
  const tags = useListenUserTags(address);
  const allTags = useGetAllUserTags(address);
  const krauseBalance = useKrauseBalance(address);
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
                      className="-ml-2 rounded-md p-2 pr-4 text-left text-6xl font-bold text-gray-200 hover:bg-black/25"
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

              <div className="flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg">
                {views.map(({ name: viewName, toggle, selected, icon }) => (
                  <div
                    className={`bg-primary-content flex w-full flex-row items-center space-x-2 ${
                      selected
                        ? "text-base-300 border-b-2 border-black"
                        : "text-base-100"
                    } px-6 py-3 hover:bg-gray-100`}
                    onClick={toggle}
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
              <div className="text-neutral flex min-h-[50vh] w-full flex-col space-y-4 p-6">
                {/* <p className="text-left text-3xl font-semibold text-gray-300">
                  Comments
                </p> */}
                {comments?.length > 0 ? (
                  <CommentList comments={comments} />
                ) : (
                  <>
                    <p className="font-semibold">
                      <span className="font-normal">{user?.name}</span> has not
                      left any comments! Go nudge them to participate.
                    </p>
                    <p className="font-semibold">
                      There may be something special for those who do...
                    </p>
                  </>
                )}
              </div>
            )}

            {selectedView.name === "Tags" && (
              <div className="flex min-h-[50vh] w-full flex-col space-y-0 overflow-hidden rounded-b-lg">
                {allTags.map(
                  ({ tag, taggers, toggle, description }: any, i: number) => (
                    <div className="bg-primary-content flex w-full flex-col space-y-0">
                      <div className="flex w-full flex-col space-y-0">
                        <div className="group flex w-full flex-row justify-between space-x-2 border-b py-2 px-6">
                          <div className="flex flex-row items-center justify-start space-x-2">
                            <p className="badge badge-light badge-sm flex">
                              {taggers.length}
                            </p>
                            <div
                              className="tooltip tooltip-right"
                              data-tip={description}
                            >
                              <p
                                className={`text-md text-gray-900 ${
                                  i < 3 ? "font-bold" : "font-normal"
                                }`}
                              >
                                {tag}
                              </p>
                            </div>
                            <p className="px-6 text-sm font-normal text-gray-700">
                              {taggers
                                .slice(0, 3)
                                .reduce(
                                  (acc: string, tagger: string, i: number) =>
                                    acc.concat(
                                      `${tagger.slice(0, 6)}${
                                        taggers.length > i + 1 ? ", " : ""
                                      }`
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
                          </div>
                          <div>
                            {/* {signedIn && (
                            <button
                              onClick={toggle}
                              className="badge badge-dark hidden font-normal group-hover:flex"
                            >
                              {taggers.includes(address) ? "Untag" : "Tag"}
                            </button>
                          )} */}
                            {signedIn && (
                              <div
                                onClick={toggle}
                                className="hidden flex-row space-x-2 group-hover:flex"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`hover:text-success ${
                                    taggers.includes(address)
                                      ? "text-success"
                                      : ""
                                  } h-6 w-6`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                  />
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="hover:text-error h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                                  />
                                </svg>
                              </div>
                            )}
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
                {/* {signedIn && (
                  <div className="bg-primary-content flex flex-col space-y-0 rounded-lg p-6">
                    <p className="p-4 text-left text-3xl font-bold text-gray-900">
                      Add Tag
                    </p>
                    <TagListBox address={address} tags={allTags} />
                  </div>
                )} */}
              </div>
            )}
            {selectedView.name === "Following" && (
              <div className="flex w-full flex-col space-y-2">
                {/* <p className="text-left text-3xl font-bold text-gray-200">
                  Friends
                </p> */}
                {friends?.length > 0 ? (
                  <FriendsList friends={friends} />
                ) : (
                  <p className="font-semibold">
                    {name} has not added any friends.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
