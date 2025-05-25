import { useGetProposals } from '@/hooks/supabase/useGetProposals';

export default function ProposalsPage() {
  const proposals = useGetProposals();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Proposals</h1>
      {proposals.map((p) => (
        <div key={p.id} className="border p-4 rounded">
          <p className="font-semibold">{p.question}</p>
          {p.body && <p className="text-sm mt-1">{p.body}</p>}
        </div>
      ))}
    </div>
  );
}
