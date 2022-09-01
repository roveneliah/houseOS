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
import { useOnKeydown } from "@/hooks/generic/useOnKeydown";
import TagIcon from "@/components/icons/TagIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { ChatIcon } from "@/components/icons/ChatIcon";
import { useAppSelector } from "../redux/app/hooks";
import { FollowingView } from "@/components/profiles/FollowingView";
import { TagsView } from "@/components/profiles/TagsView";
import { MyProfileHeader } from "./profiles/MyProfileHeader";
import { ActivityView } from "./profiles/ActivityView";

const Layout = dynamic(() => import("./Layout"));
const LoginView = dynamic(() => import("./profiles/LoginView"));
export const TagsList = dynamic(() => import("./profiles/TagsList"));

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
        <div className="flex w-full flex-col items-center px-12">
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
          <div className="bg-base-100 text-base-content flex w-full flex-col items-center justify-center rounded-b-lg">
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
