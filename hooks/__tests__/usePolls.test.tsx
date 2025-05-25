import React from "react";
import { render, act } from "@testing-library/react";
import { expect } from "chai";
import { usePolls } from "../usePolls";

function HookWrapper({ onReady }: { onReady: (h: ReturnType<typeof usePolls>) => void }) {
  const hook = usePolls();
  onReady(hook);
  return null;
}

describe("usePolls", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads polls from localStorage", () => {
    const polls = [{ id: "1", question: "Q?", options: [] }];
    localStorage.setItem("polls", JSON.stringify(polls));

    let hook: any = null;
    render(<HookWrapper onReady={(h) => (hook = h)} />);

    expect(hook.polls).to.deep.equal(polls);
  });

  it("adds a poll and saves to localStorage", () => {
    let hook: any = null;
    render(<HookWrapper onReady={(h) => (hook = h)} />);

    act(() => {
      hook.addPoll("Test?", ["yes", "no"]);
    });

    const stored = JSON.parse(localStorage.getItem("polls") || "[]");
    expect(stored).to.have.length(1);
    expect(stored[0].question).to.equal("Test?");
  });

  it("records a vote and saves to localStorage", () => {
    let hook: any = null;
    render(<HookWrapper onReady={(h) => (hook = h)} />);

    act(() => {
      hook.addPoll("Test?", ["yes", "no"]);
    });
    const pollId = hook.polls[0].id;

    act(() => {
      hook.vote(pollId, 0, { address: "0x1", weight: 1, comment: "hi" });
    });

    const stored = JSON.parse(localStorage.getItem("polls") || "[]");
    expect(stored[0].options[0].votes).to.have.length(1);
    expect(stored[0].options[0].votes[0].address).to.equal("0x1");
  });

  it("handles invalid JSON in localStorage", () => {
    localStorage.setItem("polls", "not-json");
    let hook: any = null;
    render(<HookWrapper onReady={(h) => (hook = h)} />);
    expect(hook.polls).to.deep.equal([]);
  });
});
