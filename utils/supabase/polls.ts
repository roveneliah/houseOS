const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

export interface StoredPoll {
  id: string;
  question: string;
  options: string[];
}

export interface StoredVote {
  id?: string;
  poll_id: string;
  option_id: number;
  address: string;
  weight: number;
  comment?: string;
}

export async function fetchPolls(): Promise<StoredPoll[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/polls?select=*`, { headers });
  if (!res.ok) throw new Error('Failed to fetch polls');
  const data = await res.json();
  return data as StoredPoll[];
}

export async function createPoll(question: string, options: string[]): Promise<StoredPoll> {
  const body = [{ question, options }];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/polls`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create poll');
  const [poll] = await res.json();
  return poll as StoredPoll;
}

export async function addVote(vote: StoredVote): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/votes`, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify([vote]),
  });
  if (!res.ok) throw new Error('Failed to add vote');
}

export async function fetchVotes(pollId: string): Promise<StoredVote[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/votes?poll_id=eq.${pollId}`, { headers });
  if (!res.ok) throw new Error('Failed to fetch votes');
  const data = await res.json();
  return data as StoredVote[];
}
