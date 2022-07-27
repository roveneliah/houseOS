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

const CommentList = dynamic(() => import("@/components/profiles/CommentList"));
const LoadingView = dynamic(() => import("@/components/profiles/LoadingView"));
const FriendsList = dynamic(() => import("@/components/profiles/FriendsList"));
const TagListBox = dynamic(() => import("@/components/profiles/TagListBox"));
const TagsList = dynamic(() => import("@/components/profiles/TagsList"));

export default function Profile({ address: userAddress }: any) {
  const user = useGetUser(userAddress);
  const { address, friends, name } = user;
  const profile = useGetUserProfile();
  const tags: Tag[] = useListenUserTags(address);
  const { data: ensName } = useEnsName({ address });
  const comments: Array<Comment> = useComments(address);
  const { signedIn } = useSignIn();
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

  const formatTaggers = (taggers: Array<string>) =>
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

  const isFriend: boolean = profile?.friends?.includes(address);
  return (
    <Layout>
      {!address ? (
        <div className="pt-36">
          <LoadingView address={ensName || address} />
        </div>
      ) : (
        <div className="flex w-full flex-col items-center">
          <div className="bg-neutral flex w-full flex-row justify-center pt-36">
            <div className="flex w-3/5 max-w-3xl flex-col items-start space-y-12">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex w-full flex-col items-start justify-start space-y-4">
                  <div className="flex w-full flex-row space-x-2">
                    {signedIn && (
                      <div className="flex flex-row justify-start space-x-2">
                        {isFriend ? (
                          <p
                            className="border-success text-success min-w-fit cursor-pointer rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50"
                            onClick={() => profile?.removeFriend(address)}
                          >
                            Following
                          </p>
                        ) : (
                          <p
                            className="border-warning text-warning min-w-fit cursor-pointer rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50"
                            onClick={() => profile?.addFriend(address)}
                          >
                            Follow
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex flex-row space-x-1">
                      {tags.slice(0, 3).map((tag) => (
                        <p className="text-warning border-warning whitespace-nowrap rounded-full border px-3 py-1 text-sm font-semibold">
                          {tag.tag}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="text-left text-6xl font-bold text-gray-200">
                    {name || ensName || `Anon ${dao.memberName}`}
                  </p>
                </div>
                <div className="hidden rounded-full lg:block">
                  <Image
                    src={user.avatarSrc || defaultAvatar}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg border-b">
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
          <div className="flex w-3/5 max-w-3xl flex-col items-center justify-center space-y-24 overflow-hidden rounded-b-lg">
            {selectedView.name === "Activity" && (
              <div className="bg-primary-content flex w-full flex-col space-y-4">
                {/* <p className="text-left text-3xl font-semibold text-gray-300">
                  Comments
                </p> */}
                {comments?.length > 0 ? (
                  <CommentList comments={comments} />
                ) : (
                  <div className="text-base-100 flex flex-col space-y-2 p-12">
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
              <div className="bg-primary-content flex w-full flex-col overflow-hidden rounded-b-lg">
                {allTags.map(
                  ({ tag, taggers, toggle, description }: any, i: number) => (
                    <div
                      className="bg-primary-content flex w-full flex-col"
                      key={i}
                    >
                      <div className="flex w-full flex-col">
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
                            <div className="flex w-2/3 flex-row items-center justify-between">
                              <p className="flex text-ellipsis whitespace-nowrap px-6 text-sm font-normal text-gray-700 group-hover:hidden lg:flex">
                                {formatTaggers(taggers)}
                              </p>
                              <p className="hidden text-ellipsis whitespace-nowrap px-6 text-sm font-normal text-gray-700 group-hover:flex">
                                {description || formatTaggers(taggers)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
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
                  <div className="bg-primary-content text-base-100 flex flex-col space-y-2 p-12">
                    <p className="text-lg">
                      {!name ? "Loading..." : `${name} isn't following anyone.`}
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
