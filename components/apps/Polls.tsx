import { useState } from 'react';
import { usePolls } from '@/hooks/usePolls';
import { Poll } from '@/types/Poll';
import { useUserAddress, useKrauseBalance } from '@/hooks/ethereum';

const PollCreator = ({ add, disabled }: { add: (q: string, o: string[]) => void; disabled: boolean }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const updateOption = (i: number, value: string) => {
    setOptions(options.map((o, idx) => (idx === i ? value : o)));
  };

  const addOption = () => setOptions([...options, '']);

  const create = () => {
    const opts = options.filter((o) => o.trim());
    if (!question.trim() || opts.length < 2) return;
    add(question, opts);
    setQuestion('');
    setOptions(['', '']);
  };

  if (disabled) {
    return <p className="italic">Connect a wallet with $KRAUSE to create polls.</p>;
  }

  return (
    <div className="border p-4 rounded space-y-2 bg-base-100">
      <p className="text-xl font-semibold">Create Poll</p>
      <input
        className="border p-1 w-full"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          className="border p-1 w-full mt-1"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => updateOption(i, e.target.value)}
        />
      ))}
      <button className="text-sm underline" onClick={addOption}>
        Add option
      </button>
      <button className="bg-primary text-white px-3 py-1 rounded" onClick={create}>
        Create
      </button>
    </div>
  );
};

const PollCard = ({ poll, onVote, disabled }: { poll: Poll; onVote: any; disabled: boolean }) => {
  const [option, setOption] = useState(poll.options[0]?.id);
  const [address, setAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [comment, setComment] = useState('');

  const submit = () => {
    if (!address || !weight) return;
    onVote(poll.id, option, { address, weight: Number(weight), comment });
    setAddress('');
    setWeight('');
    setComment('');
  };

  const weightSum = (opt: any) => opt.votes.reduce((s: number, v: any) => s + v.weight, 0);

  return (
    <div className="border p-4 rounded space-y-2 mt-4 bg-base-100">
      <p className="text-lg font-medium">{poll.question}</p>
      {poll.options.map((o) => (
        <div key={o.id} className="ml-2">
          <p className="font-semibold">{o.text}</p>
          <p className="text-sm">Addresses: {o.votes.length} &middot; Weight: {weightSum(o)}</p>
          <ul className="list-disc ml-5 text-sm">
            {o.votes.map((v, i) => (
              <li key={i}>
                {v.address} - {v.weight}
                {v.comment ? ` (${v.comment})` : ''}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!disabled && (
        <div className="flex flex-col space-y-1">
          <select className="border p-1" value={option} onChange={(e) => setOption(Number(e.target.value))}>
            {poll.options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.text}
              </option>
            ))}
          </select>
          <input className="border p-1" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input className="border p-1" placeholder="Token Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input className="border p-1" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button className="bg-primary text-white px-2 py-1 rounded" onClick={submit}>
            Vote
          </button>
        </div>
      )}
      {disabled && <p className="italic">Connect a wallet with $KRAUSE to vote.</p>}
    </div>
  );
};

export default function PollsApp() {
  const { polls, addPoll, vote } = usePolls();
  const address = useUserAddress();
  const krauseBalance = useKrauseBalance(address);
  const canInteract = !!address && parseFloat(krauseBalance || '0') > 0;

  return (
    <div className="p-4 space-y-4">
      <PollCreator add={addPoll} disabled={!canInteract} />
      {polls.map((p) => (
        <PollCard key={p.id} poll={p} onVote={vote} disabled={!canInteract} />
      ))}
    </div>
  );
}
