import dynamic from "next/dynamic";
import { intersection, prop } from "ramda";

import { useListenProposalTags } from "../../hooks/tags/useListenProposalTags";

const ProposalPage = dynamic(() => import("@/components/proposals/[id]"));
const TagsList = dynamic(() => import("../profiles/TagsList"));
import LockedIcon from "../icons/LockedIcon";
import ClockIcon from "../icons/ClockIcon";

import { Proposal } from "@/types/Proposal";
import { Tag } from "@/types/Tag";

import { useAppDispatch } from "@/redux/app/hooks";
import { launch } from "@/redux/features/windows/windowsSlice";
import { snapshotSpace } from "@/config";
import { useAppLauncher } from "@/hooks/useAppLauncher";

export interface Props {
  proposal: Proposal;
  selectedTags: Array<string>;
}

export default function ProposalListItem({ proposal, selectedTags }: Props) {
  const proposalTags = useListenProposalTags(proposal.id);

  const hasMatchingTag = (tags: Array<Tag>) =>
    selectedTags.length === 0 ||
    intersection(tags.map(prop("tag")), selectedTags).length > 0;

  const { launchProposal } = useAppLauncher();

  return hasMatchingTag(proposalTags) ? (
    <div className="hover:bg-base-100 border-base-200/10 text-base-content flex flex-row justify-between border-b py-2 px-6 hover:shadow-lg">
      <div className="text-base-content flex w-full flex-row items-center justify-start space-x-4 lg:w-2/3">
        <div>
          {proposal.state === "closed" ? (
            <LockedIcon />
          ) : (
            <ClockIcon strokeWidth={2} />
          )}
        </div>
        {/* <a
          href={`https://snapshot.org/#/${snapshotSpace}/proposal/${proposal.id}`}
          target="_blank"
        > */}
        <button onClick={launchProposal(proposal.id)}>
          <p
            className={`cursor-pointer overflow-clip text-ellipsis whitespace-nowrap text-sm ${
              proposal.state === "closed" ? "font-normal" : "font-semibold"
            }`}
          >
            {proposal.title}
          </p>
        </button>
        {/* </a> */}
      </div>
      <div className="hidden flex-row space-x-2 lg:flex">
        <TagsList
          tags={proposalTags}
          max={2}
          numbered={false}
          size="xs"
          // theme="dark"
          disabled={true}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
