import type { ListItemI } from "@/types";
import Home from "../Home.vue";

const body = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    id: 35,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
] as ListItemI[];

describe("Home", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/posts", {
      statzusCode: 201,
      body: [...body],
    });
    cy.mount(Home);
  });
  it("should move Post 1 down", () => {
    // Click action button
    cy.get("[data-cy='down-button']").first().click();

    // Check if posts swapped properly
    cy.get("[data-cy='cell-title']")
      .eq(1)
      .should("contain", `Post ${body[0].id}`);
    cy.get("[data-cy='cell-title']")
      .first()
      .should("contain", `Post ${body[1].id}`);
  });

  it("should move post 3 down", () => {
    cy.get("[data-cy='down-button']").eq(2).click();
    cy.get("[data-cy='cell-title']")
      .eq(2)
      .should("contain", `Post ${body[3].id}`);
    cy.get("[data-cy='cell-title']")
      .eq(3)
      .should("contain", `Post ${body[2].id}`);
  });

  it("should move post 35 up", () => {
    cy.get("[data-cy='up-button']").last().click();
    cy.get("[data-cy='cell-title']")
      .eq(4)
      .should("contain", `Post ${body[3].id}`);
    cy.get("[data-cy='cell-title']")
      .eq(3)
      .should("contain", `Post ${body[4].id}`);
  });

  it("should update timeline properly", () => {
    cy.get("[data-cy='down-button']").first().click();
    cy.get("[data-cy='timeline-cell-title']")
      .first()
      .should("contain", "Moved Post 1 from Index 0 to Index 1");

    cy.get("[data-cy='down-button']").eq(2).click();
    cy.get("[data-cy='timeline-cell-title']")
      .first()
      .should("contain", "Moved Post 3 from Index 2 to Index 3");

    cy.get("[data-cy='up-button']").last().click();
    cy.get("[data-cy='timeline-cell-title']")
      .first()
      .should("contain", "Moved Post 35 from Index 4 to Index 3");
  });

  it("should travel in time initial state", () => {
    cy.get("[data-cy='down-button']").first().click();
    cy.get("[data-cy='down-button']").eq(2).click();
    cy.get("[data-cy='up-button']").last().click();

    cy.get("[data-cy='travel-button']").last().click();

    cy.get("[data-cy='cell-title']").each((item, index) => {
      cy.wrap(item).should("contain", `Post ${body[index].id}`);
    });
  });

  it("should travel in time properly", () => {
    cy.get("[data-cy='down-button']").eq(2).click();
    cy.get("[data-cy='up-button']").last().click();
    cy.get("[data-cy='down-button']").first().click();
    cy.get("[data-cy='down-button']").last().click();
    cy.get("[data-cy='up-button']").eq(1).click();
    cy.get("[data-cy='down-button']").last().click();

    cy.get("[data-cy='travel-button']").eq(2).click();
    const expectedOutput = [2, 1, 4, 35, 3];
    cy.get("[data-cy='cell-title']").each((item, index) => {
      cy.wrap(item).should("contain", `Post ${expectedOutput[index]}`);
    });
    cy.get("[data-cy='up-button']").last().click();
    cy.get("[data-cy='down-button']").first().click();
    cy.get("[data-cy='travel-button']").eq(1).click();
    cy.get("[data-cy='cell-title']").each((item, index) => {
      cy.wrap(item).should("contain", `Post ${expectedOutput[index]}`);
    });

    cy.get("[data-cy='travel-button']").eq(1).click();
    const expectedOutput1 = [1, 2, 4, 3, 35];
    cy.get("[data-cy='cell-title']").each((item, index) => {
      cy.wrap(item).should("contain", `Post ${expectedOutput1[index]}`);
    });

    cy.get("[data-cy='travel-button']").click();
    cy.get("[data-cy='cell-title']").each((item, index) => {
      cy.wrap(item).should("contain", `Post ${body[index].id}`);
    });
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
