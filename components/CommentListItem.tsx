import Image from "next/image";
import Link from "next/link";
import { gt, lt, intersection, length, compose, prop } from "ramda";
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
    <div className="flex flex-row justify-between space-x-2 whitespace-nowrap rounded-md px-6">
      <div className="flex w-full flex-col space-y-0 rounded-lg bg-gray-100">
        <div className="flex w-full flex-row justify-start space-x-2 border-b p-4">
          <div className="flex w-full flex-col justify-start space-y-4 px-0">
            <div className="rounded-lg p-4">
              <p className="text-neutral whitespace-pre-wrap rounded-md pr-4 text-left text-lg">
                {comment.body}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between space-x-2 py-2 px-6">
          <div className="hidden h-fit min-w-fit flex-row items-start justify-end rounded-full lg:flex">
            <Link href={`/profiles/${comment.author}`}>
              <Image
                src={user?.avatarSrc || defaultAvatar}
                width={60}
                height={60}
                className="cursor-pointer rounded-full"
                objectFit="contain"
              />
            </Link>
          </div>
          <div className="flex w-full flex-col items-start justify-between">
            <p className="text-md text-neutral text-left font-semibold">
              {user?.name}

              {/* {comment.vp && (
                    <span className="text-gray-500">
                      voted with {comment.vp.toFixed()} $KRAUSE
                    </span>
                  )} */}
            </p>
            <div className="flex flex-row space-x-1">
              <p className="text-ellipsis text-sm font-light text-gray-600">
                {tags.map(prop("tag")).join(", ")}
              </p>
              {/* {tags.length > 0 && (
                    <TagsList
                      tags={tags}
                      disabled={true}
                      max={3}
                      numbered={true}
                    />
                  )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
