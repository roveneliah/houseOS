import dynamic from "next/dynamic";
export const FriendsList = dynamic(() => import("./FriendsList"));

export function FollowingView(props: any) {
  return (
    <div className="flex w-full flex-col space-y-2 overflow-hidden rounded-b-lg">
      {props.friends?.length > 0 ? (
        <FriendsList friends={props.friends} />
      ) : (
        <div className="flex flex-col space-y-2 p-12">
          <p className="text-lg">
            {!props.user?.name
              ? "Loading..."
              : `${props.user.name} isn't following anyone.`}
          </p>
        </div>
      )}
    </div>
  );
}
