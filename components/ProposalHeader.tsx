import { useUserAddress } from "../hooks/ethereum/useUserAddress";
import { useGetAllProposalTags } from "../hooks/proposals/useGetAllProposalTags";
import { useListenProposalTags } from "../hooks/tags/useListenProposalTags";
import { Proposal, ProposalState } from "../types/Proposal";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface Props {
  proposal: Proposal;
}

export default function ProposalHeader({ proposal }: Props) {
  const tags = useListenProposalTags(proposal.id);
  const allTags = useGetAllProposalTags(proposal.id);
  const address = useUserAddress();

  return (
    <div className="flex w-full flex-col items-start space-y-4 bg-gray-800 py-10 text-gray-300">
      <div className="flex flex-row justify-start space-x-2">
        <p className="badge badge-outline">{capitalize(proposal.state)}</p>
        <p className="badge badge-outline">{proposal.votes} Votes</p>
        {proposal.state === ProposalState.Active && (
          <p className="badge badge-outline">Closes in {}</p>
        )}
      </div>
      <p className="text-left text-6xl font-semibold">{proposal.title}</p>
      <div className="flex flex-row justify-start space-x-2">
        {tags.map(({ tag, taggers, toggle }: any, i: number) => (
          <p className="badge badge-outline" key={i} onClick={toggle}>
            {tag} {taggers.length}
          </p>
        ))}
      </div>
      <div className="flex flex-row justify-start space-x-2">
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
    </div>
  );
}
