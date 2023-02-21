import ListItem from "../ListItem.vue";

const props = {
  id: 5,
  allowUp: true,
  allowDown: true,
};

describe("ListItem", () => {
  it("should render title properly", () => {
    cy.mount(ListItem, {
      props,
    });
    cy.get("[data-cy='cell-title']").should("contain", `Post ${props.id}`);
  });

  it("should render both buttons", () => {
    cy.mount(ListItem, { props });
    cy.get("[data-cy='up-button'] > i").should("have.class", "fa-chevron-up");
    cy.get("[data-cy='down-button'] > i").should(
      "have.class",
      "fa-chevron-down"
    );
  });

  it("should only render up button", () => {
    cy.mount(ListItem, { props: { ...props, allowDown: false } });
    cy.get("[data-cy='up-button'] > i").should("have.class", "fa-chevron-up");
    cy.get("[data-cy='down-button']").should("not.exist");
  });

  it("should only render down button", () => {
    cy.mount(ListItem, { props: { ...props, allowUp: false } });
    cy.get("[data-cy='down-button'] > i").should(
      "have.class",
      "fa-chevron-down"
    );
    cy.get("[data-cy='up-button']").should("not.exist");
  });

  it("shouldn't render any buttons", () => {
    cy.mount(ListItem, {
      props: { ...props, allowUp: false, allowDown: false },
    });
    cy.get("[data-cy='up-button']").should("not.exist");
    cy.get("[data-cy='down-button']").should("not.exist");
  });

  it("should emit move event", () => {
    const moveEventSpy = cy.spy().as("moveEventSpy");

    cy.mount(ListItem, {
      props: {
        ...props,
        onMove: moveEventSpy,
      },
    });
    cy.get("[data-cy='up-button']")
      .click()
      .then(() => {
        expect(moveEventSpy).to.be.calledOnce.calledWith({ direction: "up" });
      });

    cy.get("[data-cy='down-button']")
      .click()
      .then(() => {
        expect(moveEventSpy).to.be.calledTwice.calledWith({
          direction: "down",
        });
      });
  });
});
