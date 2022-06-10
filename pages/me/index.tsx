import { useViewerConnection } from "@self.id/framework";
import Image from "next/image";
import { compose, prop } from "ramda";
import { useEnsName } from "wagmi";
import Layout from "../../components/Layout";
import { defaultAvatar } from "../../config";
import { ProfilePreview } from "../profiles/components/ProfilePreview";
import { LoadingView } from "../profiles/components/LoadingView";
import { EthereumAddress } from "../../types/EthereumAddress";
import { User } from "../../types/User";
import { useGetUserProfile } from "../../hooks/users/useGetUserProfile";
import { LoginView } from "./components/LoginView";
import { useUserAddress } from "../../hooks/ethereum/useUserAddress";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";

export default function MyProfile() {
  const address = useUserAddress();
  const krauseBalance = useKrauseBalance(address);

  const { data: ensName } = useEnsName({ address });
  const [connection] = useViewerConnection();
  const user: User = useGetUserProfile();
  const { name, friends, tags, avatarSrc } = user;

  return (
    <Layout>
      <div className="flex w-full flex-col space-y-32 px-72 pt-36">
        {!address || connection.status === "idle" ? (
          <LoginView />
        ) : connection.status === "connecting" ? (
          <LoadingView address={ensName || address} />
        ) : (
          <>
            <div className="flex w-full flex-row items-center justify-between">
              <div className="justfiy-start flex flex-col items-start space-y-2">
                <div className="flex flex-row space-x-2">
                  {tags?.map((tag: string, i: number) => (
                    <p
                      key={i}
                      className="badge badge-dark"
                      onClick={() => user?.removeTag(tag)}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
                <p
                  onClick={() => user?.addTags("Steward", "Ohhh yea!")}
                  className="text-left text-5xl font-bold text-gray-700"
                >
                  {name || ensName || "Anon Jerry"}
                </p>
                <p className="font-semibold text-gray-200">followed by </p>
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
            <div>
              <p className="text-left text-3xl font-bold text-gray-200">
                Comments
              </p>
            </div>
            <div className="flex flex-col space-y-6">
              <p className="text-left text-3xl font-bold text-gray-200">
                Friends
              </p>
              <div className="flex flex-col space-y-4">
                {friends?.map((address: EthereumAddress, i: number) => (
                  <ProfilePreview address={address} key={i} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
