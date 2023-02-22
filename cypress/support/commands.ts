/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * @description Get one or more DOM elements by data-cy selector
       * @param {string} selector - Selector without data-cy
       * @example cy.getBySelector("confirm-button")
       */
      getBySelector(selector: string): Chainable<JQuery<HTMLElement>>;

      /**
       * @description Click a button
       * @param {string} selector - Button name without "-button"
       * @param {number} [index=0] - Button index in DOM
       * @example cy.clickButton("up", 2) // Click 3rd "up-button"
       */
      clickButton(
        selector: "up" | "down" | "travel" | "confirm" | "cancel",
        index?: number
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * @description Check if a post cell title contains "Post {id}"
       * @param {number} id - Post id to check
       * @param {number} [index=0] - Cell index in DOM
       * @example cy.checkCellTitle(1) // Check if first cell (index 0) contains "Post 1"
       * @example cy.checkCellTitle(45, 2) // Check if third cell (index 2) contains "Post 45"
       */
      checkCellTitle(id: number, index?: number): Chainable<void>;

      /**
       * @description Check if a post cell title contains "Moved Post {id} from index {prevIndex} to index {newIndex}"
       * @param {number} id - Post id to check
       * @param {number} prevIndex - Previous index, before moving the post
       * @param {string} direction - Direction of the movement, "up" adds 1 to {prevIndex}, "down" subtracts 1 to {prevIndex}
       * @param {number} [index=0] - Cell index in DOM
       * @example cy.checkTimelineCellTitle(1, 0, "down") // Check if first cell (index 0) constains "Moved Post 1 from index 0 to index 1"
       * @example cy.checkTimelineCellTitle(1, 0, "down", 2) // Check if 3rd cell (index 2) constains "Moved Post 1 from index 0 to index 1"
       */
      checkTimelineCellTitle(
        id: number,
        prevIndex: number,
        direction: "up" | "down",
        index?: number
      ): Chainable<void>;

      /**
       * @description Check the order of the posts
       * @param {number[]} expectedOutput - Ordered posts IDs
       * @example cy.checkPostsOrder([2, 1, 4, 5, 3]); // Check if posts are in the specified order
       */
      checkPostsOrder(expectedOutput: number[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add(
  "getBySelector",
  { prevSubject: "optional" },
  (subject, selector) => {
    if (subject) {
      return cy.wrap(subject).find(`[data-cy=${selector}]`);
    }
    return cy.get(`[data-cy=${selector}]`);
  }
);

Cypress.Commands.add("clickButton", (selector, index = 0) => {
  return cy.getBySelector(`${selector}-button`).eq(index).click();
});

Cypress.Commands.add("checkCellTitle", (id, index = 0) => {
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
        `Moved Post ${id} from index ${prevIndex} to index ${newIndex}`
      );
  }
);

Cypress.Commands.add("checkPostsOrder", (expectedOutput) => {
  cy.getBySelector("cell-title").each((item, index) => {
    cy.wrap(item).should("contain", `Post ${expectedOutput[index]}`);
  });
});

export {};
