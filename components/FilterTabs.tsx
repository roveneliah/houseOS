import { useState } from "react";

const useGetProposalStats = (proposalId: string) => [
  {
    choice: "For",
    percentage: "69%",
    votingPower: 1200,
  },
  {
    choice: "Against",
    percentage: "21%",
    votingPower: 400,
  },
  {
    choice: "Abstain",
    percentage: "10%",
    votingPower: 170,
  },
];

const useSingleSelect = (arr: Array<any>) => {
  const [selected, setSelected] = useState(arr.map(() => false));
  const toggle = (index: number) => () => {
    setSelected((s) => s.map((val, i) => i === index && !val));
  };

  return arr.map((x, i) => ({
    ...x,
    selected: selected[i],
    toggle: toggle(i),
  }));
};

export default function ChoiceFilters({ proposal }: any) {
  const outcomes = useGetProposalStats(proposal.id);
  const enhancedOutcomes = useSingleSelect(outcomes);

  return (
    <div className="flex flex-row justify-start space-x-4">
      {enhancedOutcomes.map(
        ({ choice, percentage, votingPower, selected, toggle }: any) => (
          <div
            className={`${
              selected && "bg-gray-500"
            } flex w-[20vw] flex-col items-start space-y-4 rounded-t-lg bg-gray-700 p-5 text-gray-300 hover:bg-gray-500 `}
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
