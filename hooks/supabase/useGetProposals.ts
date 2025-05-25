import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export interface SupabaseProposal {
  id: string;
  vote_id: string | null;
  question: string;
  body: string | null;
  created_at: string | null;
  created_by: string | null;
}

export const useGetProposals = () => {
  const [proposals, setProposals] = useState<SupabaseProposal[]>([]);

  useEffect(() => {
    supabase
      .from('Proposals')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to fetch proposals', error.message);
        } else if (data) {
          setProposals(data as SupabaseProposal[]);
        }
      });
  }, []);

  return proposals;
};
