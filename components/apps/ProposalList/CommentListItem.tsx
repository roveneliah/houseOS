import { useUserAddress } from "@/hooks/ethereum/useUserAddress";
import Image from "next/image";
import { intersection, length, prop } from "ramda";
import { User } from "@/types/User";
import { useListenUserTags } from "@/hooks/database/useListenUserTags";
import { useGetUser } from "@/hooks/database/useGetUser";
import { defaultAvatar } from "@/config";

export default function CommentListItem({
  comment,
  selectedTags,
  choiceTitle,
  index,
}: any) {
  const address = useUserAddress();
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
    <div className="flex flex-row justify-between space-x-2 whitespace-nowrap px-6">
      <div className="text-base-content bg-base-200 border-base-100 flex w-full flex-col space-y-0 border py-2">
        <div className="flex w-full flex-row justify-start space-x-2 p-4">
          <div className="flex w-full flex-col justify-start space-y-4 px-0">
            <div className="rounded-lg p-4">
              <p className="whitespace-pre-wrap rounded-md pr-4 text-left text-lg">
                {comment.body}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between space-x-2 py-2 px-6">
          <div className="hidden h-fit min-w-fit flex-row items-start justify-end rounded-full lg:flex">
            <a href={`/profiles/${comment.author}`}>
              <Image
                src={user?.avatarSrc || defaultAvatar}
                width={60}
                height={60}
                className="cursor-pointer rounded-full"
                objectFit="contain"
              />
            </a>
          </div>
          <div className="flex w-full flex-col items-start justify-between space-y-1 p-2">
            <p className="text-md text-left font-semibold">{choiceTitle}</p>
            <p className="text-md text-left font-normal">
              - {user?.name || address}
            </p>
            <div className="flex flex-row space-x-1">
              <p className="text-ellipsis text-sm font-light">
                {tags.map(prop("tag")).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
