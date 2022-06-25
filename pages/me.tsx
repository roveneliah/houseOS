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
    { name: "Activity" },
    { name: "Tags" },
    { name: "Friends" },
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
          <div className="flex w-full flex-row justify-center bg-gray-800 pt-36">
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

              <div className="flex w-full flex-row justify-between space-x-3">
                {views.map(({ name: viewName, toggle, selected }) => (
                  <div
                    className={`w-full rounded-t-lg ${
                      selected ? "bg-gray-700" : "bg-gray-500"
                    } px-6 py-3 hover:bg-gray-700`}
                    onClick={toggle}
                  >
                    <p
                      className={`text-2xl font-semibold ${
                        selected ? "text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {viewName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-3/5 max-w-3xl flex-col items-center justify-center space-y-24  py-10">
            {selectedView.name === "Activity" && (
              <div className="flex w-full flex-col space-y-4">
                {/* <p className="text-left text-3xl font-semibold text-gray-300">
                  Comments
                </p> */}
                {comments?.length > 0 ? (
                  <CommentList comments={comments} />
                ) : (
                  <p className="font-semibold">
                    {user?.name} has not left any comments! Go nudge them to
                    participate. There may be something special for those who
                    do...
                  </p>
                )}
              </div>
            )}

            {selectedView.name === "Tags" && (
              <div className="flex w-full flex-col space-y-4">
                {tags.map(({ tag, taggers, toggle }: Tag) => (
                  <div className="flex w-full flex-col space-y-3 overflow-hidden rounded-lg bg-gray-200">
                    <div className="flex w-full flex-col space-y-0">
                      <div className="flex w-full flex-row justify-between space-x-2 bg-gray-300 py-3 px-6">
                        <div className="flex flex-row items-center justify-start space-x-2">
                          <p className="badge badge-light badge-sm">
                            {taggers.length}
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {tag}
                          </p>
                        </div>
                        {signedIn && (
                          <button
                            onClick={toggle}
                            className="badge badge-dark font-normal"
                          >
                            {taggers.includes(address) ? "Untag" : "Tag"}
                          </button>
                        )}
                      </div>
                      <p className="text-md px-6 py-4 font-normal text-gray-800">
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
                ))}
                {signedIn && (
                  <div className="flex flex-col space-y-0 rounded-lg bg-gray-200 p-6">
                    <p className="p-4 text-left text-3xl font-bold text-gray-900">
                      Add Tag
                    </p>
                    <TagListBox
                      address={address}
                      tags={allTags.filter(
                        ({ taggers }) => taggers.length === 0
                      )}
                    />
                  </div>
                )}
              </div>
            )}
            {selectedView.name === "Friends" && (
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
