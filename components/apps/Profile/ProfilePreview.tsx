import Image from "next/image";
import { EthereumAddress } from "@/types/EthereumAddress";
import { useEffect, useState } from "react";
import { useListenUserTags } from "@/hooks/database/useListenUserTags";
import { useGetUser } from "@/hooks/database/useGetUser";
import { defaultAvatar } from "@/config";

export default function ProfilePreview({
  address,
  i,
}: {
  address: EthereumAddress;
  i: number;
}) {
  const user = useGetUser(address);
  const { avatarSrc, name } = user;

  const [profileUrl, setProfileUrl] = useState(avatarSrc);
  useEffect(() => setProfileUrl(avatarSrc), [avatarSrc]);

  const tags = useListenUserTags(address);

  return (
    <div
      className="flex w-full flex-row items-center justify-between border-b"
      key={i}
    >
      <div className="flex w-full flex-row space-x-4 px-6 py-4">
        <a href={`/profiles/${address}`}>
          <Image
            alt="User Avatar"
            src={profileUrl || defaultAvatar}
            width={60}
            height={60}
            className="h-fit w-fit cursor-pointer rounded-full"
            onError={() => setProfileUrl(defaultAvatar)}
          />
        </a>
        <div className="flex w-full flex-col items-start justify-center space-y-0">
          <div className="flex w-full flex-row items-baseline justify-between space-x-2">
            <p className="text-base-content text-md font-semibold">{name}</p>
            {/* <p className="badge badge-dark badge-sm">{address.slice(0, 8)}</p> */}
          </div>
          <p className="text-base-content/50 text-sm">
            {tags.map(({ tag }: any) => tag).join(", ")}
          </p>
          {/* <TagsList tags={tags} max={3} disabled={true} numbered={false} /> */}
        </div>
      </div>
    </div>
  );
}
