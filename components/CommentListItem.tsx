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
  console.log(tags);
  console.log(
    intersection(
      selectedTags,
      tags.map(({ tag }) => tag)
    )
  );

  console.log(selectedTags);

  return isSelected ? (
    <div className="flex flex-row justify-between space-x-2 overflow-hidden whitespace-nowrap rounded-md border-b px-6 py-6 pb-10">
      <div className="flex flex-col space-y-4">
        <div className="flex w-full flex-row justify-start ">
          {/* <div className="hidden h-fit min-w-fit flex-row items-start justify-end rounded-full border-2 border-gray-400 lg:flex">
            <Link href={`/profiles/${comment.author}`}>
              <Image
                src={user?.avatarSrc || defaultAvatar}
                width={75}
                height={75}
                className="cursor-pointer rounded-full"
                objectFit="contain"
              />
            </Link>
          </div> */}
          <div className="flex w-full flex-col justify-start space-y-4 px-2">
            <div className="flex w-full flex-row items-center justify-between space-x-4 border-b pb-1">
              <div className="flex w-full flex-row justify-between space-x-4">
                <p className="text-left text-xl font-bold text-gray-700">
                  {user?.name}
                </p>
                <div>
                  {tags.length > 0 && (
                    <TagsList
                      tags={tags}
                      disabled={true}
                      max={3}
                      numbered={true}
                    />
                  )}
                </div>
              </div>
            </div>
            <p className="whitespace-pre-wrap pr-4 text-left text-gray-900">
              {comment.body}
            </p>
          </div>
        </div>
      </div>
      {comment.vp && <p className="badge">{comment.vp.toFixed()} $KRAUSE</p>}
    </div>
  ) : (
    <></>
  );
}
