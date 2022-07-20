import { expect } from "chai";

import { toPercent } from "../../utils/toPercent";

interface Test {
  expected: any;
  given: any;
}

const test = (fn: Function, should: string) => (testCases: Test[]) => {
  it(`should: ${should}`, () => {
    testCases.forEach(({ given, expected }: Test) => {
      expect(fn(given)).to.equal(expected);
    });
  });
};

describe("toPercent()", () => {
  test(
    toPercent,
    "should map a number to a string percentage"
  )([
    { given: 4.2, expected: "420%" },
    { given: 0.01, expected: "1%" },
  ]);

  it("should return 50%", () => {
    expect(toPercent(0.5)).to.equal("50%");
  });

  it("should return 100%", () => {
    expect(toPercent(1)).to.equal("100%");
  });

  it("handles 0", () => {
    expect(toPercent(0)).to.equal("0%");
  });

  it("handles negative values -101%", () => {
    expect(toPercent(-1.01)).to.equal("-101%");
    expect(toPercent(-5)).to.equal("-500%");
  });

  it("rounds out decimals", () => {
    expect(toPercent(-1.01111)).to.equal("-101%");
  });
});
