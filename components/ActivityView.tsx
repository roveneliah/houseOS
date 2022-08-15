import CommentList from "./profiles/CommentList";

export function ActivityView(props: any) {
  return (
    <div className="flex w-full flex-col space-y-4">
      {props.comments?.length > 0 ? (
        <CommentList comments={props.comments} />
      ) : (
        <div className="bg-base-100 text-base-content flex flex-col space-y-2 p-12">
          <p className="text-lg">No comments found.</p>
          <p className="text-md">
            Go nudge them to participate. There may be something special for
            those who do.
          </p>
        </div>
      )}
    </div>
  );
}
