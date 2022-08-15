import { dao } from "../config";
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
import { ActivityView } from "../components/ActivityView";
import { FollowingView } from "@/components/FollowingView";
import { TagsView } from "@/components/TagsView";
import { MyProfileHeader } from "../components/MyProfileHeader";

const Layout = dynamic(() => import("../components/Layout"));
const LoginView = dynamic(() => import("../components/LoginView"));
export const TagsList = dynamic(
  () => import("../components/profiles/TagsList")
);

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
          <MyProfileHeader
            user={user}
            tags={tags}
            editView={editView}
            setEditView={setEditView}
            nameInput={nameInput}
            setNameInput={setNameInput}
            views={views}
            uploadRef={uploadRef}
            triggerUpload={triggerUpload}
            pfpUrl={pfpUrl}
            setPfpUrl={setPfpUrl}
          />
          <div className="bg-base-100 text-base-content flex w-3/5 max-w-3xl flex-col items-center justify-center space-y-24 rounded-b-lg">
            {selectedView.name === "Activity" && (
              <ActivityView comments={sortedComments} />
            )}

            {selectedView.name === "Tags" && (
              <TagsView
                allTags={allTags}
                address={address}
                signedIn={signedIn}
                users={users}
              />
            )}
            {selectedView.name === "Following" && (
              <FollowingView user={user} friends={friends} />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
