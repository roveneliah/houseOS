import React from "react";

export const Testable = ({ children, id }) => (
  <div data-testid={id}>{children}</div>
);
