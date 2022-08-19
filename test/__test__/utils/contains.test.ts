import { expect } from "chai";

import { contains } from "../../../utils/contains";

describe("contains", () => {
  it("should crash on invalid input", () => {
    expect(() => contains(5)("test")).to.throw();
    expect(() => contains("test")(5)).to.throw();
    expect(() => contains(5)(5)).to.throw();
    expect(() => contains()("hi")).to.throw();
    expect(() => contains("hi")()).to.throw();
    expect(() => contains()()).to.throw();
  });

  it("should consider matching string true", () => {
    expect(contains("test")("test")).to.be.true;
    expect(contains("tEsT")("TeSt")).to.be.true;
  });
  it("should be true anytime str1 included in str2", () => {
    expect(contains("t")("TeSt")).to.be.true;
    expect(contains("St")("test")).to.be.true;
    expect(contains("esT")("TeSt")).to.be.true;
  });

  it("should ignore upper/lower case", () => {
    expect(contains("test")("TEST")).to.be.true;
    expect(contains("tEs")("TeST")).to.be.true;
  });

  it("should return false when str1 is longer than str2", () => {
    expect(contains("1111")("111")).to.be.false;
    expect(contains("testt")("test")).to.be.false;
  });

  it("should return false when str1 isn't in str2", () => {
    expect(contains("12")("111")).to.be.false;
    expect(contains("tt")("test")).to.be.false;
    expect(contains("a")("test")).to.be.false;
  });
});
