import Image from "next/image";
import Link from "next/link";
import { gt, lt, intersection, length, compose } from "ramda";
import { defaultAvatar } from "../config";
import { useGetUser } from "../hooks/database/useGetUser";
import { useListenUserTags } from "../hooks/database/useListenUserTags";
import { User } from "../types/User";
import TagsList from "./profiles/TagsList";

export default function CommentListItem({ comment, selectedTags, index }: any) {
  const user: User = useGetUser(comment.author);
  const tags = useListenUserTags(comment.author);
  const isSelected =
    selectedTags.length === 0 ||
    length(
      intersection(
        selectedTags,
        tags.map(({ tag }) => tag)
      )
    ) > 0;

  return isSelected ? (
    <div
      className={`flex flex-row justify-between space-x-2 overflow-hidden whitespace-nowrap ${
        index % 2 ? "bg-gray-200" : "bg-gray-300"
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
              <TagsList tags={tags} disabled={true} max={4} numbered={false} />
              <p className="text-left text-xl font-bold text-gray-700">
                {user?.name}
              </p>
            </div>
          </div>
          <p className="whitespace-pre-wrap pr-4 text-left text-gray-900">
            {comment.body}
          </p>
        </div>
      </div>
      {comment.vp && <p className="badge">{comment.vp.toFixed()} $KRAUSE</p>}
    </div>
  ) : (
    <></>
  );
}
