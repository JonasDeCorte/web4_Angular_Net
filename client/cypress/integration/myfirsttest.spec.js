describe('My First Test', function() {
  beforeEach(function () {
    cy.login();
  });
    it('our app runs', function() {
      cy.visit('http://localhost:4200');
      cy.get('[data-cy=personeelCard]').should('have.length', 9);
    });
 });
 describe('test add person', function() {
  beforeEach(function () {
    cy.login();
  });
    it('test add person', function() {
      cy.visit('http://localhost:4200/personeel/add');
      cy.get('[data-cy=naam]').type('hello world');
      cy.get('[data-cy=functie]').type('hello world');
      cy.get('[data-cy=email]').type('helloworld@gmail.com');
      cy.get('[data-cy=telefoonNummer]').type('0478194517');
      cy.get('[data-cy=geboorteDatum]').type('2000-05-04');
      cy.get('[data-cy=datumInDienst]').type('2018-05-04');
      cy.get('[data-cy=btnsubmit]').click();
      cy.get('[data-cy=personeelCard]').should('have.length', 10);
    });
 });
 describe('test delete  person', function() {
  beforeEach(function () {
    cy.login();
  });
 it('delete while showing', () => {
  cy.server();

    cy.visit('/');
    cy.get('[data-cy=personeelCard]').should('have.length', 10);

    cy.get('[data-cy=personeelList').find('[data-cy=delete]').eq(9).click();

    cy.get('[data-cy=personeelCard]').should('have.length', 9);
  });
});

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
    cy.get('[data-cy=filterInput]').type('{backspace}{backspace}{backspace}{backspace}{backspace}3test');
    cy.wait(['@get2TestPersoneel', '@get3TestPersoneel']);
    cy.get('[data-cy=personeelCard]').should('have.length', 1);
    cy.get('[data-cy=personeel-title]').should('contain', '3test');
  });
});