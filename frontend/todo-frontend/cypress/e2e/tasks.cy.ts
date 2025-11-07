// cypress/e2e/tasks/tasks.cy.ts
describe('Task Management', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login');
    cy.get('input[formControlName="username"]').type('demo');
    cy.get('input[formControlName="password"]').type('demo123');
    cy.contains('Se connecter').click();
    cy.url().should('include', '/dashboard');
  });

  it('should display task statistics', () => {
    cy.contains('Total').should('be.visible');
    cy.contains('En attente').should('be.visible');
    cy.contains('En cours').should('be.visible');
    cy.contains('Terminées').should('be.visible');
  });

  it('should create a new task', () => {
    cy.contains('Nouvelle tâche').click();
    
    cy.get('input[formControlName="title"]').type('Test Task from Cypress');
    cy.get('textarea[formControlName="description"]').type('This is a test task created by Cypress');
    cy.get('mat-select[formControlName="priority"]').click();
    cy.contains('Haute').click();
    cy.get('mat-select[formControlName="status"]').click();
    cy.contains('En cours').click();
    
    cy.contains('Créer').click();
    
    cy.contains('Tâche créée avec succès').should('be.visible');
    cy.contains('Test Task from Cypress').should('be.visible');
  });

  it('should edit an existing task', () => {
    // First create a task to edit
    cy.contains('Nouvelle tâche').click();
    cy.get('input[formControlName="title"]').type('Task to Edit');
    cy.get('textarea[formControlName="description"]').type('Original description');
    cy.contains('Créer').click();
    
    // Edit the task
    cy.contains('Task to Edit').parents('.task-card').within(() => {
      cy.get('.menu-button').click();
    });
    
    cy.contains('Modifier').click();
    
    cy.get('input[formControlName="title"]').clear().type('Updated Task Title');
    cy.get('textarea[formControlName="description"]').clear().type('Updated description');
    cy.get('mat-select[formControlName="status"]').click();
    cy.contains('Terminée').click();
    
    cy.contains('Sauvegarder').click();
    
    cy.contains('Tâche mise à jour avec succès').should('be.visible');
    cy.contains('Updated Task Title').should('be.visible');
    cy.contains('Terminée').should('be.visible');
  });

  it('should delete a task', () => {
    // First create a task to delete
    cy.contains('Nouvelle tâche').click();
    cy.get('input[formControlName="title"]').type('Task to Delete');
    cy.contains('Créer').click();
    
    // Delete the task
    cy.contains('Task to Delete').parents('.task-card').within(() => {
      cy.get('.menu-button').click();
    });
    
    cy.contains('Supprimer').click();
    
    // Confirm deletion
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Êtes-vous sûr de vouloir supprimer cette tâche ?');
      return true;
    });
    
    cy.contains('Tâche supprimée avec succès').should('be.visible');
    cy.contains('Task to Delete').should('not.exist');
  });

  it('should filter tasks by search', () => {
    // Create a unique task for searching
    const uniqueText = `UniqueTask${Date.now()}`;
    
    cy.contains('Nouvelle tâche').click();
    cy.get('input[formControlName="title"]').type(uniqueText);
    cy.contains('Créer').click();
    
    // Search for the task
    cy.get('input[placeholder="Titre ou description..."]').type(uniqueText);
    
    cy.contains(uniqueText).should('be.visible');
    
    // Search for non-existing task
    cy.get('input[placeholder="Titre ou description..."]').clear().type('NonExistingTask123');
    
    cy.contains('Aucune tâche ne correspond à votre recherche').should('be.visible');
  });

  it('should filter tasks by status and priority', () => {
    // Filter by status
    cy.get('mat-select').eq(0).click(); // Status filter
    cy.contains('Terminée').click();
    
    // All visible tasks should have status "Terminée"
    cy.get('.status-completed').should('exist');
    
    // Clear status filter and filter by priority
    cy.contains('Effacer').click();
    
    cy.get('mat-select').eq(1).click(); // Priority filter
    cy.contains('Haute').click();
    
    // All visible tasks should have priority "Haute"
    cy.get('.priority-high').should('exist');
  });

  it('should logout successfully', () => {
    cy.get('.user-button').click();
    cy.contains('Déconnexion').click();
    
    cy.url().should('include', '/login');
    cy.contains('Connexion').should('be.visible');
  });
});