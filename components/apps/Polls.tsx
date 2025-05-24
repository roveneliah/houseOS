import { useState } from 'react';
import { useSupabasePolls } from '@/hooks/useSupabasePolls';
import { useUserAddress } from '@/hooks/ethereum/useUserAddress';
import { useKrauseBalance } from '@/hooks/ethereum';

const PollCreator = ({ add, canInteract }: { add: (q: string, o: string[]) => void; canInteract: boolean }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const updateOption = (i: number, value: string) => {
    setOptions(options.map((o, idx) => (idx === i ? value : o)));
  };

  const addOption = () => setOptions([...options, '']);

  const create = () => {
    if (!canInteract) return;
    const opts = options.filter((o) => o.trim());
    if (!question.trim() || opts.length < 2) return;
    add(question, opts);
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <div className="border p-4 rounded space-y-2">
      <p className="text-xl font-semibold">Create Poll</p>
      <input className="border p-1 w-full" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
      {options.map((opt, i) => (
        <input
          key={i}
          className="border p-1 w-full mt-1"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => updateOption(i, e.target.value)}
        />
      ))}
      <button className="text-sm underline" onClick={addOption} disabled={!canInteract}>
        Add option
      </button>
      <button className="bg-primary text-white px-3 py-1 rounded" disabled={!canInteract} onClick={create}>
        Create
      </button>
    </div>
  );
};

const PollCard = ({ poll, onVote, canInteract }: { poll: any; onVote: any; canInteract: boolean }) => {
  const [option, setOption] = useState(poll.options[0]?.id);
  const [comment, setComment] = useState('');
  const address = useUserAddress();
  const weight = Number(useKrauseBalance(address));

  const submit = () => {
    if (!address || !weight) return;
    onVote(poll.id, option, { address, weight, comment });
    setComment('');
  };

  const weightSum = (opt: any) => opt.votes.reduce((s: number, v: any) => s + v.weight, 0);

  return (
    <div className="border p-4 rounded space-y-2 mt-4">
      <p className="text-lg font-medium">{poll.question}</p>
      {poll.options.map((o: any) => (
        <div key={o.id} className="ml-2">
          <p className="font-semibold">{o.text}</p>
          <p className="text-sm">Addresses: {o.votes.length} · Weight: {weightSum(o)}</p>
          <ul className="list-disc ml-5 text-sm">
            {o.votes.map((v: any, i: number) => (
              <li key={i}>
                {v.address} - {v.weight}
                {v.comment ? ` (${v.comment})` : ''}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex flex-col space-y-1">
        <select className="border p-1" value={option} onChange={(e) => setOption(Number(e.target.value))}>
          {poll.options.map((o: any) => (
            <option key={o.id} value={o.id}>
              {o.text}
            </option>
          ))}
        </select>
        <input className="border p-1" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button className="bg-primary text-white px-2 py-1 rounded" disabled={!canInteract} onClick={submit}>
          Vote
        </button>
      </div>
    </div>
  );
};

export default function PollsApp() {
  const address = useUserAddress();
  const krause = Number(useKrauseBalance(address));
  const canInteract = !!address && krause > 0;
  const { polls, addPoll, vote } = useSupabasePolls();

  return (
    <div className="p-4 space-y-4">
      {!canInteract && <p className="text-error">Connect a wallet with $KRAUSE to participate.</p>}
      <PollCreator add={addPoll} canInteract={canInteract} />
      {polls.map((p) => (
        <PollCard key={p.id} poll={p} onVote={vote} canInteract={canInteract} />
      ))}
    </div>
  );
}
