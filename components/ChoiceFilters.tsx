import { useEffect, useState } from "react";
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

  const getWinningChoice = (proposal: Proposal) => {
    // get index of min score
    // and select that from choices
    const max_index = proposal?.scores?.reduce(
      ({ index, max_score }: any, score, i) =>
        score > max_score
          ? { max_score: score, index: i }
          : { index, max_score },
      { max_score: -Infinity, index: -1 }
    );

    return choices?.[max_index?.index];
  };

  const [winningChoice, setWinningChoice] = useState<any>();
  useEffect(() => {
    proposal && setWinningChoice(getWinningChoice(proposal));
  }, [proposal]);

  return (
    <div className="bg-base-100 border-base-100 flex w-full flex-row justify-between overflow-y-auto rounded-t-lg">
      {choices?.map((choice: string, i: number) => (
        <div
          className={`hover:bg-black/15 flex w-full min-w-[18vw] cursor-pointer flex-col items-start space-y-4 p-4 px-6 ${
            selectedChoice === i ? "border-base-content border-b-2" : ""
          }`}
          onClick={() => setSelectedChoice(i)}
          key={i}
        >
          {/* // TODO: generalize this to pass in these components */}
          <div className="flex w-full flex-row justify-between">
            <p className="badge">
              {toPercent(
                proposal.scores_total
                  ? proposal.scores[i] / proposal.scores_total
                  : proposal.scores_total
              )}
            </p>
            <p className="badge invisible xl:visible">
              {proposal.scores[i].toFixed(0)} $KRAUSE
            </p>
          </div>
          <div className="flex w-full flex-row justify-start space-x-2">
            {proposal.state === "closed" && winningChoice === choice && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            )}
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
