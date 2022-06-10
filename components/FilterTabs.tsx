import { useGetProposalStats } from "../hooks/proposals/useGetProposalStats";
import { useSingleSelect } from "../hooks/generic/useSingleSelect";
import { Proposal } from "../types/Proposal";
import { toPercent } from "../utils/toPercent";

interface Props {
  proposal: Proposal;
}

export default function ChoiceFilters({ proposal }: Props) {
  const enhancedProposal = useGetProposalStats(proposal);
  const enhancedOutcomes = useSingleSelect(enhancedProposal.choices);

  return (
    <div className="flex w-full flex-row justify-between space-x-4 overflow-y-auto">
      {enhancedOutcomes.map(({ choice, selected, toggle }: any, i: number) => (
        <div
          className={`flex w-full min-w-[18vw] cursor-pointer flex-col items-start space-y-4 rounded-t-lg p-5 text-gray-300 ${
            selected ? "bg-gray-500" : "bg-gray-700"
          }`}
          onClick={toggle}
        >
          {/* // TODO: generalize this to pass in these components */}
          <div className="flex w-full flex-row justify-between">
            <p className="badge badge-outline">
              {toPercent(proposal.scores[i] / proposal.scores_total)}
            </p>
            <p className="badge badge-outline">
              {proposal.scores[i].toFixed(0)} $KRAUSE
            </p>
          </div>
          <p className="font-bold">{choice}</p>
        </div>
      ))}
    </div>
  );
}
