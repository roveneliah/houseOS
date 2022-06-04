import type { NextPage } from "next";
import Layout from "../../components/Layout";
import { ClockIcon } from "../../components/icons/ClockIcon";
import { compose, intersection, length } from "ramda";
import { Proposal } from "../../types/Proposal";
import ChoiceFilters from "../../components/FilterTabs";
import { StatusFilterTabs } from "../../components/StatusFilterTabs";
import TagSelector from "../../components/TagSelector";
import { useGetProposalTags } from "../../hooks/tags/useLoadProposalTags";
import { useGetAllProposalTags } from "../../hooks/useGetAllProposalTags";
import { useGetProposals } from "../../hooks/useGetProposals";
import { useGetTimeLeft } from "../../hooks/useGetTimeLeft";
import { useState } from "react";
import { useRouter } from "next/router";

interface Props {
  proposal: Proposal;
  selectedTags: Array<string>;
}
function ProposalListItem({ proposal, selectedTags }: Props) {
  const timeLeft = useGetTimeLeft(proposal.id);
  const proposalTags = useGetProposalTags(proposal.id);
  const router = useRouter();

  const hasMatchingTag = (tags: Array<string>) =>
    intersection(tags, selectedTags).length > 0;

  return hasMatchingTag(proposalTags) ? (
    <div
      className="flex flex-row justify-between py-4"
      onClick={() => {
        router.push(`/proposals/${proposal.id}`);
      }}
    >
      <div className="flex cursor-pointer flex-row space-x-4">
        <p className="badge">{timeLeft}</p>
        <p className={`font-bold text-gray-800`}>{proposal.title}</p>
      </div>
      <div className="flex flex-row space-x-2">
        {proposalTags.map((tag) => (
          <p className="badge badge-dark">{tag}</p>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}

const ProposalsListPage: NextPage = () => {
  const proposals = useGetProposals();
  const tags = useGetAllProposalTags();
  const countActive = length(proposals.filter(({ state }) => state === "open"));
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <Layout paletteOpen={true}>
      <div className="flex w-full flex-col items-start space-y-10 bg-gray-800 px-72 pt-20">
        <div className="bg-gray-7000 flex w-full flex-row justify-start">
          <div className="flex flex-col items-start space-y-2 text-gray-300">
            <div className="flex flex-row space-x-2">
              <ClockIcon />
              <p className="font-bold">{countActive} Active</p>
            </div>
            <p className="text-6xl font-bold">Proposals</p>
          </div>
        </div>
        <StatusFilterTabs proposals={proposals} />
      </div>
      <div className="w-full px-72">
        <div className="flex flex-col space-y-4 rounded-b-lg bg-gray-200 p-6">
          <TagSelector tags={tags} setSelectedTags={setSelectedTags} />
          <div className="flex flex-col">
            {proposals.map((proposal: Proposal) => (
              <ProposalListItem
                proposal={proposal}
                selectedTags={selectedTags}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProposalsListPage;
