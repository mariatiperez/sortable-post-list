import TimelineItem from "../TimelineItem.vue";

const props = {
  itemId: 5,
  prevIndex: 4,
  currIndex: 3,
};

describe("TimelineItem", () => {
  it("should render title properly", () => {
    cy.mount(TimelineItem, {
      props,
    });

    cy.checkTimelineCellTitle(props.itemId, props.prevIndex, "up");
    cy.getBySelector("travel-button").should("exist");
  });

  it("should emit travel event", () => {
    const travelEventSpy = cy.spy().as("travelEventSpy");
    cy.mount(TimelineItem, { props: { ...props, onTravel: travelEventSpy } });

    cy.clickButton("travel");
    cy.clickButton("confirm").then(() => {
      expect(travelEventSpy).to.be.calledOnce;
    });
  });

  it("should not emit travel event", () => {
    const travelEventSpy = cy.spy().as("travelEventSpy");
    cy.mount(TimelineItem, { props: { ...props, onTravel: travelEventSpy } });

    cy.clickButton("travel");
    cy.clickButton("cancel").then(() => {
      expect(travelEventSpy).not.to.be.called;
    });
  });
});
