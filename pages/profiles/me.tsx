import { useViewerRecord } from "@self.id/framework";
import Image from "next/image";
import { compose, prop } from "ramda";
import { useState } from "react";
import { useAccount, useEnsName } from "wagmi";
import Layout from "../../components/Layout";
import { defaultAvatar } from "../../config";
import { $KRAUSE, useGetBalanceOf } from "../../hooks/useGetBalanceOf";
import { useGetUser } from "../../hooks/useGetUser";
import { LoadingView, ProfilePreview } from "./[address]";
import { EthereumAddress } from "../../types/EthereumAddress";

// Mutate the record
export function SetViewerName() {
  const record = useViewerRecord("basicProfile");
  const [name, setName] = useState("");

  console.log(
    record.isMutable,
    record.isMutating,
    record.isError,
    record.isLoading
  );

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button
        disabled={!record.isMutable || record.isMutating}
        onClick={async () => {
          await record.merge({
            name,
            // friends: ["0xaD9637425622590226f7ca75b54Be2BfB403E2b4"],
            // delegates: ["did:3:asdfasdfasf23423dsf"],
            // tags: ["Tester", "Dev Team"],
            // team: "Killers 3s (jk)",
            // avatar:
            //   "https://pbs.twimg.com/profile_images/1518835085679734785/osnHKbcw_400x400.jpg",
          });
        }}
        className="btn btn-outline"
      >
        Set name
      </button>
    </div>
  );
}

export function LoginView() {
  return (
    <div>
      <p>Please log in!</p>
    </div>
  );
}

export default function MyProfile() {
  const address = compose(prop("address"), prop("data"), useAccount)();
  const { content: profile, isError, isLoading, error } = useGetUser(address); // TODO: preload this in static props
  const krauseBalance = useGetBalanceOf({
    tokenAddress: $KRAUSE,
    address,
  });
  const { data: ensName } = useEnsName({ address });
  return (
    <Layout>
      <div className="flex w-full flex-col space-y-32 px-72 pt-20">
        {!address ? (
          <LoginView />
        ) : isLoading ? (
          <LoadingView address={ensName || address} />
        ) : (
          <>
            <div className="flex w-full flex-row items-center justify-between">
              <div className="justfiy-start flex flex-col items-start space-y-2">
                <div className="flex flex-row space-x-2">
                  {profile?.tags?.map((tag: string) => (
                    <p className="badge badge-dark">{tag}</p>
                  ))}
                </div>
                <p className="text-left text-5xl font-bold text-gray-700">
                  {profile?.name || ensName || "Anon Jerry"}
                </p>
                <p className="font-semibold text-gray-200">followed by </p>
                <p className="font-semibold text-gray-200">
                  {Number(krauseBalance)} $KRAUSE
                </p>
              </div>
              <div className="ring-primary rounded-full border-4 ring-4">
                <Image
                  src={profile?.avatar || defaultAvatar}
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
                {profile?.friends?.map((address: EthereumAddress) => (
                  <ProfilePreview address={address} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
