describe("Login", () => {
  before(() => {
    cy.visit("/");
  });

  it("can connect wallet", () => {
    cy.contains("Connect").click();
  });

  it("can SIWE if connected", () => {});

  it("redirects to sign-up if no account", () => {});
  it("loads profile if connected", () => {});
});
