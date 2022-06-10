import { intersection } from "ramda";
import { useGetProposalTags } from "../hooks/tags/useLoadProposalTags";
import { useGetTimeLeft } from "../hooks/proposals/useGetTimeLeft";
import { useRouter } from "next/router";
import { Proposal } from "../types/Proposal";
import { useMemo } from "react";

export interface Props {
  proposal: Proposal;
  selectedTags: Array<string>;
}

export function ProposalListItem({ proposal, selectedTags }: Props) {
  const timeLeft = useGetTimeLeft(proposal.id);
  const proposalTags = useMemo(
    () => useGetProposalTags(proposal.id),
    [proposal.id]
  );
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
        {proposalTags.map((tag, i) => (
          <p key={i} className="badge badge-dark">
            {tag}
          </p>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
