import { useSignIn } from "@/hooks/useSignIn";
import { TagsList } from "@/components/me";
import { capitalize } from "@/utils/capitalize";
import { useState } from "react";
import { useUserAddress } from "../../hooks/ethereum/useUserAddress";
import { useGetAllProposalTags } from "../../hooks/proposals/useGetAllProposalTags";
import { useListenProposalTags } from "../../hooks/tags/useListenProposalTags";
import { Proposal, ProposalState } from "../../types/Proposal";
import ClockIcon from "../icons/ClockIcon";
import LinkIcon from "../icons/LinkIcon";
import LockedIcon from "../icons/LockedIcon";
import TagListBox from "../profiles/TagListBox";

export default function ProposalHeader({ proposal }: { proposal: Proposal }) {
  const tags = useListenProposalTags(proposal.id);
  const allTags = useGetAllProposalTags(proposal.id);
  const address = useUserAddress();
  const [showTags, setShowTags] = useState(false);
  const { hasProfile: signedIn } = useSignIn();

  const snapshotLink =
    proposal?.space?.id &&
    proposal?.id &&
    `https://snapshot.org/#/${proposal.space.id}/proposal/${proposal.id}`;

  return proposal ? (
    <div className="flex w-full flex-col items-start space-y-10 py-12">
      <div className="flex w-full flex-col space-y-10">
        <div className="flex  flex-row items-center justify-between">
          <div className="flex w-full flex-row items-center space-x-6">
            {proposal.state && (
              <div
                className={`${
                  proposal.state === ProposalState.Closed
                    ? "text-error"
                    : "text-success"
                } flex flex-row space-x-1 p-1 font-light`}
              >
                {proposal.state === "closed" ? (
                  <LockedIcon strokeWidth={1} />
                ) : (
                  <ClockIcon strokeWidth={1} />
                )}
                <p className="">{capitalize(proposal.state)}</p>
              </div>
            )}

            <div className="flex flex-row space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                />
              </svg>
              <p className=" whitespace-nowrap font-light">
                {proposal.votes} Votes
              </p>
            </div>
            <a href={snapshotLink} target="_blank">
              <div className="flex flex-row space-x-2 font-light">
                <LinkIcon strokeWidth={1} />
                <p className="cursor-pointer">Read</p>
              </div>
            </a>
            {signedIn && (
              <div className="flex flex-row space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <button
                  className="whitespace-nowrap font-light"
                  onClick={() => setShowTags(!showTags)}
                >
                  {showTags ? "Hide" : "Edit"} Tags
                </button>
              </div>
            )}
          </div>
          <div className="flex min-h-full flex-row items-center space-x-2 font-normal">
            <TagsList tags={tags} disabled={true} max={3} />
          </div>
        </div>
        <p className="text-left text-4xl font-semibold">{proposal.title}</p>
        {signedIn && showTags && (
          <TagListBox tags={allTags} address={address} size={"sm"} />
        )}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
