import { expect } from "chai";

import { pickRandom } from "./pickRandom";

/**
 * Note: `eql` is equivalent to == (abstract equality)
 */
describe("pickRandom", () => {
  it("should return arr if n >= arr.length", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(pickRandom(arr.length)(arr)).to.eql(arr);
    expect(pickRandom(arr.length + 1)(arr)).to.eql(arr);
  });

  it("should return [] on number <= 0", () => {
    // expect(pickRandom(-1)([1, 2, 3])).to.eql([]);
    expect(pickRandom(0)([1, 2, 3])).to.eql([]);
  });

  it("should pick n random items from arr", () => {
    const arr = [1, 2, 3, 4, 5];

    const picks1 = pickRandom(1)(arr);
    expect(picks1.length).to.equal(1);

    const picks2 = pickRandom(2)(arr);
    expect(picks2.length).to.equal(2);

    const picks3 = pickRandom(3)(arr);
    expect(picks3.length).to.equal(3);
  });
});
