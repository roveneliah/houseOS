import CommentListItem from "./CommentListItem";
import TagSelector from "./TagSelector";

export default function CommentList({ comments, toggleCommentView }: any) {
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
      <TagSelector
        tags={[
          "Compensation",
          "Project",
          "Purchase",
          "All Hands on Deck!",
          "Basketball",
          "Multi-sig",
          "Stewards",
        ]}
      />
      <div>
        {comments.map((comment: any) => (
          <CommentListItem comment={comment} />
        ))}
      </div>
    </div>
  );
}
