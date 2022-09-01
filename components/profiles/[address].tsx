import { useAccount, useEnsName } from "wagmi";
import Layout from "../Layout";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";
import { getUser, getUsers } from "../../utils/firebase/user";
import { useListenUserTags } from "../../hooks/database/useListenUserTags";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { useGetUser } from "@/hooks/database/useGetUser";
import { Comment } from "../../types/Comment";
import { useComments } from "../../hooks/database/useComments";
import { useGetAllUserTags } from "../../hooks/tags/useGetAllUserTags";

import dynamic from "next/dynamic";
import { useSignIn } from "@/hooks/useSignIn";
import { Tag } from "@/types/Tag";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { useOnKeydown } from "@/hooks/generic/useOnKeydown";
import { ChatIcon } from "@/components/icons/ChatIcon";
import { useAppSelector } from "@/redux/app/hooks";
import { useUserAddress } from "@/hooks/ethereum/useUserAddress";
import { TagsView } from "@/components/profiles/TagsView";
import { FollowingView } from "@/components/profiles/FollowingView";
import { ProfileHeader } from "./ProfileHeader";
import { ActivityView } from "./ActivityView";
import { RootState } from "@/redux/app/store";
import { TagIcon, UsersIcon } from "../icons";

const LoadingView = dynamic(() => import("@/components/profiles/LoadingView"));
export const TagsList = dynamic(() => import("@/components/profiles/TagsList"));

export default function Profile({
  address: userAddress,
  background = "base-100",
  widgetBackground = "base-200",
}: any) {
  const myAddress = useUserAddress();
  const user = useGetUser(userAddress);
  const { address, friends, name } = user;
  const profile = useGetUserProfile();
  const tags: Tag[] = useListenUserTags(address);
  const { data: ensName } = useEnsName({ address });
  const comments: Array<Comment> = useComments(address);
  const { hasProfile: signedIn } = useSignIn();
  const users = useAppSelector((state: RootState) => state.users);
  const allTags = useGetAllUserTags(address);

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

  // TODO: make useOnKeydown a set that we can push and remove things from based on view and state
  useOnKeydown("ArrowRight", next);
  useOnKeydown("ArrowLeft", prev);

  const isFriend: boolean = profile?.friends?.includes(address);
  return (
    <div className="h-full w-full">
      {!address ? (
        <div className="pt-36">
          <LoadingView address={userAddress} />
        </div>
      ) : (
        <div
          className={`bg-${background} flex h-full w-full flex-col items-center p-12 px-16`}
        >
          <ProfileHeader
            avatarSrc={user.avatarSrc}
            address={address}
            name={name}
            profile={profile}
            tags={tags}
            ensName={ensName}
            signedIn={signedIn}
            views={views}
            isFriend={isFriend}
            background={background}
            widgetBackground={widgetBackground}
          />
          <div
            className={`bg-${widgetBackground} mb-12 flex w-full max-w-3xl flex-col items-center justify-center space-y-24 overflow-hidden rounded-b-lg`}
          >
            {selectedView.name === "Activity" && (
              <ActivityView comments={comments} />
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
              <FollowingView friends={friends} user={user} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// export async function getStaticProps({ params }: any) {
//   return {
//     props: params,
//   };
// }

// export async function getStaticPaths() {
//   const users = await getUsers();
//   const paths = users.map((user) => ({
//     params: { address: user.address },
//   }));
//   return { paths, fallback: false };
// }
