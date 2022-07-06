import { intersection, prop } from "ramda";
import { useListenProposalTags } from "../hooks/tags/useListenProposalTags";
import { Proposal } from "../types/Proposal";
import TagsList from "./profiles/TagsList";
import LockedIcon from "./icons/LockedIcon";
import ClockIcon from "./icons/ClockIcon";
import { Tag } from "@/types/Tag";
import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"));

export interface Props {
  proposal: Proposal;
  selectedTags: Array<string>;
}

export default function ProposalListItem({ proposal, selectedTags }: Props) {
  const proposalTags = useListenProposalTags(proposal.id);

  const hasMatchingTag = (tags: Array<Tag>) =>
    selectedTags.length === 0 ||
    intersection(tags.map(prop("tag")), selectedTags).length > 0;

  return hasMatchingTag(proposalTags) ? (
    <div className="flex flex-row justify-between border-b py-2 px-6 hover:bg-gray-100 hover:shadow-lg">
      <div className="flex w-full flex-row items-center justify-start space-x-4 text-gray-800 lg:w-2/3">
        <div>
          {proposal.state === "closed" ? <LockedIcon /> : <ClockIcon />}
        </div>
        {/* <p className="badge badge-sm">{timeLeft}</p> */}
        <Link href={`/proposals/${proposal.id}`}>
          <p
            className={`text-neutral cursor-pointer overflow-clip text-ellipsis whitespace-nowrap text-sm font-normal`}
          >
            {proposal.title}
          </p>
        </Link>
      </div>
      <div className="hidden flex-row space-x-2 lg:flex">
        <TagsList
          tags={proposalTags}
          max={2}
          numbered={false}
          size="sm"
          theme="dark"
          disabled={true}
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
