const { Button } = require("selenium-webdriver");

describe('My First Test', function() {
    it('our app runs', function() {
      cy.visit('http://localhost:4200');
      cy.get('[data-cy=filterInput]').type('');
      cy.get('[data-cy=personeelCard]').should('have.length', );
    });
  });
  it('mock personeel get', function() {
    cy.server({ delay: 1000 });
    cy.route({
      method: 'GET',
      url: '/api/Personeel/',
      status: 200,
      response: 'fixture:personeel.json'
    });

    cy.visit('/');
    cy.get('[data-cy=personeelCard]').should('have.length', 9);
  });
  it('on error should show error message', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/Personeel/',
      status: 500,
      response: 'ERROR'
    });
    cy.visit('/');
    cy.get('[data-cy=appError]').should('be.visible');
  });

  describe('The Login Page', () => {
    it('logging in  ', function () {
      cy.visit('/login')
  
      cy.get('input[data-cy=username]').type('master@hogent.be').should('have.value', 'master@hogent.be')
  
      cy.get('input[data-cy=password]').type(`P@ssword1111`).should('have.value', `P@ssword1111`)
      cy.get('Button[data-cy=loginform]').submit().next().should('contain', 'Your form has been submitted!')
      
      // we should be redirected to /dashboard
      cy.url().should('include', '/Personeel/list')
    })
  })
