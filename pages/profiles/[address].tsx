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
const CommentList = dynamic(() => import("@/components/profiles/CommentList"));
const LoadingView = dynamic(() => import("@/components/profiles/LoadingView"));
const FriendsList = dynamic(() => import("@/components/profiles/FriendsList"));
const TagListBox = dynamic(() => import("@/components/profiles/TagListBox"));
const TagsList = dynamic(() => import("@/components/profiles/TagsList"));
import { Tag } from "@/types/Tag";
import { useSingleSelect } from "@/hooks/generic/useSingleSelect";
import { useOnKeydown } from "@/hooks/generic/useCommand";
import { ChatIcon } from "@/components/icons/ChatIcon";
import TagIcon from "@/components/icons/TagIcon";
import UsersIcon from "@/components/icons/UsersIcon";

export default function Profile({ address: userAddress }: any) {
  const user = useGetUser(userAddress);
  const { address, friends, name } = user;
  const { data: account } = useAccount();
  const profile = useGetUserProfile();
  const tags: Tag[] = useListenUserTags(address);
  const allTags = useGetAllUserTags(address);
  // const krauseBalance = useKrauseBalance(address);
  const { data: ensName } = useEnsName({ address });
  const comments: Array<Comment> = useComments(address);
  const { signedIn } = useSignIn();

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

  const isFriend = profile?.friends?.includes(address);
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
                          // <div onClick={() => profile?.addFriend(address)}>
                          //   <svg
                          //     xmlns="http://www.w3.org/2000/svg"
                          //     className="h-6 w-6"
                          //     fill="none"
                          //     viewBox="0 0 24 24"
                          //     stroke="currentColor"
                          //     strokeWidth={2}
                          //   >
                          //     <path
                          //       strokeLinecap="round"
                          //       strokeLinejoin="round"
                          //       d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          //     />
                          //   </svg>
                          // </div>
                        )}
                        {/* <p className="badge">{Number(krauseBalance)} $KRAUSE</p> */}
                      </div>
                    )}
                    <div className="flex flex-row space-x-1">
                      {tags.slice(0, 3).map((tag) => (
                        <p className="whitespace-nowrap rounded-full border border-gray-100 px-3 py-1 text-sm font-semibold text-gray-100">
                          {tag.tag}
                        </p>
                      ))}
                    </div>
                  </div>
                  <p className="text-left text-6xl font-bold text-gray-200">
                    {name || ensName || `Anon ${dao.memberName}`}
                  </p>
                </div>
                <div className="hidden rounded-full border-4 border-gray-400 lg:block">
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
              <div className="flex w-full flex-col space-y-0 overflow-hidden">
                {tags.map(({ tag, description, taggers, toggle }: any) => (
                  <div className="flex w-full flex-col space-y-3 overflow-hidden border-b bg-gray-100">
                    <div className="flex w-full flex-col space-y-2 px-8 py-4">
                      <div className="flex w-full flex-row justify-between space-x-2">
                        <div className="flex flex-row items-center justify-start space-x-2">
                          {/* <p className="badge badge-light">{taggers.length}</p> */}
                          {/* <div className="flex flex-row items-center text-gray-900">
                            {signedIn && (
                              <button onClick={toggle} className="">
                                {taggers.includes(account?.address) ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                )}
                              </button>
                            )}
                          </div> */}
                          <p className="text-lg font-semibold text-gray-900">
                            {tag}
                          </p>
                          {/* <p className="font-light text-gray-800">
                            {description}
                          </p> */}
                        </div>
                      </div>
                      <p className="text-md text-sm text-gray-800">
                        {taggers.slice(0, 2).reduce(
                          (tail: string, tagger: string, i: number) =>
                            `${tagger.slice(0, 6)}${
                              taggers.length > i + 2
                                ? ", "
                                : taggers.length === 2 && i !== 0
                                ? " and " // we want this in the case that ther'es
                                : ""
                            }`.concat(tail),
                          `${
                            taggers.length > 2
                              ? `and ${taggers.length - 2} other${
                                  taggers.length > 3 ? "s" : ""
                                }.`
                              : ""
                          }`
                        )}
                      </p>
                      <div className="group flex flex-row items-center space-x-2">
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
                      </div>
                    </div>
                  </div>
                ))}
                {signedIn && (
                  <div className="flex flex-col space-y-0 rounded-b-md bg-gray-100 p-6">
                    <p className="p-4 text-left text-3xl font-bold text-gray-900">
                      Edit Tags
                    </p>
                    <TagListBox address={account?.address} tags={allTags} />
                  </div>
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
