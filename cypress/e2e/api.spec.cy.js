import 'cypress-commands';

describe('API Test', () => {
    it('should fetch data from the API and verify objects with the "Category: Authentication & Authorization" property', () => {
        
        cy.request('https://api.publicapis.org/entries').then((response) => {

            expect(response.status).to.eq(200);

            // Reads the response and searches for objects with "Category: Authentication and Authorization"
            const apiData = response.body.entries;
            const filteredObjects = apiData.filter((entry) => entry.Category === 'Authentication & Authorization');

            // Checks the number of objects found
            const count = filteredObjects.length;

            // Checks if all found objects in filteredObjects have the property Category: 'Authentication & Authorization' and prints the found objects
            const allHaveCategoryAuth = filteredObjects.every((entry) => entry.Category === 'Authentication & Authorization');

            if (allHaveCategoryAuth) {
                cy.log('All found objects have the "Category: Authentication & Authorization" property.');
                cy.log('Found objects:');
                cy.log(JSON.stringify(filteredObjects, null, 2));
            } else {
                cy.log('At least one filtered object does not have the "Category: Authentication & Authorization" property.');
            }
        });
    });
});