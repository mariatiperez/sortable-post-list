/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getBySelector(selector: string): Chainable<JQuery<HTMLElement>>;
      findBySelector(selector: string): Chainable<JQuery<HTMLElement>>;
      clickButton(
        selector: "up" | "down" | "travel" | "confirm" | "cancel",
        index?: number
      ): Chainable<JQuery<HTMLElement>>;
      checkCellTitle(index: number, id: number): Chainable<void>;
      checkTimelineCellTitle(
        id: number,
        index: number,
        direction: "up" | "down"
      ): Chainable<void>;
      checkPostsOrder(expectedOutput: number[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add("getBySelector", (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add("findBySelector", (selector) => {
  return cy.find(`[data-cy=${selector}]`);
});

Cypress.Commands.add("clickButton", (selector, index = 0) => {
  return cy.getBySelector(`${selector}-button`).eq(index).click();
});

Cypress.Commands.add("checkCellTitle", (index, id) => {
  cy.getBySelector("cell-title").eq(index).should("contain", `Post ${id}`);
});

Cypress.Commands.add(
  "checkTimelineCellTitle",
  (id, prevIndex, direction, index = 0) => {
    const newIndex = prevIndex + (direction === "up" ? -1 : 1);
    cy.getBySelector("timeline-cell-title")
      .eq(index)
      .should(
        "contain",
        `Moved Post ${id} from Index ${prevIndex} to Index ${newIndex}`
      );
  }
);

Cypress.Commands.add("checkPostsOrder", (expectedOutput) => {
  cy.getBySelector("cell-title").each((item, index) => {
    cy.wrap(item).should("contain", `Post ${expectedOutput[index]}`);
  });
});

export {};
