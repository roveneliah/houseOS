import { useState } from 'react';
import { usePolls } from '@/hooks/usePolls';
import { Poll } from '@/types/Poll';
import { useUserAddress, useKrauseBalance } from '@/hooks/ethereum';
import { useSignIn } from '@/hooks/sign-in/useSignIn';

const PollCreator = ({ add, disabled }: { add: (q: string, o: string[]) => void; disabled: boolean }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const updateOption = (i: number, value: string) => {
    setOptions(options.map((o, idx) => (idx === i ? value : o)));
  };

  const addOption = () => setOptions([...options, '']);

  const create = () => {
    if (disabled) return;
    const opts = options.filter((o) => o.trim());
    if (!question.trim() || opts.length < 2) return;
    add(question, opts);
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <div className="border p-4 rounded space-y-2">
      <p className="text-xl font-semibold">Create Poll</p>
      <input
        className="border p-1 w-full"
        placeholder="Question"
        value={question}
        disabled={disabled}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          className="border p-1 w-full mt-1"
          placeholder={`Option ${i + 1}`}
          value={opt}
          disabled={disabled}
          onChange={(e) => updateOption(i, e.target.value)}
        />
      ))}
      <button className="text-sm underline" disabled={disabled} onClick={addOption}>
        Add option
      </button>
      <button className="bg-primary text-white px-3 py-1 rounded" disabled={disabled} onClick={create}>
        Create
      </button>
      {disabled && <p className="text-sm text-warning">Connect wallet with $KRAUSE to create polls.</p>}
    </div>
  );
};

const PollCard = ({ poll, onVote, disabled }: { poll: Poll; onVote: any; disabled: boolean }) => {
  const [option, setOption] = useState(poll.options[0]?.id);
  const [comment, setComment] = useState('');

  const submit = () => {
    if (disabled) return;
    onVote(poll.id, option, { address: address || '', weight: balance, comment });
    setComment('');
  };

  const weightSum = (opt: any) => opt.votes.reduce((s: number, v: any) => s + v.weight, 0);

  const address = useUserAddress();
  const balance = Number(useKrauseBalance(address));

  return (
    <div className="border p-4 rounded space-y-2 mt-4">
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
      <div className="flex flex-col space-y-1">
        <select className="border p-1" value={option} disabled={disabled} onChange={(e) => setOption(Number(e.target.value))}>
          {poll.options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.text}
            </option>
          ))}
        </select>
        <input className="border p-1" placeholder="Comment" value={comment} disabled={disabled} onChange={(e) => setComment(e.target.value)} />
        <button className="bg-primary text-white px-2 py-1 rounded" disabled={disabled} onClick={submit}>
          Vote
        </button>
        {disabled && <p className="text-sm text-warning">Connect wallet with $KRAUSE to vote.</p>}
      </div>
    </div>
  );
};

export default function PollsApp() {
  const { polls, addPoll, vote } = usePolls();
  const address = useUserAddress();
  const balance = Number(useKrauseBalance(address));
  const { signedIn } = useSignIn();
  const canInteract = signedIn && balance > 0;

  return (
    <div className="p-4 space-y-4">
      <PollCreator add={addPoll} disabled={!canInteract} />
      {polls.map((p) => (
        <PollCard key={p.id} poll={p} onVote={vote} disabled={!canInteract} />
      ))}
    </div>
  );
}
