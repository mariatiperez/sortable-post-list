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
  beforeEach(() => {
    cy.fixture("timeline").as("timeline");
  });

  it("should render list properly with props", function () {
    cy.mount(Timeline, {
      props: { timeline: this.timeline },
    });

    cy.getBySelector("timeline-item").should(
      "have.length",
      this.timeline.length
    );

    // first
    cy.getBySelector("travel-button").should(
      "have.length",
      this.timeline.length
    );
  });

  it("should emit travel event", function () {
    const travelEventSpy = cy.spy().as("travelEventSpy");

    cy.mount(Timeline, {
      props: {
        timeline: this.timeline,
        onTravel: travelEventSpy,
      },
    });

    // first
    cy.clickButton("travel");
    cy.clickButton("confirm", 0).then(() => {
      expect(travelEventSpy).to.be.calledOnce.calledWith(0);
    });

    // third
    cy.clickButton("travel", 2);
    cy.clickButton("confirm", 0).then(() => {
      expect(travelEventSpy).to.be.calledTwice.calledWith(2);
    });

    // last
    cy.clickButton("travel", this.timeline.length - 1);
    cy.clickButton("confirm", 0).then(() => {
      expect(travelEventSpy).to.be.calledThrice.calledWith(4);
    });
  });
});
