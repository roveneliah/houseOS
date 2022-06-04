import { prop } from "ramda";
import { useEffect, useMemo } from "react";
import { useGetProposalStats } from "../hooks/useGetProposalStats";
import { useOnKeydown } from "../hooks/useOnKeydown";
import { useSingleSelect } from "../hooks/useSingleSelect";
import { Proposal } from "../types/Proposal";

interface Props {
  proposal: Proposal;
}

export default function ChoiceFilters({ proposal }: Props) {
  const enhancedProposal = useGetProposalStats(proposal);
  const enhancedOutcomes = useSingleSelect(enhancedProposal.choices);

  return (
    <div className="flex w-full flex-row justify-between space-x-4 overflow-y-auto">
      {enhancedOutcomes.map(
        ({ choice, percentage, votingPower, selected, toggle }: any) => (
          <div
            className={`flex w-full min-w-[18vw] cursor-pointer flex-col items-start space-y-4 rounded-t-lg p-5 text-gray-300 ${
              selected ? "bg-gray-500" : "bg-gray-700"
            }`}
            onClick={toggle}
          >
            {/* // TODO: generalize this to pass in these components */}
            <div className="flex w-full flex-row justify-between">
              <p className="badge badge-outline">{percentage}</p>
              <p className="badge badge-outline">{votingPower} $KRAUSE</p>
            </div>
            <p className="font-bold">{choice}</p>
          </div>
        )
      )}
    </div>
  );
}
