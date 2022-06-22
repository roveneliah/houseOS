import { Proposal } from "../types/Proposal";
import { toPercent } from "../utils/toPercent";

interface Props {
  proposal: Proposal;
  selectedChoice: number;
  setSelectedChoice: Function;
}

export default function ChoiceFilters({
  proposal,
  selectedChoice,
  setSelectedChoice,
}: Props) {
  const { choices } = proposal;

  return (
    <div className="flex w-full flex-row justify-between space-x-4 overflow-y-auto">
      {choices.map((choice: string, i: number) => (
        <div
          className={`flex w-full min-w-[18vw] cursor-pointer flex-col items-start space-y-4 rounded-t-lg p-5 text-gray-300 ${
            selectedChoice === i ? "bg-gray-500" : "bg-gray-700"
          }`}
          onClick={() => setSelectedChoice(i)}
          key={i}
        >
          {/* // TODO: generalize this to pass in these components */}
          <div className="flex w-full flex-row justify-between">
            <p className="badge badge-outline">
              {toPercent(proposal.scores[i] / proposal.scores_total)}
            </p>
            <p className="badge badge-outline invisible xl:visible">
              {proposal.scores[i].toFixed(0)} $KRAUSE
            </p>
          </div>
          <p className="font-bold">{choice}</p>
        </div>
      ))}
    </div>
  );
}
