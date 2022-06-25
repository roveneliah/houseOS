import { useSignIn } from "@/hooks/useSignIn";
import { useState } from "react";
import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useGetAllProposalTags } from "../hooks/proposals/useGetAllProposalTags";
import { useListenProposalTags } from "../hooks/tags/useListenProposalTags";
import { Proposal, ProposalState } from "../types/Proposal";
import TagsList from "./profiles/TagsList";

const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1);

interface Props {
  proposal: Proposal;
}

export default function ProposalHeader({ proposal }: Props) {
  const tags = useListenProposalTags(proposal.id);
  const allTags = useGetAllProposalTags(proposal.id);
  const address = useUserAddress();
  const [showTags, setShowTags] = useState(false);
  const { signedIn } = useSignIn();

  return proposal ? (
    <div className="flex w-full flex-col items-start space-y-10 bg-gray-800 py-12 text-gray-300">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex flex-row justify-start space-x-2">
          {proposal.state && (
            <p className="badge badge-outline">{capitalize(proposal.state)}</p>
          )}
          {proposal.votes && (
            <p className="badge badge-outline">{proposal.votes} Votes</p>
          )}
          {proposal.state === ProposalState.Active && (
            <p className="badge badge-outline">Closes in {/*TODO:*/}</p>
          )}
        </div>
        <p className="text-left text-6xl font-semibold">{proposal.title}</p>
        <div className="flex w-full flex-row justify-between">
          <TagsList tags={tags} />
          {signedIn && (
            <button className="badge" onClick={() => setShowTags(!showTags)}>
              {showTags ? "Hide" : "Show"} Tags
            </button>
          )}
        </div>
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
