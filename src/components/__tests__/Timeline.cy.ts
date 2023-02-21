import type { TimelineItemI } from "@/types";
import Timeline from "../Timeline.vue";

const props = {
  timeline: [
    { itemId: 3, prevIndex: 3, currIndex: 2 },
    { itemId: 1, prevIndex: 0, currIndex: 1 },
    { itemId: 2, prevIndex: 1, currIndex: 2 },
    { itemId: 3, prevIndex: 2, currIndex: 3 },
    { itemId: 5, prevIndex: 4, currIndex: 3 },
  ] as TimelineItemI[],
};

describe("Timeline", () => {
  it("should render list properly with props", () => {
    cy.mount(Timeline, {
      props,
    });

    cy.get("[data-cy='timeline-item']").should(
      "have.length",
      props.timeline.length
    );

    // first
    cy.get("[data-cy='timeline-item']")
      .first()
      .find("[data-cy='travel-button']")
      .should("exist");

    //second
    cy.get("[data-cy='timeline-item']")
      .next()
      .find("[data-cy='travel-button']")
      .should("exist");

    // last
    cy.get("[data-cy='timeline-item']")
      .last()
      .find("[data-cy='travel-button']")
      .should("exist");
  });

  it("should emit travel event", () => {
    const travelEventSpy = cy.spy().as("travelEventSpy");

    cy.mount(Timeline, {
      props: {
        ...props,
        onTravel: travelEventSpy,
      },
    });

    // first
    cy.get("[data-cy='travel-button']")
      .first()
      .click()
      .then(() => {
        expect(travelEventSpy).to.be.calledOnce.calledWith(0);
      });

    // third
    cy.get("[data-cy='travel-button']")
      .and((button) => button.get(2).click())
      .then(() => {
        expect(travelEventSpy).to.be.calledTwice.calledWith(2);
      });

    // last
    cy.get("[data-cy='travel-button']")
      .last()
      .click()
      .then(() => {
        expect(travelEventSpy).to.be.calledThrice.calledWith(4);
      });
  });
});
