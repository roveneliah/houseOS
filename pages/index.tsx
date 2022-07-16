import { dao, snapshotSpace } from "@/config";
import { useGetUsers } from "@/hooks/database/useGetUsers";
import { useGetBalanceOf } from "@/hooks/ethereum/useGetBalanceOf";
import { useGetProposals } from "@/hooks/snapshot/useGetProposals";
import type { NextPage } from "next";
import { compose, equals, length, pipe, prop } from "ramda";
import { useBalance } from "wagmi";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const { data } = useBalance({ addressOrName: dao.treasury });
  const ethBalance = Number(data?.formatted).toFixed(2);
  const proposals = useGetProposals(snapshotSpace);
  const liveProposals = length(
    proposals.filter(pipe(prop("state"), equals("active")))
  );
  const users = useGetUsers();

  return (
    <Layout noOpacity={true}>
      <div className="flex w-full flex-row justify-center pt-32">
        <div className="flex w-2/3 flex-col space-y-4">
          <div className="flex flex-row space-x-4">
            <div className="flex basis-2/3 flex-col space-y-4 rounded-lg border p-12">
              <p className="text-3xl">{dao.name}</p>
              <p className="text-lg font-semibold">{dao.description}</p>
            </div>
            <div className="rounded-lg border p-12">
              <p className="text-4xl">{ethBalance} ETH</p>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            <div className="basis-1/2 rounded-lg border p-12">
              <p className="text-4xl">{liveProposals} live proposals.</p>
              <p className="text-3xl">{proposals.length} total.</p>
            </div>
            <div className="basis-1/2 rounded-lg border p-12">
              <p className="text-3xl">
                {users.length} {dao.memberName}s
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
