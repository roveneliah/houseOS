import { Comment } from "../../types/Comment";
import { useAppDispatch } from "@/redux/app/hooks";
import ProposalPage from "@/components/proposals/[id]";
import { launch } from "@/redux/features/windows/windowsSlice";
import { useAppLauncher } from "@/hooks/useAppLauncher";

export default function CommentList({
  comments,
}: {
  comments: Array<Comment>;
}) {
  const { launchProposal } = useAppLauncher();

  return (
    <div className="flex flex-col space-y-0">
      {comments.map((comment: Comment, i: number) => {
        return (
          <div
            className=" group flex w-full flex-col space-y-4 overflow-hidden border-b px-8 py-6"
            key={i}
          >
            <div className="flex w-full flex-col space-y-2">
              {comment.choice && (
                <div className="border-neutral border-b">
                  <p className="text-base-content text-md text-md rounded-md font-semibold">
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

            <button onClick={() => launchProposal(comment.proposalId)} key={i}>
              <div className="flex cursor-pointer flex-row justify-between space-x-2 overflow-hidden">
                <p className="text-base-content text-md font-light">
                  {comment.proposalTitle}
                </p>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
