import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { Testable } from "./Testable";

export const renderWithId = (component: ReactNode) => {
  const id = String(100000 * Math.random());
  render(<Testable id={id}>{component}</Testable>);
  return screen.getByTestId(id);
};
