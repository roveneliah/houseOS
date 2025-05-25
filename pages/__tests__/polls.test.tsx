import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { expect } from "chai";
import PollsPage from "../polls";

// Helper to query by placeholder
const byPlaceholder = (container: HTMLElement, text: string) =>
  container.querySelector(`input[placeholder='${text}']`) as HTMLInputElement;


describe("PollsPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("allows creating and voting on a poll", () => {
    const { container, getByText } = render(<PollsPage />);

    fireEvent.change(byPlaceholder(container, "Question"), {
      target: { value: "My Q" },
    });
    fireEvent.change(byPlaceholder(container, "Option 1"), {
      target: { value: "Yes" },
    });
    fireEvent.change(byPlaceholder(container, "Option 2"), {
      target: { value: "No" },
    });
    fireEvent.click(getByText("Create"));

    expect(container.textContent).to.contain("My Q");

    fireEvent.change(byPlaceholder(container, "Address"), {
      target: { value: "0x1" },
    });
    fireEvent.change(byPlaceholder(container, "Token Weight"), {
      target: { value: "5" },
    });
    fireEvent.click(getByText("Vote"));

    expect(container.textContent).to.contain("Weight: 5");
  });
});
