describe('personeel List tests', function () {
    beforeEach(function () {
      cy.login();
    });
  
    it('delayed response brings state out of sync', () => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/Personeel',
        status: 200,
        response: 'fixture:personeel.json',
      });
      cy.route({
        delay: 2000,
        method: 'GET',
        url: '/api/Personeel/?name=2test',
        status: 200,
        response: 'fixture:2test.json',
      }).as('get2TestPersoneel');
      cy.route({
        method: 'GET',
        url: '/api/Personeel/?name=3test',
        status: 200,
        response: 'fixture:3test.json',
      }).as('get3TestPersoneel');
  
      cy.visit('/');
      cy.get('[data-cy=filterInput]').type('2test');
      cy.wait(300);
      cy.get('[data-cy=filterInput]').type('{backspace}{backspace}3Test');
      cy.wait(['@get2TestPersoneel', '@get3TestPersoneel']);
      cy.get('[data-cy=personeelCard]').should('have.length', 1);
      cy.get('[data-cy=personeel-title]').should('contain', '2Test');
    });
  
    it('delete while showing', () => {
      cy.server();
  
      // add a personeel using a direct request
      cy.request({
        method: 'POST',
        url: '/api/Personeel',
        body: {
          name: 'test',
          functie: 'test',
          geboorteDatum: "2021-05-14",
          datumInDienst: "2021-06-14",
          email: "user@example.com",
          bewoners: [{
              id: 1,
              name: 'test',
              geboorteDatum: '2021-05-14',
              eetOpKamer: 'true',
              wordtGehaald: 'true'
          }
          ],
          Image: {
              id: 0,
              imageData: "string",
              persoonId: 0
          }
        },
        auth: {
          bearer: localStorage.getItem('currentUser'),
        },
      }).then((personeelJson) => {
        cy.visit('/');
        cy.get('[data-cy=filterInput]').type('1Test');
        cy.wait(300);
        cy.get('[data-cy=personeelCard]').should('have.length', 1);
        // click the second delete button
        cy.get('[data-cy=personeelList').find('button').eq(1).click();
        // the newly added one should be deleted (and our view automatically updated)
        cy.get('[data-cy=personeelCard]').should('have.length', 1);
      });
    });
  });