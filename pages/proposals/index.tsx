import type { NextPage } from "next";
import { length } from "ramda";
import { Proposal, ProposalState } from "../../types/Proposal";
import { useGetProposals } from "../../hooks/snapshot/useGetProposals";
import { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import LockedIcon from "../../components/icons/LockedIcon";
import ClockIcon from "../../components/icons/ClockIcon";
import ListIcon from "../../components/icons/ListIcon";

const StatusFilterTabs = dynamic(
  () => import("../../components/StatusFilterTabs")
);
const ProposalListItem = dynamic(
  () => import("../../components/ProposalListItem")
);
const Layout = dynamic(() => import("../../components/Layout"));
const TagSelector = dynamic(() => import("../../components/TagSelector"));

import { useSingleSelect } from "../../hooks/generic/useSingleSelect";
import { proposalTags, snapshotSpace } from "../../config";
import { useOnKeydown } from "../../hooks/generic/useCommand";

export enum StateFilters {
  Active,
  Closed,
  All,
}
const { All, Active, Closed } = StateFilters;

const ProposalsListPage: NextPage = () => {
  const proposals = useGetProposals(snapshotSpace);
  const tags = proposalTags;
  const countActive = length(
    proposals.filter(
      ({ state }: { state: ProposalState }) => state === ProposalState.Active
    )
  );

  const [selectedTags, setSelectedTags] = useState([]);
  const [stateFilter, setStateFilter] = useState(All);
  const options = useSingleSelect([
    {
      name: "Active",
      icon: ClockIcon,
      onClick: () => setStateFilter(Active),
    },
    { name: "Closed", icon: LockedIcon, onClick: () => setStateFilter(Closed) },
    { name: "All", icon: ListIcon, onClick: () => setStateFilter(All) },
  ]);

  useOnKeydown("ArrowRight", () =>
    setStateFilter((current) => (current + 1) % 3)
  );

  useOnKeydown("ArrowLeft", () =>
    setStateFilter((current) => (3 + current - 1) % 3)
  );

  const stateToId = (state: string) => (state === "active" ? 0 : 1);
  const filteredProposals = useMemo(
    () =>
      proposals.filter(
        ({ state }: { state: ProposalState }) =>
          stateFilter === All || stateToId(state) === stateFilter
      ),
    [proposals, stateFilter]
  );

  return (
    <Layout paletteStartsOpen={true}>
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
        <StatusFilterTabs
          options={options}
          stateFilter={stateFilter}
          setStateFilter={setStateFilter}
        />
      </div>
      <div className="w-full px-72">
        <div className="flex flex-col space-y-4 rounded-b-lg bg-gray-200 p-6">
          <TagSelector tags={tags} setSelectedTags={setSelectedTags} />
          <div className="flex h-[60vh] flex-col overflow-y-auto">
            {filteredProposals.map((proposal: Proposal, i: number) => (
              <ProposalListItem
                proposal={proposal}
                selectedTags={selectedTags}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProposalsListPage;
