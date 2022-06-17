import Image from "next/image";
import Layout from "../components/Layout";
import { dao, defaultAvatar } from "../config";
import { User } from "../types/User";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import LoginView from "../components/LoginView";
import { useKrauseBalance } from "../hooks/ethereum/useKrauseBalance";
import { useListenUserTags } from "../hooks/database/useListenUserTags";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetAllUserTags } from "../hooks/tags/useGetAllUserTags";
import { useComments } from "../hooks/database/useComments";
import CommentList from "../components/profiles/CommentList";
import FriendsList from "../components/profiles/FriendsList";
import TagsList from "../components/profiles/TagsList";
import TagListBox from "../components/profiles/TagListBox";
import { createHook } from "../hooks/createHook";
import { getPfp } from "../utils/firebase/user";

export default function MyProfile() {
  const user = useGetUserProfile();
  const address = useUserAddress();
  const tags = useListenUserTags(address);
  const allTags = useGetAllUserTags(address);
  const krauseBalance = useKrauseBalance(address);

  const [editView, setEditView] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(user?.name);

  const comments = useComments(address);
  const sortedComments = useMemo(
    () => comments.sort((a, b) => b.end - a.end),
    [comments]
  );

  const uploadRef = useRef<any>(null);
  const triggerUpload = () => {
    console.log("Trigger upload");
    uploadRef?.current?.click();
  };

  const avatarSrc = user?.avatarSrc;
  const friends = user?.friends;

  const [pfpUrl, setPfpUrl] = useState<string>();
  useEffect(() => {
    if (address) {
      console.log("trying to get at address: ", address);
      getPfp(address).then(setPfpUrl);
    }
  }, [address]);

  return (
    <Layout>
      {!address ? (
        <LoginView />
      ) : (
        <div className="w-[100vw]">
          <div className="flex min-w-full flex-col space-y-32 bg-gray-700 px-72 pt-36 pb-12">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="flex flex-col items-start justify-start space-y-4">
                <TagsList tags={tags} />
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
                    className="-ml-2 rounded-md p-2 pr-4 text-left text-5xl font-bold text-gray-300 hover:bg-black/25"
                  >
                    {user?.name}
                  </p>
                )}
                <p className="font-semibold text-gray-200">
                  {Number(krauseBalance)} $KRAUSE
                </p>
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
          </div>
          <div className="flex w-full flex-col space-y-32 px-72 py-20">
            <div className="flex flex-col space-y-4">
              <p className="text-left text-3xl font-bold text-gray-200">
                Comments
              </p>
              {comments && comments.length > 0 ? (
                <CommentList comments={comments} />
              ) : (
                <div>
                  <p className="font-semibold">
                    Your comments will appear here. You can also check out other
                    peoples' activity on their profiles.
                  </p>
                  <p className="font-semibold">
                    Open the Command Palette with ⌘k or ctrl k and search
                    proposals.
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-left text-3xl font-bold text-gray-200">
                Friends
              </p>
              {friends && friends.length > 0 ? (
                <FriendsList friends={friends} />
              ) : (
                <p className="font-semibold">
                  You can add friends by searching in the command palette. By
                  friending ${dao.memberName}'s, you borrow their labels on
                  other users and proposals.
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-left text-3xl font-bold text-gray-200">
                Help others understand a bit about you.
              </p>
              <TagListBox allTags={allTags} address={address} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
