/// <reference types="cypress"/>

describe('Pets page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://631c5fa04fa7d3264caca918.mockapi.io/api/cats', {
      fixture: 'cats.json',
    }).as('getCats');
    cy.visit('/');
    cy.wait('@getCats');
  });

  it('should be able to filter by favoured', () => {
    cy.get('#favorite').select('favoured');
    cy.get('[data-testid="cat-card"]').should('have.length', 3);
  });

  it('should be able to filter by gender', () => {
    cy.get('#gender').select('male');
    cy.get('[data-testid="cat-card"]').should('have.length', 2);
  });

  it('should be able to filter by both gender and favorite', () => {
    cy.get('#favorite').select('favoured');
    cy.get('#gender').select('male');
    cy.get('[data-testid="cat-card"]').should('have.length', 1);
  });
});
