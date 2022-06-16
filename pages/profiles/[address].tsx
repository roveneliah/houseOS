import Image from "next/image";
import { useAccount, useBalance, useConnect, useEnsName } from "wagmi";
import Layout from "../../components/Layout";
import { LoadingView } from "./components/LoadingView";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";
import { useGetUser } from "../../hooks/ceramic/useGetUser";
import { addFriend, getUser, getUsers } from "../../utils/firebase/user";
import { useListenUserTags } from "../../hooks/database/useListenUserTags";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { Comment } from "../../types/Comment";
import { useComments } from "../../hooks/database/useComments";
import { dao, defaultAvatar } from "../../config";
import { useGetAllUserTags } from "../../hooks/tags/useGetAllUserTags";
import { CommentList } from "./CommentList";
import { FriendsList } from "./FriendsList";
import { TagListBox } from "./TagListBox";
import { TagsList } from "./TagsList";

export default function Profile({ user }: any) {
  const { address, friends, name } = user;
  const { data: account } = useAccount();
  const profile = useGetUserProfile();
  const tags = useListenUserTags(address);
  const allTags = useGetAllUserTags(address);
  const krauseBalance = useKrauseBalance(address);
  const { data: ensName } = useEnsName({ address });
  const isFriend = profile?.friends?.includes(address);
  const comments: Array<Comment> = useComments(address);

  return (
    <Layout>
      {!address ? (
        <LoadingView address={ensName || address} />
      ) : (
        <div className="w-full">
          <div className="flex w-full flex-col space-y-32 bg-gray-700 px-72 pt-36 pb-12">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start justify-start space-y-4">
                <TagsList tags={tags}></TagsList>
                <p className="text-left text-5xl font-bold">
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
                  <p className="badge">{Number(krauseBalance)} $KRAUSE</p>
                </div>
              </div>
              <div className="ring-primary rounded-full border-4 ring-4">
                <Image
                  src={user.avatarSrc || defaultAvatar}
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col space-y-24 px-72 py-20">
            <div className="flex flex-col space-y-2">
              <p className="text-left text-3xl font-bold text-gray-200">
                Comments
              </p>
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
            {account && (
              <div className="flex flex-col space-y-6">
                <p className="text-left text-3xl font-bold text-gray-200">
                  Tell us about {name}
                </p>
                <TagListBox address={account?.address} allTags={allTags} />
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }: any) {
  const user = await getUser(params.address);
  return {
    props: {
      user,
    },
  };
}

export async function getStaticPaths() {
  const users = await getUsers();
  const paths = users.map((user) => ({
    params: { address: user.address },
  }));
  return { paths, fallback: false };
}
