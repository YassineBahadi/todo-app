// cypress/e2e/auth/auth.cy.ts
describe('Authentication Flows', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should redirect to login page when not authenticated', () => {
    cy.url().should('include', '/login');
    cy.contains('Connexion').should('be.visible');
  });

  it('should register a new user successfully', () => {
    const timestamp = Date.now();
    const username = `testuser${timestamp}`;
    
    cy.visit('/register');
    
    cy.get('input[formControlName="username"]').type(username);
    cy.get('input[formControlName="email"]').type(`${username}@example.com`);
    cy.get('input[formControlName="password"]').type('password123');
    
    cy.contains('Créer le compte').click();
    
    cy.url().should('include', '/login');
    cy.contains('Compte créé avec succès').should('be.visible');
  });

  it('should login with demo credentials', () => {
    cy.visit('/login');
    
    cy.get('input[formControlName="username"]').type('demo');
    cy.get('input[formControlName="password"]').type('demo123');
    
    cy.contains('Se connecter').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Tableau de bord').should('be.visible');
    cy.contains('Todo Manager').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.visit('/login');
    
    cy.get('input[formControlName="username"]').type('invaliduser');
    cy.get('input[formControlName="password"]').type('wrongpassword');
    
    cy.contains('Se connecter').click();
    
    cy.contains('Erreur de connexion').should('be.visible');
  });
});