import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from 'chai';
import PollsApp from '../Polls';

const mockUseSignIn = jest.fn();
jest.mock('@/hooks/sign-in/useSignIn', () => ({ useSignIn: () => mockUseSignIn() }));

const mockUseKrauseBalance = jest.fn();
const mockUseUserAddress = jest.fn();
jest.mock('@/hooks/ethereum', () => ({
  useUserAddress: () => mockUseUserAddress(),
  useKrauseBalance: () => mockUseKrauseBalance(),
}));

jest.mock('@/hooks/usePolls', () => ({
  usePolls: () => ({ polls: [], addPoll: jest.fn(), vote: jest.fn() }),
}));

describe('Polls gating', () => {
  it('disables interaction when not signed in or no balance', () => {
    mockUseSignIn.mockReturnValue({ signedIn: false });
    mockUseUserAddress.mockReturnValue('0x1');
    mockUseKrauseBalance.mockReturnValue('0');
    render(<PollsApp />);
    expect(screen.getByText(/Connect wallet with \$KRAUSE to create polls/i)).to.exist;
    expect(screen.getByText(/Connect wallet with \$KRAUSE to vote/i)).to.exist;
  });

  it('allows interaction with balance and sign in', () => {
    mockUseSignIn.mockReturnValue({ signedIn: true });
    mockUseUserAddress.mockReturnValue('0x1');
    mockUseKrauseBalance.mockReturnValue('10');
    render(<PollsApp />);
    expect(screen.queryByText(/Connect wallet with \$KRAUSE to create polls/i)).to.be.null;
  });
});
