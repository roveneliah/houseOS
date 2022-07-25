import { dao } from "../../config";

describe("Can find users", () => {
  it("via search", () => {});
  it("via list", () => {});
});

describe("Viewing a user", () => {
  describe("header", () => {
    it("renders basic info", () => {});
    it("can see top 3 labels", () => {});
    it("profile picture renders", () => {});
  });

  describe("can view their activity", () => {
    it("can view comments", () => {});
    it("can view taggings", () => {});
  });

  describe("can view tags", () => {
    it("can see who tagged");
  });

  it("can see follows", () => {});
});

describe("Viewing a user (signed in)", () => {
  describe("labels", () => {
    it("can add labels", () => {});
    it("can remove labels", () => {});
  });

  describe("follow", () => {
    it("renders if following or not", () => {});
    it("can follow", () => {});
    it("can unfollow", () => {});
  });
});
