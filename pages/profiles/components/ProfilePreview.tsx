import Image from "next/image";
import { defaultAvatar } from "../../../config";
import { useGetCeramicUser } from "../../../hooks/ceramic/useGetCeramicUser";
import { useGetUser } from "../../../hooks/database/useGetUser";

export function ProfilePreview({ address }: any) {
  const user = useGetUser(address);
  const { avatarSrc, name } = user;
  return (
    <div className="">
      <div className="ring-primary flex flex-row space-x-4 rounded-full border-4 ring-4">
        <Image
          src={avatarSrc || defaultAvatar}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg font-semibold text-gray-200">{name}</p>
          <p>{address.slice(0, 8)}</p>
        </div>
      </div>
    </div>
  );
}
