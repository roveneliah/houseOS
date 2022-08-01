import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { defaultAvatar, snapshotSpace } from "../config";
import { useVote } from "../hooks/snapshot/useVote";
import { postComment } from "../utils/firebase/post";
import { useGetUserProfile } from "../hooks/users/useGetUserProfile";
import { useListenUserTags } from "../hooks/database/useListenUserTags";
import { useSignIn } from "@/hooks/useSignIn";

interface Homie {
  name: String;
  src: String;
}
interface Comment {
  body: String;
  author: Homie;
}

export default function CommentView({ proposal, back, choice }: any) {
  const vote = useVote(snapshotSpace, proposal.id, choice);
  const { data: account } = useAccount();
  const user = useGetUserProfile();
  const authorTags = useListenUserTags(user?.address);
  const { data: signature, isSuccess, signMessage } = useSignMessage();
  const [message, setMessage] = useState("");
  const { signedIn } = useSignIn();

  const canPost = signedIn;

  useEffect(() => {
    if (isSuccess && signature && signedIn) {
      postComment(proposal.id, comment, signature).then((res) => {
        console.log("Posted Comment: ", res);
        setMessage("");
        back();
      });
    }
  }, [isSuccess]);

  const comment = {
    body: message,
    author: account?.address,
    choice: choice + 1,
  };

  return (
    <div className="bg-base-content flex flex-col space-y-0 rounded-lg px-8 py-5">
      <p className="text-base-100 pb-4 text-2xl font-semibold">Vote</p>
      <div className="flex w-full flex-col space-y-6 overflow-clip">
        <textarea
          className="border-base-100/50 text-md w-full rounded-lg border bg-transparent p-4 font-light outline-0"
          rows={2}
          value={canPost ? message : "Please sign in to comment."}
          disabled={!canPost}
          onChange={(e) => setMessage(e.target.value)}
        />
        {/* <div className="flex flex-row items-end justify-between border-gray-900 px-6">
            <p className="text-4xl font-bold text-gray-900">
              {proposal.choices[choice]}
            </p>
            <p
              className="text-neutral w-full cursor-pointer font-normal hover:text-gray-700"
              onClick={back}
            >
              Back
            </p>
          </div> */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <div className="min-w-fit">
              <Image
                src={user?.avatarSrc || defaultAvatar}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div className="space-between flex flex-col items-baseline space-y-0">
              <p className="text-xl font-semibold">{user?.name || "You"}</p>
              <div className="flex flex-row space-x-2">
                <p>
                  {authorTags
                    .slice(0, 3)
                    .map(({ tag }) => tag)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
          {canPost && (
            <button
              className="btn group"
              onClick={() => {
                signMessage({
                  message: JSON.stringify(comment),
                });
                // postComment();
                // vote(message)
              }}
            >
              <p className="min-w-[10vw] group-hover:hidden">Submit</p>
              <div className="hidden min-w-[10vw] flex-col items-start group-hover:flex">
                <p className="text-2xs">Voting</p>
                <p>{proposal.choices?.[choice]}</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
