import type { ListItemI } from "@/types";
import Home from "../Home.vue";

describe("Home", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/posts", {
      statzusCode: 201,
      fixture: "postsList",
    });
    cy.fixture("postsList").as("list");
    cy.mount(Home);
  });

  it("should move Post 1 down", function () {
    // Click action button
    cy.clickButton("down", 0);

    // Check if posts swapped properly
    cy.checkCellTitle(1, this.list[0].id);
    cy.checkCellTitle(0, this.list[1].id);
  });

  it("should move post 3 down", function () {
    cy.clickButton("down", 2);
    cy.checkCellTitle(2, this.list[3].id);
    cy.checkCellTitle(3, this.list[2].id);
  });

  it("should move post 5 up", function () {
    cy.clickButton("up", 3);
    cy.checkCellTitle(4, this.list[3].id);
    cy.checkCellTitle(3, this.list[4].id);
  });

  it("should update timeline properly", () => {
    cy.clickButton("down", 0);
    cy.checkTimelineCellTitle(1, 0, "down");

    cy.clickButton("down", 2);
    cy.checkTimelineCellTitle(3, 2, "down");

    cy.clickButton("up", 3);
    cy.checkTimelineCellTitle(5, 4, "up");
  });

  it("should travel in time to the initial state", () => {
    // Move posts around
    cy.clickButton("down", 0);
    cy.clickButton("down", 2);
    cy.clickButton("up", 3);

    // Travel in time to the initial state
    cy.clickButton("travel", 2);
    cy.clickButton("confirm", 0);

    cy.checkPostsOrder([1, 2, 3, 4, 5]);
  });

  it("should travel in time properly", () => {
    // Move posts around
    cy.clickButton("down", 2);
    cy.clickButton("up", 3);
    cy.clickButton("down", 0);
    cy.clickButton("down", 3);
    cy.clickButton("up", 1);
    cy.clickButton("down", 3);

    // Travel in time
    cy.clickButton("travel", 2);
    cy.clickButton("confirm", 0);

    cy.checkPostsOrder([2, 1, 4, 5, 3]);

    // Move posts around
    cy.clickButton("up", 3);
    cy.clickButton("down", 0);

    // Travel in time
    cy.clickButton("travel", 1);
    cy.clickButton("confirm", 0);

    cy.checkPostsOrder([2, 1, 4, 5, 3]);

    // Travel in time
    cy.clickButton("travel", 1);
    cy.clickButton("confirm", 0);

    cy.checkPostsOrder([1, 2, 4, 3, 5]);

    // Travel in time to the initial state
    cy.clickButton("travel", 0);
    cy.clickButton("confirm", 0);

    cy.checkPostsOrder([1, 2, 3, 4, 5]);
  });
});

describe("Home Error Handling", () => {
  it("should render if network fails", () => {
    cy.intercept("GET", "**/posts", {
      statusCode: 500,
      body: "Internal Server Error",
    });
    cy.mount(Home);
  });

  it("should render if posts are empty", () => {
    cy.intercept("GET", "**/posts", {
      statusCode: 200,
      body: [],
    });
    cy.mount(Home);
  });
});
