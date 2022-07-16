import { useSignIn } from "@/hooks/useSignIn";
import { prop } from "ramda";
import { useState } from "react";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useGetAllProposalTags } from "../hooks/proposals/useGetAllProposalTags";
import { useListenProposalTags } from "../hooks/tags/useListenProposalTags";
import { Proposal } from "../types/Proposal";
import ClockIcon from "./icons/ClockIcon";
import LockedIcon from "./icons/LockedIcon";

export const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1);

export default function ProposalHeader({ proposal }: { proposal: Proposal }) {
  const tags = useListenProposalTags(proposal.id);
  const allTags = useGetAllProposalTags(proposal.id);
  const address = useUserAddress();
  const [showTags, setShowTags] = useState(false);
  const { signedIn } = useSignIn();

  return proposal ? (
    <div className="text-primary-content flex w-full flex-col items-start space-y-10 py-12">
      <div className="flex w-full flex-col space-y-10">
        <div className="flex  flex-row items-center justify-between">
          <div className="flex w-full flex-row items-center space-x-6">
            {/* <p className="font-semibold">Live with 9 votes.</p> */}
            {proposal.state && (
              <div className="text-primary-content flex flex-row space-x-1 p-1 font-light">
                {proposal.state === "closed" ? (
                  <LockedIcon strokeWidth={1} />
                ) : (
                  <ClockIcon strokeWidth={1} />
                )}
                <p className="">{capitalize(proposal.state)}</p>
              </div>
            )}
            {proposal.votes && (
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
                <p className="text-primary-content whitespace-nowrap font-light">
                  {proposal.votes} Votes
                </p>
              </div>
            )}
            {/* {proposal.state === ProposalState.Active && (
              <p className="badge badge-outline">Closes in</p>
            )} */}
          </div>
          <div className=" flex min-h-full flex-row items-center space-x-2 font-normal">
            {/* <p>{tags.map(prop("tag")).join(", ")}</p> */}
            {tags
              .map(prop("tag"))
              .slice(0, 3)
              .map((tag: any) => (
                <p className="border-primary-content whitespace-nowrap rounded-full border py-1 px-3 text-sm">
                  {tag}
                </p>
              ))}
          </div>
        </div>
        <p className="text-left text-6xl font-semibold">{proposal.title}</p>
        {/* <div className="flex w-full flex-row justify-between">
          <TagsList tags={tags} />
          {signedIn && (
            <button className="badge" onClick={() => setShowTags(!showTags)}>
              {showTags ? "Hide" : "Show"} Tags
            </button>
          )}
        </div> */}
      </div>
      {showTags && (
        <div className="border-1 flex  w-full flex-row flex-wrap justify-start space-x-2 overflow-auto rounded-lg border p-3">
          {allTags.map(({ tag, taggers, toggle }: any, i: number) => (
            <p
              className={`badge my-1 ${
                taggers.includes(address) ? "badge-dark" : "hover:bg-gray-400"
              }`}
              key={i}
              onClick={toggle}
            >
              {tag} {taggers.length}
            </p>
          ))}
        </div>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
