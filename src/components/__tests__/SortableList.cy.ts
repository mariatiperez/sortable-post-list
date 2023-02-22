import type { ListItemI } from "@/types";
import SortableList from "../SortableList.vue";

describe("SortableList", () => {
  beforeEach(() => {
    cy.fixture("postsList").as("list");
  });

  it("should render message if list is empty", () => {
    cy.mount(SortableList, {
      props: { list: [] },
    });
    cy.getBySelector("empty-list-message").should("exist");
  });

  it("should render list properly with props", function () {
    cy.mount(SortableList, {
      props: { list: this.list },
    });
    cy.getBySelector("list-item").should("have.length", 5);

    // first
    cy.getBySelector("list-item")
      .first()
      .getBySelector("down-button")
      .should("exist");
    cy.getBySelector("list-item")
      .first()
      .getBySelector("up-button")
      .should("not.exist");

    //second
    cy.getBySelector("list-item")
      .eq(1)
      .getBySelector("down-button")
      .should("exist");
    cy.getBySelector("list-item")
      .eq(1)
      .getBySelector("up-button")
      .should("exist");

    // last
    cy.getBySelector("list-item")
      .last()
      .getBySelector("down-button")
      .should("not.exist");
    cy.getBySelector("list-item")
      .last()
      .getBySelector("up-button")
      .should("exist");
  });

  it("should emit move event", function () {
    const moveEventSpy = cy.spy().as("moveEventSpy");

    cy.mount(SortableList, {
      props: {
        list: this.list,
        onMove: moveEventSpy,
      },
    });

    // Move 1st post down
    cy.clickButton("down").then(() => {
      expect(moveEventSpy).to.be.calledOnce.calledWith({
        direction: "down",
        index: 0,
        item: this.list[0],
      });
    });

    // Move 3rd post up
    cy.clickButton("up", 2).then(() => {
      expect(moveEventSpy).to.be.calledTwice.calledWith({
        direction: "up",
        index: 3,
        item: this.list[3],
      });
    });

    // Move last post up
    cy.clickButton("up", 3).then(() => {
      expect(moveEventSpy).to.be.calledThrice.calledWith({
        direction: "up",
        index: this.list.length - 1,
        item: this.list.pop(),
      });
    });
  });
});
