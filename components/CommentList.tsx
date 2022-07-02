import { Comment } from "../types/Comment";
import { useMemo, useState } from "react";
import { Proposal } from "@snapshot-labs/snapshot.js/dist/sign/types";
import { userTags } from "../config";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";

import dynamic from "next/dynamic";
import { useSignIn } from "@/hooks/useSignIn";
const CommentListItem = dynamic(() => import("./CommentListItem"));
const TagSelector = dynamic(() => import("./TagSelector"));

interface Props {
  comments: Array<Comment>;
  toggleCommentView: any;
  proposal: Proposal;
  choice: number;
}

export default function CommentList({
  comments = [],
  toggleCommentView,
  proposal,
  choice,
}: Props) {
  const tags = userTags;
  const [selectedTags, setSelectedTags] = useState([]);
  const { signedIn } = useSignIn();

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
            {proposal?.choices?.[choice]}
          </p>
          {signedIn ? (
            <p
              className="cursor-pointer text-4xl font-bold text-gray-900 hover:text-gray-600"
              onClick={toggleCommentView}
            >
              Comment
            </p>
          ) : (
            <p className="cursor-pointer text-xl font-bold text-gray-900 hover:text-gray-600">
              Sign in to Comment
            </p>
          )}
        </div>
        {sortedFilteredComments.length > 0 && (
          <TagSelector
            tags={tags.map(({ name }) => name)}
            setSelectedTags={setSelectedTags}
          />
        )}
      </div>
      <div className="flex flex-col space-y-4">
        {sortedFilteredComments.length > 0 ? (
          sortedFilteredComments.map((comment: Comment, i: number) => (
            <CommentListItem
              key={i}
              index={i}
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
