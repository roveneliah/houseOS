const useLoadProposalAnnotations = (proposalId: string) => [
  "Compensation",
  "Community",
  "Lolz",
];

export default function ProposalHeader({ proposal }: any) {
  const tags = useLoadProposalAnnotations(proposal.id);
  return (
    <div className="flex w-full flex-col items-start space-y-4 bg-gray-800 py-10 text-gray-300">
      <div className="flex flex-row justify-start space-x-2">
        <p className="badge badge-outline">{proposal.state}</p>
        {proposal.state.toLowerCase() === "open" && (
          <p className="badge badge-outline">Closes in {}</p>
        )}
      </div>
      <p className="text-left text-6xl font-semibold">{proposal.title}</p>
      <div className="flex flex-row justify-start space-x-2">
        {tags.map((tag) => (
          <p className="badge badge-outline">{tag}</p>
        ))}
        <p className="badge badge-outline hover:bg-gray-400">+</p>
      </div>
    </div>
  );
}
