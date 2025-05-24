import { render, screen } from '@testing-library/react';
import PollsApp from '@/components/apps/Polls';
import * as ethereum from '@/hooks/ethereum';
import * as userAddr from '@/hooks/ethereum/useUserAddress';

const samplePoll = { id: '1', question: 'Q?', options: [{ id: 0, text: 'A', votes: [] }] };

jest.mock('@/hooks/useSupabasePolls', () => ({
  useSupabasePolls: () => ({ polls: [samplePoll], addPoll: jest.fn(), vote: jest.fn() }),
}));

jest.mock('@/hooks/ethereum/useUserAddress');
jest.mock('@/hooks/ethereum');

test('buttons disabled without wallet', () => {
  (userAddr.useUserAddress as jest.Mock).mockReturnValue(null);
  (ethereum.useKrauseBalance as jest.Mock).mockReturnValue('0');
  render(<PollsApp />);
  expect(screen.getByText('Create')).toBeDisabled();
  expect(screen.getByText('Vote')).toBeDisabled();
});
