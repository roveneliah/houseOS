import type { NextPage } from "next";
import { length } from "ramda";
import {
  filterActive,
  isActive,
  Proposal,
  ProposalState,
} from "../../types/Proposal";
import { useGetProposals } from "../../hooks/snapshot/useGetProposals";
import { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import LockedIcon from "../icons/LockedIcon";
import ClockIcon from "../icons/ClockIcon";
import ListIcon from "../icons/ListIcon";

const StatusFilterTabs = dynamic(() => import("./StatusFilterTabs"));
const ProposalListItem = dynamic(() => import("./ProposalListItem"));
const Layout = dynamic(() => import("../Layout"));
const TagSelector = dynamic(() => import("../tags/TagSelector"));

import { useSingleSelect } from "../../hooks/generic/useSingleSelect";
import { proposalTags, snapshotSpace } from "../../config";
import { useOnKeydown } from "../../hooks/generic/useOnKeydown";
import { next, prev } from "@/hooks/generic/useCycler";

export enum StateFilters {
  Active,
  Closed,
  All,
}
const { All, Active, Closed } = StateFilters;

const ProposalsListPage: NextPage = () => {
  const proposals = useGetProposals(snapshotSpace); // TODO: redux should load this
  const tags = proposalTags;
  const countActive = length(filterActive(proposals));

  const [selectedTags, setSelectedTags] = useState([]);

  // TODO: #13 Refactor with prev, next, selected
  const [stateFilter, setStateFilter] = useState(All);
  const { options } = useSingleSelect([
    {
      name: "Active",
      icon: ClockIcon,
      onClick: () => setStateFilter(Active),
    },
    { name: "Closed", icon: LockedIcon, onClick: () => setStateFilter(Closed) },
    { name: "All", icon: ListIcon, onClick: () => setStateFilter(All) },
  ]);

  useOnKeydown("ArrowRight", () => setStateFilter(next(options)));
  useOnKeydown("ArrowLeft", () => setStateFilter(prev(options)));

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
    // <Layout paletteStartsOpen={false}>
    <div className="bg-base-200 flex flex-col items-center">
      <div className="flex w-full flex-row justify-center pt-24">
        <div className="flex w-full flex-col space-y-10 px-2 md:w-4/5 md:max-w-3xl md:px-0">
          <div className="flex w-2/3 flex-row justify-start">
            <div className="text-base-content flex flex-col items-start space-y-2">
              <div
                className={`flex flex-row space-x-2 ${
                  countActive && "text-success"
                }`}
              >
                <ClockIcon />
                <p className="font-normal">{countActive} Active</p>
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
      </div>
      <div className="w-full overflow-hidden rounded-b-lg px-2 md:w-4/5 md:max-w-3xl md:px-0 ">
        <div className="bg-base-100 flex flex-col space-y-0">
          <div className="border-base-200/10 border-b px-4 py-4">
            <TagSelector tags={tags} setSelectedTags={setSelectedTags} />
          </div>
          <div className="no-scrollbar flex h-[55vh] flex-col overflow-y-auto">
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
    </div>
    // </Layout>
  );
};

export default ProposalsListPage;
