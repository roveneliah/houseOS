import React, { ReactNode } from "react";

export const Testable = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => <div data-testid={id}>{children}</div>;
