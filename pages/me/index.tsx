import Image from "next/image";
import Layout from "../../components/Layout";
import { defaultAvatar } from "../../config";
import { ProfilePreview } from "../profiles/components/ProfilePreview";
import { LoadingView } from "../profiles/components/LoadingView";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { LoginView } from "./components/LoginView";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";
import { useListenUserTags } from "../../hooks/database/useListenUserTags";
import { useUserAddress } from "../../hooks/ethereum/useUserAddress";

const useGetAllComments = (address: EthereumAddress) => {
  return [];
};

export default function MyProfile() {
  const user: User = useGetUserProfile();
  const address = useUserAddress();
  const tags = useListenUserTags(address);
  const krauseBalance = useKrauseBalance(address);

  const comments = useGetAllComments(address);

  const avatarSrc = user?.avatarSrc;
  const friends = user?.friends;

  return (
    <Layout>
      {!address ? (
        <LoginView />
      ) : (
        <div className="flex w-full flex-col space-y-32 px-72 pt-36">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="justfiy-start flex flex-col items-start space-y-2">
              <div className="flex flex-row space-x-2">
                {tags.map((tag: any, i: number) => (
                  <p
                    key={i}
                    className="badge badge-dark"
                    onClick={() => user?.removeTag(tag)}
                  >
                    {tag.tag}
                  </p>
                ))}
              </div>
              <p
                onClick={() => user?.addTags("Steward", "Ohhh yea!")}
                className="text-left text-5xl font-bold text-gray-700"
              >
                {user?.name}
              </p>
              <p className="font-semibold text-gray-200">
                {Number(krauseBalance)} $KRAUSE
              </p>
            </div>
            <div className="ring-primary rounded-full border-4 ring-4">
              <Image
                src={avatarSrc || defaultAvatar}
                width={150}
                height={150}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-left text-3xl font-bold text-gray-200">
              Comments
            </p>
            {comments && comments.length > 0 ? (
              <div className="flex flex-col">
                {comments.map((comment, i) => (
                  <p>{i}</p>
                ))}
              </div>
            ) : (
              <p className="font-semibold">
                Any comments you leave on proposals will show up here.
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-left text-3xl font-bold text-gray-200">
              Friends
            </p>
            {friends && friends.length > 0 ? (
              <div className="flex flex-col space-y-4">
                {friends?.map((address: EthereumAddress, i: number) => (
                  <ProfilePreview address={address} key={i} />
                ))}
              </div>
            ) : (
              <p className="font-semibold">
                You can add friends by searching in the command palette. By
                friending Jerry's, you borrow their labels on other users and
                proposals.
              </p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
