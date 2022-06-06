import CommentListItem from "./CommentListItem";
import TagSelector from "./TagSelector";
import { useGetUserTags } from "../hooks/tags/useGetUserTags";
import { Comment } from "../types/Comment";
import { useState } from "react";
import { useGetAllUserTags } from "../hooks/tags/useGetAllUserTags";

interface Props {
  comments: Array<Comment>;
  toggleCommentView: any;
  votes: Array<any>;
}

export default function CommentList({
  comments,
  votes,
  toggleCommentView,
}: Props) {
  const tags = useGetAllUserTags();
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex w-full flex-row justify-between border-b-2 border-gray-900">
        <p className="text-4xl font-bold text-gray-900">For</p>
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
        {comments.map((comment: any, i: number) => (
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
