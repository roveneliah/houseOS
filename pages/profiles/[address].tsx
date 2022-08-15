import Image from "next/image";
import { useAccount, useEnsName } from "wagmi";
import Layout from "../../components/Layout";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";
import { getUser, getUsers } from "../../utils/firebase/user";
import { useListenUserTags } from "../../hooks/database/useListenUserTags";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { useGetUser } from "@/hooks/database/useGetUser";
import { Comment } from "../../types/Comment";
import { useComments } from "../../hooks/database/useComments";
import { dao, defaultAvatar } from "../../config";
import { useGetAllUserTags } from "../../hooks/tags/useGetAllUserTags";

import dynamic from "next/dynamic";
import { useSignIn } from "@/hooks/useSignIn";
import { Tag } from "@/types/Tag";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { useOnKeydown } from "@/hooks/generic/useCommand";
import { ChatIcon } from "@/components/icons/ChatIcon";
import TagIcon from "@/components/icons/TagIcon";
import UsersIcon from "@/components/icons/UsersIcon";
import { useAppSelector } from "@/app/hooks";
import { EthereumAddress } from "@/types/EthereumAddress";
import { useUserAddress } from "@/hooks/ethereum/useUserAddress";
import { TagsView } from "@/components/TagsView";
import { ActivityView } from "@/components/ActivityView";
import { FollowingView } from "@/components/FollowingView";

const LoadingView = dynamic(() => import("@/components/profiles/LoadingView"));
const TagsList = dynamic(() => import("@/components/profiles/TagsList"));

export const formatTaggers = (taggers: Array<string>, users: any) =>
  taggers
    .slice(0, 3)
    .reduce(
      (acc: string, tagger: string, i: number) =>
        acc.concat(
          `${users[tagger]?.name || tagger.slice(0, 6)}${
            taggers.length > i + 1 ? ", " : ""
          }`
        ),
      ""
    )
    .concat(
      `${
        taggers.length > 3
          ? `and ${taggers.length - 3} other${taggers.length > 4 ? "s" : ""}.`
          : ""
      }`
    );

function ProfileHeader(props: any) {
  return (
    <div className="bg-base-300 flex w-full flex-row justify-center pt-36">
      <div className="flex w-3/5 max-w-3xl flex-col items-start space-y-12">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-full flex-col items-start justify-start space-y-4">
            <div className="flex w-full flex-row space-x-2">
              {props.signedIn && (
                <div className="flex flex-row justify-start space-x-2">
                  {props.isFriend ? (
                    <p
                      className="border-success text-success min-w-fit cursor-pointer rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50"
                      onClick={() => props.profile?.removeFriend(props.address)}
                    >
                      Following
                    </p>
                  ) : (
                    <p
                      className="border-warning text-warning min-w-fit cursor-pointer rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50"
                      onClick={() => props.profile?.addFriend(props.address)}
                    >
                      Follow
                    </p>
                  )}
                </div>
              )}
              <TagsList tags={props.tags} disabled={true} size="sm" />
            </div>
            <p className="text-base-content text-left text-6xl font-bold">
              {props.name || props.ensName || `Anon ${dao.memberName}`}
            </p>
          </div>
          <div className="hidden rounded-full lg:block">
            <Image
              src={props.avatarSrc || defaultAvatar}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>
        <div className=" bg-base-100 flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg border-b">
          {props.views.map(
            ({ name: viewName, toggle, selected, icon }: any, i: number) => (
              <div
                className={`flex w-full flex-row items-center space-x-2 ${
                  selected
                    ? "text-base-content border-base-content border-b-2"
                    : "text-base-content"
                } px-6 py-3 hover:bg-gray-100`}
                onClick={toggle}
                key={i}
              >
                {icon({})}
                <p className="text-md py-2 font-semibold">{viewName}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default function Profile({ address: userAddress }: any) {
  const myAddress = useUserAddress();
  const user = useGetUser(userAddress);
  const { address, friends, name } = user;
  const profile = useGetUserProfile();
  const tags: Tag[] = useListenUserTags(address);
  const { data: ensName } = useEnsName({ address });
  const comments: Array<Comment> = useComments(address);
  const { hasProfile: signedIn } = useSignIn();
  const users = useAppSelector((state: any) => state.users);
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
    <Layout>
      {!address ? (
        <div className="pt-36">
          <LoadingView address={ensName || address} />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center">
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
          />
          <div className="bg-base-100 mb-12 flex w-3/5 max-w-3xl flex-col items-center justify-center space-y-24 overflow-hidden rounded-b-lg">
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
    </Layout>
  );
}

export async function getStaticProps({ params }: any) {
  return {
    props: params,
  };
}

export async function getStaticPaths() {
  const users = await getUsers();
  const paths = users.map((user) => ({
    params: { address: user.address },
  }));
  return { paths, fallback: false };
}
