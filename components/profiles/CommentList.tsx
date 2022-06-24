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
              className={`flex cursor-pointer flex-col space-y-0 ${
                i % 2 ? "bg-gray-300" : "bg-gray-200"
              }`}
            >
              <div className="w-full bg-gray-300 px-8 py-3">
                <p className="font-semibold text-gray-900">{comment.choice}</p>
              </div>
              <div className="flex flex-col space-y-3 px-8 py-6">
                <div className="flex flex-row justify-between space-x-2 overflow-hidden whitespace-nowrap">
                  <p className="text-lg font-semibold text-gray-800">
                    {comment.proposalTitle}
                  </p>
                </div>
                <div className="w-11/12">
                  <p className="text-md font-normal text-gray-800">
                    {comment.body}
                  </p>
                </div>
                {/* {comment.vp && (
                <p className="badge badge-dark">{comment.vp} $KRAUSE</p>
              )} */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
