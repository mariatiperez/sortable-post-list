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
    cy.checkCellTitle(0, props.id);
  });

  it("should render both buttons", () => {
    cy.mount(ListItem, { props });
    cy.getBySelector("up-button").should("exist");
    cy.getBySelector("down-button").should("exist");
  });

  it("should only render up button", () => {
    cy.mount(ListItem, { props: { ...props, allowDown: false } });
    cy.getBySelector("up-button").should("exist");
    cy.getBySelector("down-button").should("not.exist");
  });

  it("should only render down button", () => {
    cy.mount(ListItem, { props: { ...props, allowUp: false } });
    cy.getBySelector("down-button").should("exist");
    cy.getBySelector("up-button").should("not.exist");
  });

  it("shouldn't render any buttons", () => {
    cy.mount(ListItem, {
      props: { ...props, allowUp: false, allowDown: false },
    });
    cy.getBySelector("up-button").should("not.exist");
    cy.getBySelector("down-button").should("not.exist");
  });

  it("should emit move event", () => {
    const moveEventSpy = cy.spy().as("moveEventSpy");

    cy.mount(ListItem, {
      props: {
        ...props,
        onMove: moveEventSpy,
      },
    });
    cy.clickButton("up", 0).then(() => {
      expect(moveEventSpy).to.be.calledOnce.calledWith({ direction: "up" });
    });

    cy.clickButton("down", 0).then(() => {
      expect(moveEventSpy).to.be.calledTwice.calledWith({
        direction: "down",
      });
    });
  });
});
