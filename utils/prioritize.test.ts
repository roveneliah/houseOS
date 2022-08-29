import { expect } from "chai";
import { prioritize } from "./prioritize";

describe("prioritize", () => {
  it("should move members that satisfy predicate to the front of the array", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const predicate = (x) => x % 2 === 0;
    const result = prioritize(predicate)(arr);
    expect(result).to.deep.equal([2, 4, 6, 8, 10, 1, 3, 5, 7, 9]);
  });

  it("should return the original array if no members satisfy predicate", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const predicate = (x) => false;
    const result = prioritize(predicate)(arr);
    expect(result).to.deep.equal(arr);
  });
});
