import { expect } from "chai";
import { toPercent } from "./toPercent";

describe("toPercent", () => {
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

  it("should map NaN to 0%", () => {
    expect(toPercent(0 / 0)).to.equal("0%");
  });

  it("Should handle positive and negative infinity", () => {
    expect(toPercent(Infinity)).to.equal("0%");
    expect(toPercent(-Infinity)).to.equal("0%");
  });
});
