import React from 'react';
import { render, screen } from '@testing-library/react';
import PollsApp from './Polls';
import { useUserAddress, useKrauseBalance } from '@/hooks/ethereum';

jest.mock('@/hooks/ethereum');
jest.mock('@/hooks/usePolls', () => ({
  usePolls: () => ({ polls: [], addPoll: jest.fn(), vote: jest.fn() })
}));

const mockedUseUserAddress = useUserAddress as jest.Mock;
const mockedUseKrauseBalance = useKrauseBalance as jest.Mock;

describe('PollsApp gating', () => {
  it('prompts to connect when wallet not connected', () => {
    mockedUseUserAddress.mockReturnValue(null);
    mockedUseKrauseBalance.mockReturnValue('0');
    render(<PollsApp />);
    expect(screen.getByText(/connect a wallet/i)).toBeInTheDocument();
  });

  it('shows creator when wallet has balance', () => {
    mockedUseUserAddress.mockReturnValue('0x123');
    mockedUseKrauseBalance.mockReturnValue('1');
    render(<PollsApp />);
    expect(screen.queryByText(/connect a wallet/i)).toBeNull();
    expect(screen.getByText(/create poll/i)).toBeInTheDocument();
  });
});
