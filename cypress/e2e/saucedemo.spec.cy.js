describe("SauceDemo UI Test", () => {
    it("should log in and verify sorting", () => {
      // Visit the website
      cy.visit("https://www.saucedemo.com/");
  
      // Log in with valid credentials
      cy.get('[data-test="username"]').type("standard_user");
      cy.get('[data-test="password"]').type("secret_sauce");
      cy.get('[data-test="login-button"]').click();
  
      // Verify that items are sorted by Name (A -> Z)
      cy.get('[data-test="product_sort_container"]').select("az");
      cy.get('.inventory_item_name')
        .should('have.length.gt', 1)
        .then($items => {
          const itemNames = [];
          $items.each((index, element) => {
            itemNames.push(element.textContent);
          });
          // Check if the item names are sorted in ascending order (A -> Z)
          expect(itemNames).to.eql(itemNames.slice().sort());
        });
  
      // Change sorting to Name (Z -> A)
      cy.get('[data-test="product_sort_container"]').select("za");
  
      // Verify that items are sorted correctly (Z -> A)
      cy.get('.inventory_item_name')
        .should('have.length.gt', 1)
        .then($items => {
          const itemNames = [];
          $items.each((index, element) => {
            itemNames.push(element.textContent);
          });
          // Check if the item names are sorted in descending order (Z -> A)
          expect(itemNames).to.eql(itemNames.slice().sort().reverse());
        });
    });
  });
