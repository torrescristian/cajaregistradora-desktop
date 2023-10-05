import {
  CAJA_URL,
  CREAR_CUPONES_URL,
  CREAR_PRODUCTOS_URL,
  ORDENES_URL,
  REABASTECER_URL,
  RECIBOS_URL,
} from '../../support/helpers';

describe('Login page', () => {
  it('should render the login site', () => {
    cy.visit('/');

    cy.contains(/caja registradora/i);
  });

  // it('should complete the login flow', () => {
  //   cy.visit('/');

  //   cy.get('[type="email"]').type('admin@gmail.com');

  //   cy.get('[type="password"]').type('admin123');

  //   cy.get('[type="submit"]').click();

  //   cy.wait(500);

  //   cy.url().should('include', '/pedidos');

  //   cy.contains(/productos/i);
  // });

  it('should visit all pages', () => {
    cy.visit('/');

    // login
    cy.get('input[type="email"]').type('admin@gmail.com');
    cy.get('input[type="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait(500);
    cy.contains(/productos/i);

    // crear orden
    cy.get(`button[data-test="${ORDENES_URL}"]`).click();
    cy.wait(500);
    cy.url().should('include', ORDENES_URL);
    cy.contains(/lista de ordenes/i);

    // recibos
    cy.get(`button[data-test="${RECIBOS_URL}"]`).click();
    cy.wait(500);
    cy.url().should('include', RECIBOS_URL);

    // caja
    cy.visit(CAJA_URL);
    cy.wait(500);
    cy.url().should('include', CAJA_URL);
    cy.contains(/balance de caja/i);

    // reabastecer
    cy.visit(REABASTECER_URL);
    cy.wait(500);
    cy.url().should('include', REABASTECER_URL);
    cy.contains(/reabastecer/i);

    // crear productos
    cy.visit(CREAR_PRODUCTOS_URL);
    cy.wait(500);
    cy.url().should('include', CREAR_PRODUCTOS_URL);

    // crear cupones
    cy.visit(CREAR_CUPONES_URL);
    cy.wait(500);
    cy.url().should('include', CREAR_CUPONES_URL);
  });
});
