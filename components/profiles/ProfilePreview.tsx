import Image from "next/image";
import Link from "next/link";
import { EthereumAddress } from "../../types/EthereumAddress";
import { dao, defaultAvatar } from "../../config";
import { useGetUser } from "../../hooks/database/useGetUser";
import { useListenUserTags } from "../../hooks/database/useListenUserTags";
import TagsList from "./TagsList";

export default function ProfilePreview({
  address,
  i,
}: {
  address: EthereumAddress;
  i: number;
}) {
  const user = useGetUser(address);
  const { avatarSrc, name } = user;
  const tags = useListenUserTags(address);

  return (
    <div
      className={`flex w-full flex-row items-center justify-between`}
      key={i}
    >
      <div
        className={`flex w-full flex-row space-x-4 rounded-md px-6 py-4 ${
          i % 2 === 0 ? "bg-gray-100" : "bg-gray-300"
        }`}
      >
        <Link href={`/profiles/${address}`}>
          <Image
            src={avatarSrc || defaultAvatar}
            width={80}
            height={80}
            className="cursor-pointer rounded-full"
          />
        </Link>
        <div className="flex w-full flex-col items-start justify-center space-y-2">
          <div className="flex w-full flex-row items-baseline justify-between space-x-2">
            <p className="text-lg font-semibold text-gray-700">{name}</p>
            <p className="badge badge-dark badge-sm">{address.slice(0, 8)}</p>
          </div>
          <TagsList tags={tags} max={3} disabled={true} numbered={false} />
        </div>
      </div>
    </div>
  );
}
