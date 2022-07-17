import { dao } from "../../config";

describe("sample", () => {
  it("should visit", () => {
    cy.visit("/");

    cy.contains(dao.name);
    cy.contains(dao.memberName);
    cy.contains(dao.description);

    cy.contains("Connect").click();
  });
});
