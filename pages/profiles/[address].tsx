import Image from "next/image";
import { compose, prop } from "ramda";
import { useAccount, useBalance, useConnect } from "wagmi";
import Layout from "../../components/Layout";
import { useGetUserTags } from "../../hooks/tags/useGetUserTags";
import { $KRAUSE, useGetBalanceOf } from "../../hooks/useGetBalanceOf";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetUsers } from "../../hooks/useGetUsers";

export default function Profile({ user }: any) {
  const address = compose(prop("address"), prop("data"), useAccount)();
  const profile = useGetUser(address);
  // const tags = useGetUserTags(user.id);
  const krauseBalance = useGetBalanceOf({
    tokenAddress: $KRAUSE,
    address,
  });

  console.log(profile.content);

  return (
    <Layout>
      <div className="flex w-full flex-col space-y-32 px-72 pt-20">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="justfiy-start flex flex-col items-start space-y-2">
            <div className="flex flex-row space-x-2">
              {profile.content?.tags?.map((tag: string) => (
                <p className="badge badge-dark">{tag}</p>
              ))}
            </div>
            <p className="text-left text-5xl font-bold text-gray-700">
              {profile.content?.name || "Anon Jerry"}
            </p>
            <p className="font-semibold text-gray-200">followed by </p>
            <p className="font-semibold text-gray-200">
              {Number(krauseBalance)} $KRAUSE
            </p>
          </div>
          <div className="ring-primary rounded-full border-4 ring-4">
            <Image
              src={profile.content?.avatar || user.avatarUrl}
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>
        </div>
        <div>
          <p className="text-left text-3xl font-bold text-gray-200">Comments</p>
        </div>
        <div>
          <p className="text-left text-3xl font-bold text-gray-200">
            Following
          </p>
          <div>
            {profile.content?.delegates?.map((did) => (
              <p>{did}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-left text-3xl font-bold text-gray-200">Friends</p>
          <div>
            {profile.content?.friends?.map((did) => (
              <p>{did}</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export function getStaticProps({ params }: any) {
  const users = useGetUsers();
  const user = users.find((p) => p.address === params.address);
  return {
    props: {
      user,
    },
  };
}

export function getStaticPaths() {
  const users = useGetUsers();
  const paths = users.map(({ address }) => ({ params: { address } }));
  return { paths, fallback: false };
}
