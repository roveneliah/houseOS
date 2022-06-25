import { intersection, prop } from "ramda";
import { useListenProposalTags } from "../hooks/tags/useListenProposalTags";
import { useRouter } from "next/router";
import { Proposal } from "../types/Proposal";
import TagsList from "./profiles/TagsList";
import LockedIcon from "./icons/LockedIcon";
import ClockIcon from "./icons/ClockIcon";
import { Tag } from "@/types/Tag";

export interface Props {
  proposal: Proposal;
  selectedTags: Array<string>;
}

export default function ProposalListItem({ proposal, selectedTags }: Props) {
  const proposalTags = useListenProposalTags(proposal.id);
  const router = useRouter();

  const hasMatchingTag = (tags: Array<Tag>) =>
    selectedTags.length === 0 ||
    intersection(tags.map(prop("tag")), selectedTags).length > 0;

  return hasMatchingTag(proposalTags) ? (
    <div
      className="flex flex-row justify-between py-4"
      onClick={() => {
        router.push(`/proposals/${proposal.id}`);
      }}
    >
      <div className="flex w-2/3 cursor-pointer flex-row items-center justify-start space-x-4 overflow-clip text-gray-800">
        <div>
          {proposal.state === "closed" ? <LockedIcon /> : <ClockIcon />}
        </div>
        {/* <p className="badge badge-sm">{timeLeft}</p> */}
        <p
          className={`overflow-clip whitespace-nowrap text-sm font-semibold text-gray-800`}
        >
          {proposal.title}
        </p>
      </div>
      <div className="flex flex-row space-x-2">
        <TagsList
          tags={proposalTags}
          max={2}
          numbered={false}
          size="sm"
          theme="dark"
        />
        {/* {proposalTags.map((tag, i) => (
          <p key={i} className="badge badge-sm badge-dark">
            {tag}
          </p>
        ))} */}
      </div>
    </div>
  ) : (
    <></>
  );
}
