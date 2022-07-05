import { ViewerConnectedContainer } from "@self.id/framework";
import { Proposal } from "../types/Proposal";
import { toPercent } from "../utils/toPercent";

interface Props {
  proposal: Proposal;
  selectedChoice: number;
  setSelectedChoice: Function;
  toggleCommentView: any;
  view: any;
}

export default function ChoiceFilters({
  proposal,
  selectedChoice,
  setSelectedChoice,
  toggleCommentView,
  view,
}: Props) {
  const { choices } = proposal;

  return (
    <div className="bg-primary-content flex w-full flex-row justify-between overflow-y-auto rounded-t-lg border-b">
      {choices?.map((choice: string, i: number) => (
        <div
          className={`text-neutral flex w-full min-w-[18vw] cursor-pointer flex-col items-start space-y-4 p-4 px-6 hover:bg-gray-100 ${
            selectedChoice === i ? "border-b-2 border-black" : ""
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
          <div className="flex w-full flex-row justify-between">
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
              {choice}
            </p>
            {/* {view === 1 && (
              <p
                className="hover:bg-primary-content rounded-lg py-1 px-2"
                onClick={toggleCommentView}
              >
                Vote
              </p>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
}
