import { Comment } from "../types/Comment";
import { useMemo, useState } from "react";
import { Proposal } from "@snapshot-labs/snapshot.js/dist/sign/types";
import { userTags } from "../config";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";

import dynamic from "next/dynamic";
const CommentListItem = dynamic(() => import("./CommentListItem"));
const TagSelector = dynamic(() => import("./TagSelector"));

interface Props {
  comments: Array<Comment>;
  toggleCommentView: any;
  proposal: Proposal;
  choice: number;
}

export default function CommentList({
  comments,
  toggleCommentView,
  proposal,
  choice,
}: Props) {
  const tags = userTags;
  const [selectedTags, setSelectedTags] = useState([]);
  const address = useUserAddress();

  const sortedFilteredComments = useMemo(
    () =>
      comments
        .sort((a, b) => (b.vp || 0) - (a.vp || 0))
        .filter((comment) => Number(comment.choice) === choice + 1),
    [comments, choice]
  );

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex w-full flex-row items-baseline justify-between border-b-2 border-gray-900">
          <p className="text-4xl font-bold text-gray-900">
            {proposal.choices[choice]}
          </p>
          {address ? (
            <p
              className="cursor-pointer text-4xl font-bold text-gray-900 hover:text-gray-600"
              onClick={toggleCommentView}
            >
              Vote
            </p>
          ) : (
            <p className="cursor-pointer text-xl font-bold text-gray-900 hover:text-gray-600">
              Sign in to Vote
            </p>
          )}
        </div>
        {address && (
          <TagSelector tags={tags} setSelectedTags={setSelectedTags} />
        )}
      </div>
      <div>
        {sortedFilteredComments?.length > 0 ? (
          sortedFilteredComments.map((comment: Comment, i: number) => (
            <CommentListItem
              key={i}
              comment={comment}
              selectedTags={selectedTags}
            />
          ))
        ) : (
          <p className="text-left text-3xl font-semibold text-gray-800">
            No comments yet.
          </p>
        )}
      </div>
    </div>
  );
}
