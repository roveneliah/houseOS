describe("Can open and close", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("can open and close with {cmd}k", () => {});
  it("can open and close with {ctrl}k", () => {});

  it("can open with navbar button", () => {
    cy.contains("k").click();
  });
  it("can close with click outside", () => {});
});

// TODO: How to test if users and proposals are showing up if this depends on the DAO and backend state?
describe("Can navigate to pages", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("k").click();
  });

  it("can search and navigate to proposals list", () => {
    cy.get("input").type("proposals", { delay: 0 }).type("{enter}");
    cy.location("pathname").should("include", "/proposals");
  });

  it("can search and navigate to help", () => {
    cy.get("input").type("help", { delay: 0 }).type("{enter}");
    cy.location("pathname").should("eq", "/");
  });

  it("can search and navigate to profile", () => {
    cy.get("input").type("profile", { delay: 0 }).type("{enter}");
    cy.location("pathname").should("eq", "/me");
  });
});
