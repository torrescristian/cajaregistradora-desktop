/// <reference types="cypress" />

describe('pedidos page', () => {
  const PEDIDOS_URL = '/pedidos';

  describe('when try to enter the page without been logged in', () => {
    it('should be redirected to /login', () => {
      cy.visit('/').contains(/iniciar sesión/i);
    });
  });

  describe('when the user is logged with admin', () => {
    it('should complete the login flow', () => {
      cy.visit('/');

      cy.get('[type="email"]').type('admin@gmail.com');

      cy.get('[type="password"]').type('admin123');

      cy.get('[type="submit"]').click();

      cy.wait(500);

      cy.url().should('include', PEDIDOS_URL);

      cy.contains(/productos/i);
    });

    it('should create an order', () => {
      cy.contains(/productos/i);

      cy.get('data-test="product-item"')
        .first()
        .get('data-test="add-product"')
        .click();
    });
  });
});
