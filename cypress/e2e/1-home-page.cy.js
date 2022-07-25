import { dao } from "../../config";

describe("Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("renders expected elements", () => {
    cy.contains(dao.name);
    cy.contains("Welcome");
    cy.contains("Navigation");
    cy.contains("Tags");
  });
});
