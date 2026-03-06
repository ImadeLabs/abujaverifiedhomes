describe("Listings + Details", () => {
  it("Shows available listings", () => {
    cy.visit("/listings");

    cy.contains("Available Listings").should("be.visible");
    cy.contains("4 Bedroom Duplex in Wuse").should("be.visible");
    cy.contains("₦185,000,000").should("be.visible");
    cy.contains("View details").should("be.visible");
  });

  it("opens property details", () => {
    cy.visit("/listings");

    // click the first property card/link
    cy.get('a[href^="/listings/"]').first().click();

    cy.url().should("match", /\/listings\/.+/);

    // confirm it loaded real data (not your error state)
    cy.contains("Property not found").should("not.exist");

    // optionally assert title if you know it will always be there
    cy.contains("4 Bedroom Duplex in Wuse", { timeout: 10000 }).should("be.visible");
  });
});