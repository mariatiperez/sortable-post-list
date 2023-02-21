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
    cy.get("[data-cy='timeline-cell-title']").should(
      "contain",
      `Moved Post ${props.itemId} from Index ${props.prevIndex} to Index ${props.currIndex}`
    );
    cy.get("[data-cy='travel-button']").should("contain", "Time Travel");
  });

  it("should emit travel event", () => {
    const travelEventSpy = cy.spy().as("travelEventSpy");

    cy.mount(TimelineItem, { props: { ...props, onTravel: travelEventSpy } });
    cy.get("[data-cy='travel-button']")
      .click()
      .then(() => {
        expect(travelEventSpy).to.be.calledOnce;
      });
  });
});
