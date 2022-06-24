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

  const views = useSingleSelect([
    { name: "Activity" },
    { name: "Tags" },
    { name: "Friends" },
  ]);
  const selectedView = views.filter(({ selected }) => selected === true)[0];

  const isFriend = profile?.friends?.includes(address);
  return (
    <Layout>
      {!address ? (
        <LoadingView address={ensName || address} />
      ) : (
        <div className="w-full bg-gray-700">
          <div className="flex w-full flex-col space-y-12 bg-gray-800 px-72 pt-36">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start justify-start space-y-4">
                <TagsList tags={tags} max={3} />
                <p className="text-left text-6xl font-bold text-gray-200">
                  {name || ensName || `Anon ${dao.memberName}`}
                </p>
                <div className="flex flex-row justify-start space-x-2">
                  {account &&
                    (isFriend ? (
                      <p
                        className="badge hover:bg-opacity-50"
                        onClick={() => profile?.removeFriend(address)}
                      >
                        Friend
                      </p>
                    ) : (
                      <p
                        className="badge hover:bg-opacity-50"
                        onClick={() => profile?.addFriend(address)}
                      >
                        Add Friend
                      </p>
                    ))}
                  {/* <p className="badge">{Number(krauseBalance)} $KRAUSE</p> */}
                </div>
              </div>
              <div className="rounded-full border-4 border-gray-400">
                <Image
                  src={user.avatarSrc || defaultAvatar}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between space-x-3">
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
          <div className="flex w-full flex-col space-y-24 px-72 py-10">
            {selectedView.name === "Activity" && (
              <div className="flex flex-col space-y-4">
                {/* <p className="text-left text-3xl font-semibold text-gray-300">
                  Comments
                </p> */}
                {comments?.length > 0 ? (
                  <CommentList comments={comments} />
                ) : (
                  <p className="font-semibold">
                    {name} has not left any comments! Go nudge them to
                    participate. There may be something special for those who
                    do...
                  </p>
                )}
              </div>
            )}

            {selectedView.name === "Tags" && (
              <div className="flex flex-col space-y-4">
                {tags.map(({ tag, taggers, toggle }) => (
                  <div className="flex flex-col space-y-3 rounded-lg bg-gray-200 py-8 px-12">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row justify-between space-x-2">
                        <p className="text-2xl font-bold text-gray-900">
                          {tag}
                        </p>
                        <button
                          onClick={toggle}
                          className="badge badge-dark font-normal"
                        >
                          {taggers.includes(account?.address) ? "Untag" : "Tag"}
                        </button>
                      </div>
                      <p className="text-md font-normal text-gray-800">
                        {taggers
                          .slice(0, 2)
                          .reduce(
                            (acc: string, tagger: string) =>
                              `${tagger.slice(0, 6)}, `.concat(acc),
                            ` and ${taggers.length - 2} other.`
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
                    <TagListBox address={account?.address} tags={allTags} />
                  </div>
                )}
              </div>
            )}
            {selectedView.name === "Friends" && (
              <div className="flex flex-col space-y-2">
                <p className="text-left text-3xl font-bold text-gray-200">
                  Friends
                </p>
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
