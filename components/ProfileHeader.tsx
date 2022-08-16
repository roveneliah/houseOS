import Image from "next/image";
import { dao, defaultAvatar } from "../config";
import TagsList from "./profiles/TagsList";

export function ProfileHeader(props: any) {
  return (
    <div className="flex w-full flex-row justify-center">
      <div className="flex w-full max-w-3xl flex-col items-start space-y-12">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex w-full flex-col items-start justify-start space-y-4">
            <div className="flex w-full flex-row space-x-2">
              {props.signedIn && (
                <div className="flex flex-row justify-start space-x-2">
                  {props.isFriend ? (
                    <p
                      className="border-success text-success min-w-fit cursor-pointer rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50"
                      onClick={() => props.profile?.removeFriend(props.address)}
                    >
                      Following
                    </p>
                  ) : (
                    <p
                      className="border-warning text-warning min-w-fit cursor-pointer rounded-full border px-3 py-1 text-sm font-semibold hover:bg-opacity-50"
                      onClick={() => props.profile?.addFriend(props.address)}
                    >
                      Follow
                    </p>
                  )}
                </div>
              )}
              <TagsList tags={props.tags} disabled={true} size="sm" max={3} />
            </div>
            <p className="text-base-content text-left text-6xl font-bold">
              {props.name || props.ensName || `Anon ${dao.memberName}`}
            </p>
          </div>
          <div className="hidden rounded-full lg:block">
            <Image
              src={props.avatarSrc || defaultAvatar}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>
        <div
          className={`bg-${props.widgetBackground} flex w-full flex-row justify-between space-x-0 overflow-hidden rounded-t-lg border-b`}
        >
          {props.views.map(
            ({ name: viewName, toggle, selected, icon }: any, i: number) => (
              <div
                className={`flex w-full flex-row items-center space-x-2 ${
                  selected
                    ? "text-base-content border-base-content border-b-2"
                    : "text-base-content"
                } px-6 py-3 hover:bg-gray-100`}
                onClick={toggle}
                key={i}
              >
                {icon({})}
                <p className="text-md py-2 font-semibold">{viewName}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
