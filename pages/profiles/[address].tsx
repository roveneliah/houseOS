import Image from "next/image";
import { useAccount, useBalance, useConnect, useEnsName } from "wagmi";
import Layout from "../../components/Layout";
import { EthereumAddress } from "../../types/EthereumAddress";
import { LoadingView } from "./components/LoadingView";
import { ProfilePreview } from "./components/ProfilePreview";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";
import { useGetUser } from "../../hooks/ceramic/useGetUser";
import { addFriend, getUser, getUsers } from "../../utils/firebase/user";
import { useListenUserTags } from "../../hooks/database/useListenUserTags";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { connect } from "http2";
import { Comment } from "../../types/Comment";
import { useComments } from "../../hooks/database/useComments";
import Link from "next/link";
import { Proposal } from "../../types/Proposal";
import { useGetProposals } from "../../hooks/snapshot/useGetProposals";
import { dao, defaultAvatar } from "../../config";
import { useGetAllUserTags } from "../../hooks/tags/useGetAllUserTags";

export function CommentList({ comments }: { comments: Array<Comment> }) {
  return (
    <div>
      {comments.map((comment: Comment, i: number) => {
        return (
          <Link href={`/proposals/${comment.proposalId}`} key={i}>
            <div className="flex flex-col space-y-4 rounded-lg bg-gray-300/50 p-5">
              <p className="text-xl font-normal text-gray-700">
                {comment.body}
              </p>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-700">
                  {comment.proposalTitle}
                </p>
                <p className="badge">{comment.choice}</p>
              </div>
              {comment.vp && <p className="badge">{comment.vp}</p>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

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
        <>
          <div className="flex w-full flex-col space-y-32 bg-gray-700 px-72 pt-28 pb-12">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start justify-start space-y-2">
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

                <p className="text-left text-5xl font-bold">
                  {name || ensName || `Anon ${dao.memberName}`}
                </p>
                <div className="flex flex-row space-x-2 pt-6">
                  {tags.map(
                    (tag: any, i: number) =>
                      tag.taggers.length > 0 && (
                        <p
                          className="badge badge-light overflow-hidden"
                          key={i}
                          onClick={tag.toggle}
                        >
                          <span className="mr-2 -ml-3 bg-gray-400 p-2 text-gray-700">
                            {tag.taggers.length || ""}
                          </span>
                          {tag.tag}
                        </p>
                      )
                  )}
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
          <div className="flex w-full flex-col space-y-32 px-72 py-20">
            <div className="flex flex-col space-y-6">
              <p className="text-left text-3xl font-bold text-gray-200">
                Comments
              </p>
              <CommentList comments={comments} />
            </div>
            <div className="flex flex-col space-y-6">
              <p className="text-left text-3xl font-bold text-gray-200">
                Friends
              </p>
              <div className="flex flex-col space-y-4">
                {friends?.map((address: EthereumAddress, i: number) => (
                  <ProfilePreview address={address} key={i} />
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              <p className="text-left text-3xl font-bold text-gray-200">Tags</p>
              <div className="flex flex-row flex-wrap space-x-2">
                {allTags?.map(({ tag, toggle, taggers }: any, i: number) => (
                  <p
                    className={`badge my-1 ${
                      taggers.includes(account?.address)
                        ? "badge-dark"
                        : "hover:bg-gray-400"
                    }`}
                    key={i}
                    onClick={toggle}
                  >
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </>
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
