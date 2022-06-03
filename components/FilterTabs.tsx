import { useGetProposalStats } from "../hooks/useGetProposalStats";
import { useSingleSelect } from "../hooks/useSingleSelect";

export default function ChoiceFilters({ proposal }: any) {
  const outcomes = useGetProposalStats(proposal.id);
  const enhancedOutcomes = useSingleSelect(outcomes);

  return (
    <div className="flex flex-row justify-between space-x-4">
      {enhancedOutcomes.map(
        ({ choice, percentage, votingPower, selected, toggle }: any) => (
          <div
            className={`flex w-[20vw] cursor-pointer flex-col items-start space-y-4 rounded-t-lg p-5 text-gray-300 ${
              selected ? "bg-gray-500" : "bg-gray-700"
            }`}
            onClick={toggle}
          >
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
