import Image from "next/image";
import Link from "next/link";
import { defaultAvatar } from "../../../config";
import { useGetUser } from "../../../hooks/database/useGetUser";
import { useListenUserTags } from "../../../hooks/database/useListenUserTags";
import { TagsList } from "../TagsList";

export function ProfilePreview({ address, i }: any) {
  const user = useGetUser(address);
  const { avatarSrc, name } = user;
  const tags = useListenUserTags(address);

  return (
    <Link href={`/profiles/${address}`}>
      <div
        className={`flex w-full cursor-pointer flex-row items-center justify-between`}
        key={i}
      >
        <div
          className={`flex w-full flex-row space-x-4 px-6 py-4 ${
            i % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
          }`}
        >
          <Image
            src={avatarSrc || defaultAvatar}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex w-full flex-col items-start justify-center space-y-2">
            <div className="flex w-full flex-row items-baseline justify-between space-x-2">
              <p className="text-lg font-semibold text-gray-700">{name}</p>
              <p className="badge badge-dark badge-sm">{address.slice(0, 8)}</p>
            </div>
            <TagsList tags={tags} disabled={true} />
          </div>
        </div>
      </div>
    </Link>
  );
}
