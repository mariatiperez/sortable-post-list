import type { ListItemI } from "@/types";
import SortableList from "../SortableList.vue";

const props = {
  list: [
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
      id: 5,
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    },
  ] as ListItemI[],
};

describe("SortableList", () => {
  it("should render message if list is empty", () => {
    cy.mount(SortableList, {
      props: { list: [] },
    });
    cy.get("[data-cy='empty-list-message']").should("exist");
  });

  it("should render list properly with props", () => {
    cy.mount(SortableList, {
      props,
    });
    cy.get("[data-cy='list-item']").should("have.length", 5);
    // first
    cy.get("[data-cy='list-item']")
      .first()
      .find("[data-cy='down-button']")
      .should("exist");
    cy.get("[data-cy='list-item']")
      .first()
      .find("[data-cy='up-button']")
      .should("not.exist");

    //second
    cy.get("[data-cy='list-item']")
      .next()
      .find("[data-cy='down-button']")
      .should("exist");
    cy.get("[data-cy='list-item']")
      .next()
      .find("[data-cy='up-button']")
      .should("exist");

    // last
    cy.get("[data-cy='list-item']")
      .last()
      .find("[data-cy='down-button']")
      .should("not.exist");
    cy.get("[data-cy='list-item']")
      .last()
      .find("[data-cy='up-button']")
      .should("exist");
  });

  it("should emit move event", () => {
    const moveEventSpy = cy.spy().as("moveEventSpy");

    cy.mount(SortableList, {
      props: {
        ...props,
        onMove: moveEventSpy,
      },
    });

    cy.get("[data-cy='down-button']")
      .first()
      .click()
      .then(() => {
        expect(moveEventSpy).to.be.calledOnce.calledWith({
          direction: "down",
          index: 0,
          item: props.list[0],
        });
      });

    // first item doesn't have the up button so we target index+1
    cy.get("[data-cy='up-button']")
      .and((button) => button.get(2).click())
      .then(() => {
        expect(moveEventSpy).to.be.calledTwice.calledWith({
          direction: "up",
          index: 3,
          item: props.list[3],
        });
      });

    cy.get("[data-cy='up-button']")
      .last()
      .click()
      .then(() => {
        expect(moveEventSpy).to.be.calledThrice.calledWith({
          direction: "up",
          index: props.list.length - 1,
          item: props.list.pop(),
        });
      });
  });
});
