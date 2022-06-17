import { Comment } from "../../types/Comment";
import Link from "next/link";

export default function CommentList({
  comments,
}: {
  comments: Array<Comment>;
}) {
  return (
    <div className="overflow-hidden rounded-lg">
      {comments.map((comment: Comment, i: number) => {
        return (
          <Link href={`/proposals/${comment.proposalId}`} key={i}>
            <div
              className={`flex cursor-pointer flex-col space-y-4 ${
                i % 2 ? "bg-gray-200" : "bg-gray-100"
              } p-10`}
            >
              <p className="text-xl font-normal text-gray-700">
                {comment.body}
              </p>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-gray-700">
                  {comment.proposalTitle}
                </p>
                <p className="badge badge-dark">{comment.choice}</p>
              </div>
              {comment.vp && (
                <p className="badge badge-dark">{comment.vp} $KRAUSE</p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
