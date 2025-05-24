import React from "react";
import { render } from "@testing-library/react";
import { PollCreator, PollCard } from "./Polls";
import { Poll } from "@/types/Poll";

describe("Poll gating", () => {
  it("disables creation without balance", () => {
    const { getByText } = render(<PollCreator add={() => {}} canCreate={false} />);
    expect(getByText(/connect a wallet/i)).toBeInTheDocument();
  });

  it("disables voting without balance", () => {
    const poll: Poll = { id: "1", question: "Q?", options: [{ id: 0, text: "A", votes: [] }] };
    const { getByText } = render(
      <PollCard poll={poll} onVote={() => {}} canVote={false} />
    );
    expect(getByText(/connect a wallet/i)).toBeInTheDocument();
  });
});
