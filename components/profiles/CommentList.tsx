import { Comment } from "../../types/Comment";
import Link from "next/link";

export default function CommentList({
  comments,
}: {
  comments: Array<Comment>;
}) {
  return (
    <div className="flex flex-col space-y-0">
      {comments.map((comment: Comment, i: number) => {
        return (
          <div
            className="bg-primary-content group flex w-full flex-col space-y-4 overflow-hidden border-b px-8 py-6"
            key={i}
          >
            <div className="flex w-full flex-col space-y-2">
              {comment.choice && (
                <div className="border-neutral border-b">
                  <p className="text-neutral-focus text-md text-md rounded-md font-semibold">
                    {comment.choice}
                  </p>
                </div>
              )}
              <div className="flex-col space-y-3 py-0 group-hover:flex">
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
            <div className="bg-primary-content flex w-full flex-col items-baseline space-y-0 overflow-hidden py-3">
              <Link href={`/proposals/${comment.proposalId}`} key={i}>
                <div className="flex cursor-pointer flex-row justify-between space-x-2 overflow-hidden">
                  <p className="text-neutral text-md font-light">
                    {comment.proposalTitle}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
