import Image from "next/image";
import { useState } from "react";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { snapshotSpace } from "../config";
import { useGetUserTags } from "../hooks/tags/useGetUserTags";
import { useVote } from "../hooks/useVote";
import { useGetAvatar } from "../hooks/useGetAvatar";

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
  const [message, setMessage] = useState("");
  const { data: account } = useAccount();
  const authorTags = useGetUserTags(account?.address);
  const avatarSrc = useGetAvatar(account?.address);
  const { data: name } = useEnsName({ address: account?.address });

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row items-end justify-between border-b-2 border-gray-900">
        <p className="text-4xl font-bold text-gray-900">For</p>
        <p
          className="font-semibold text-gray-900 hover:text-gray-700"
          onClick={back}
        >
          Back to Comments
        </p>
      </div>
      <div className="flex flex-col space-y-8 rounded-lg bg-gray-50/50 px-6 pb-4 pt-8">
        <textarea
          className="w-full rounded-lg border border-gray-500 bg-transparent p-6 text-lg font-semibold text-gray-900 outline-0"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-5">
            <div className="min-w-fit">
              <Image
                src={avatarSrc}
                width={75}
                height={75}
                className="rounded-full"
              />
            </div>
            <div className="space-between flex flex-col items-start space-y-2 text-gray-900">
              <div className="flex flex-row space-x-2">
                {authorTags.map((tag) => (
                  <p className="badge">{tag}</p>
                ))}
              </div>
              <p className="text-xl font-semibold">
                {name || account?.address}
              </p>
            </div>
          </div>
          <button className="btn" onClick={() => vote(message)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
