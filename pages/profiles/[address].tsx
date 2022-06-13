import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useConnect, useEnsName } from "wagmi";
import Layout from "../../components/Layout";
import { EthereumAddress } from "../../types/EthereumAddress";
import { LoadingView } from "./components/LoadingView";
import { ProfilePreview } from "./components/ProfilePreview";
import { useKrauseBalance } from "../../hooks/ethereum/useKrauseBalance";
import { useGetUser } from "../../hooks/ceramic/useGetUser";
import { getUser, getUsers } from "../../utils/firebase/user";

export const simpleNoteSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "SimpleNote",
  type: "object",
  properties: {
    body: {
      type: "string",
      title: "body",
      maxLength: 4000,
    },
    title: {
      type: "string",
      title: "title",
      maxLength: 4000,
    },
  },
  required: ["body", "title"],
};

export default function Profile({ user }: any) {
  const { address } = user;
  const u = useGetUser(address); // TODO: preload this in static props
  const krauseBalance = useKrauseBalance(address);
  const { data: ensName } = useEnsName({ address });

  return (
    <Layout>
      <div className="flex w-full flex-col space-y-32 px-72 pt-20">
        {!address ? (
          <LoadingView address={ensName || address} />
        ) : (
          <>
            <div className="flex w-full flex-row items-center justify-between">
              <div className="justfiy-start flex flex-col items-start space-y-2">
                <div className="flex flex-row space-x-2">
                  {user.tags?.map((tag: any, i: number) => (
                    <p className="badge badge-dark" key={i}>
                      {tag.tag} [{tag.taggers.length || ""}]
                    </p>
                  ))}
                </div>
                <p className="text-left text-5xl font-bold text-gray-700">
                  {user.name || ensName || "Anon Jerry"}
                </p>
                <p className="font-semibold text-gray-200">followed by </p>
                <p className="font-semibold text-gray-200">
                  {Number(krauseBalance)} $KRAUSE
                </p>
              </div>
              <div className="ring-primary rounded-full border-4 ring-4">
                <Image
                  src={user.avatarSrc || user.avatarUrl}
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
                {user.profile?.friends?.map(
                  (address: EthereumAddress, i: number) => (
                    <ProfilePreview address={address} key={i} />
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }: any) {
  const user = await getUser(params.address);
  return {
    props: {
      user,
    },
  };
}

export async function getStaticPaths() {
  const users = await getUsers();
  const paths = users.map((user) => ({
    params: { address: user.address },
  }));
  return { paths, fallback: false };
}
