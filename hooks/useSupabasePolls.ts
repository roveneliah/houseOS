import { useEffect, useState } from 'react';
import { Poll, PollOption, Vote } from '@/types/Poll';
import { createPoll, addVote, fetchPolls, fetchVotes, StoredPoll, StoredVote } from '@/utils/supabase/polls';

function convert(p: StoredPoll, votes: StoredVote[]): Poll {
  const options: PollOption[] = p.options.map((text, i) => ({
    id: i,
    text,
    votes: votes.filter((v) => v.option_id === i).map((v) => ({ address: v.address, weight: v.weight, comment: v.comment })),
  }));
  return { id: p.id, question: p.question, options };
}

export const useSupabasePolls = () => {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPolls();
        const pollsWithVotes: Poll[] = [];
        for (const p of data) {
          const votes = await fetchVotes(p.id);
          pollsWithVotes.push(convert(p, votes));
        }
        setPolls(pollsWithVotes);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const add = async (question: string, options: string[]) => {
    const stored = await createPoll(question, options);
    const newPoll = convert(stored, []);
    setPolls((prev) => [...prev, newPoll]);
  };

  const vote = async (pollId: string, optionId: number, voteData: Vote) => {
    await addVote({ poll_id: pollId, option_id: optionId, address: voteData.address, weight: voteData.weight, comment: voteData.comment });
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? { ...p, options: p.options.map((o) => (o.id === optionId ? { ...o, votes: [...o.votes, voteData] } : o)) }
          : p
      )
    );
  };

  return { polls, addPoll: add, vote };
};
