import { render } from "@testing-library/react";
import { useBoolean } from "./useBoolean";
import { expect as expectChai } from "chai";

const TestComponent = ({ initValue }: { initValue?: boolean }) => {
  const [value, toggle] = useBoolean(initValue);

  return <div>{String(value)}</div>;
};

describe("useBoolean", () => {
  it("should have { value } equal to initial value before any changes", () => {
    const componentTrue = render(<TestComponent initValue={true} />);
    expectChai(componentTrue.asFragment().textContent).to.equal("true");

    const componentFalse = render(<TestComponent initValue={false} />);
    expectChai(componentFalse.asFragment().textContent).to.equal("false");
  });

  it("should have initial value false if no initValue", () => {
    const component = render(<TestComponent />);
    expectChai(component.asFragment().textContent).to.equal("false");
  });

  it.todo("should flip value on toggle");
  it.todo("should throw on invalid input value");
});
