import { useEffect, useState } from 'react';
import { Poll, PollOption, Vote } from '@/types/Poll';

const load = (): Poll[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('polls');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const usePolls = () => {
  const [polls, setPolls] = useState<Poll[]>(load);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('polls', JSON.stringify(polls));
    }
  }, [polls]);

  const addPoll = (question: string, options: string[]) => {
    const poll: Poll = {
      id: Date.now().toString(),
      question,
      options: options.map((text, i) => ({ id: i, text, votes: [] })),
    };
    setPolls((p) => [...p, poll]);
  };

  const vote = (pollId: string, optionId: number, vote: Vote) => {
    setPolls((prev) =>
      prev.map((p) =>
        p.id === pollId
          ? {
              ...p,
              options: p.options.map((o) =>
                o.id === optionId ? { ...o, votes: [...o.votes, vote] } : o
              ),
            }
          : p
      )
    );
  };

  return { polls, addPoll, vote };
};
