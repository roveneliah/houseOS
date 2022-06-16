import Image from "next/image";
import Layout from "../../components/Layout";
import { dao, defaultAvatar } from "../../config";
import { ProfilePreview } from "../profiles/components/ProfilePreview";
import { LoadingView } from "../profiles/components/LoadingView";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { LoginView } from "./components/LoginView";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";
import { useListenUserTags } from "../../hooks/database/useListenUserTags";
import { useUserAddress } from "../../hooks/ethereum/useUserAddress";
import { useMemo, useState } from "react";
import { useGetAllUserTags } from "../../hooks/tags/useGetAllUserTags";
import { useGetComments } from "../../hooks/database/useGetComments";
import { useComments } from "../../hooks/database/useComments";
import { Comment } from "../../types/Comment";
import Link from "next/link";

export default function MyProfile() {
  const user: User = useGetUserProfile();
  const address = useUserAddress();
  const tags = useListenUserTags(address);
  const allTags = useGetAllUserTags(address);
  const krauseBalance = useKrauseBalance(address);

  const comments = useComments(address);
  const sortedComments = useMemo(
    () => comments.sort((a, b) => b.end - a.end),
    [comments]
  );

  const avatarSrc = user?.avatarSrc;
  const friends = user?.friends;

  return (
    <Layout>
      {!address ? (
        <LoginView />
      ) : (
        <div>
          <div className="flex w-full flex-col space-y-32 bg-gray-700 px-72 pt-28 pb-12">
            <div className="flex w-full flex-row items-center justify-between">
              <div className="justfiy-start flex flex-col items-start space-y-2">
                <div className="flex flex-row space-x-2">
                  {tags.map(({ tag }: any, i: number) => (
                    <p key={i} className="badge">
                      {tag}
                    </p>
                  ))}
                </div>
                <p className="text-left text-5xl font-bold text-gray-300">
                  {user?.name}
                </p>
                <p className="font-semibold text-gray-200">
                  {Number(krauseBalance)} $KRAUSE
                </p>
              </div>
              <div className="ring-primary rounded-full border-4 ring-4">
                <Image
                  src={avatarSrc || defaultAvatar}
                  width={150}
                  height={150}
                  className="rounded-full"
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
                comments.map((comment: Comment, i: number) => {
                  return (
                    <Link href={`/proposals/${comment.proposalId}`} key={i}>
                      <div className="flex flex-col space-y-4 rounded-lg bg-gray-300/50 p-5">
                        <p className="text-lg font-normal text-gray-700">
                          {comment.body}
                        </p>
                        <div className="flex flex-row space-x-2">
                          <p className="badge">{comment.choice}</p>
                          {comment.vp && (
                            <p className="badge">{comment.vp} $KRAUSE</p>
                          )}
                        </div>
                        <p className="font-semibold text-gray-700">
                          {comment.proposalTitle}
                        </p>
                      </div>
                    </Link>
                  );
                })
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
                <div className="flex flex-col space-y-4">
                  {friends?.map((address: EthereumAddress, i: number) => (
                    <ProfilePreview address={address} key={i} />
                  ))}
                </div>
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
              <div className="border-1 flex flex-row flex-wrap justify-start space-x-2 overflow-auto rounded-lg border  p-3">
                {allTags.map(({ tag, taggers, toggle }: any, i: number) => (
                  <p
                    className={`badge my-1 ${
                      taggers.includes(address)
                        ? "badge-dark"
                        : "hover:bg-gray-400"
                    }`}
                    key={i}
                    onClick={toggle}
                  >
                    {tag} {taggers.length}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
