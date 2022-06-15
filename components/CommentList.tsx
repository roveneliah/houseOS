import CommentListItem from "./CommentListItem";
import TagSelector from "./TagSelector";
import { Comment } from "../types/Comment";
import { useMemo, useState } from "react";
import { useGetAllUserTags } from "../hooks/tags/useGetAllUserTags";
import { Proposal } from "@snapshot-labs/snapshot.js/dist/sign/types";
import { userTags } from "../config";

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

  // TODO: #8 Load in voting power
  // const sortedComments = useMemo(
  //   () => comments.sort((a, b) => b.votingPower - a.votingPower),
  //   comments
  // );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex w-full flex-row justify-between border-b-2 border-gray-900">
        <p className="text-4xl font-bold text-gray-900">
          {proposal.choices[choice]}
        </p>
        <p
          className="cursor-pointer text-4xl font-bold text-gray-900 hover:text-gray-600"
          onClick={toggleCommentView}
        >
          Vote
        </p>
      </div>
      <TagSelector tags={tags} setSelectedTags={setSelectedTags} />
      <div>
        {/* TODO: HANDLE VOTE */}
        {/* {votes.map((vote: any, i: number) => (
          <CommentListItem key={i} comment={vote} selectedTags={selectedTags} />
        ))} */}
        {comments
          .filter((comment) => comment.choice === choice + 1)
          .map((comment: Comment, i: number) => (
            <CommentListItem
              key={i}
              comment={comment}
              selectedTags={selectedTags}
            />
          ))}
      </div>
    </div>
  );
}
