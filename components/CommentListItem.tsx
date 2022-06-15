import Image from "next/image";
import Link from "next/link";
import { gt, lt, intersection, length, compose } from "ramda";
import { defaultAvatar } from "../config";
import { useGetUser } from "../hooks/database/useGetUser";
import { useListenUserTags } from "../hooks/database/useListenUserTags";
import { User } from "../types/User";

export default function CommentListItem({ comment, selectedTags }: any) {
  const user: User = useGetUser(comment.author);
  const tags = useListenUserTags(comment.author);
  const isSelected =
    selectedTags.length !== 0 || length(intersection(selectedTags, tags)) > 0;

  return isSelected ? (
    <div
      className={`flex flex-row justify-between space-x-2 overflow-hidden whitespace-nowrap ${
        comment.active ? "bg-gray-50" : "bg-gray-300"
      } px-8 py-8`}
    >
      <div className="flex flex-row">
        <div className="flex min-w-fit flex-row items-start justify-end">
          <Link href={`/profiles/${comment.author}`}>
            <Image
              src={user?.avatarSrc || defaultAvatar}
              width={75}
              height={75}
              className="cursor-pointer rounded-full"
              objectFit="contain"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-between space-y-2 px-4">
          <div className="flex flex-row justify-between space-x-4">
            <div className="flex flex-col justify-start space-y-2">
              <div className="flex flex-row space-x-2 overflow-x-auto">
                {tags.map(({ tag }: any, i: number) => (
                  <p className="badge" key={i}>
                    {tag}
                  </p>
                ))}
              </div>
              <p className="text-left text-xl font-bold text-gray-700">
                {user?.name}
              </p>
            </div>
          </div>
          <p className="pr-4 text-left text-gray-900">{comment.body}</p>
        </div>
      </div>
      <p className="badge">{comment.votingPower} $KRAUSE</p>
    </div>
  ) : (
    <></>
  );
}
