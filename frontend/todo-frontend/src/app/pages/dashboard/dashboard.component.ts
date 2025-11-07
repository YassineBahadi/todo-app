import { TaskForm } from './../../models/task.model';
import { Component ,  OnInit, inject, ViewChild, TemplateRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder , FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Priority, Status, Task, TaskFilters } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    TaskListComponent,
    TaskFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone:true
})
export class DashboardComponent implements OnInit {
 private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  @ViewChild('taskFormDialog') taskFormDialog!: TemplateRef<any>;

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedTask?: Task;
  isLoading = false;
  Priority = Priority;
  Status = Status;
  taskDialogRef: any;

  filters: TaskFilters = {
    search: '',
    status: null,
    priority: null
  };

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.isLoading = true;
    try {
      this.tasks = await this.taskService.getAllTasks().toPromise() || [];
      this.applyFilters();
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.snackBar.open('Erreur lors du chargement des tâches', 'Fermer', { duration: 5000 });
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = !this.filters.search || 
        task.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(this.filters.search.toLowerCase()));
      
      const matchesStatus = !this.filters.status || task.status === this.filters.status;
      const matchesPriority = !this.filters.priority || task.priority === this.filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  onFiltersChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.filters = { search: '', status: null, priority: null };
    this.applyFilters();
  }

  openTaskForm(task?: Task): void {
    this.selectedTask = task;
    this.taskDialogRef = this.dialog.open(this.taskFormDialog, {
      width: '500px',
      maxWidth: '90vw'
    });
  }

  closeTaskForm(): void {
    if (this.taskDialogRef) {
      this.taskDialogRef.close();
    }
  }

  async saveTask(taskData: TaskForm): Promise<void> {
    try {
      if (this.selectedTask) {
        // Update existing task
        const updatedTask = await this.taskService.updateTask(this.selectedTask.id, taskData).toPromise();
        const index = this.tasks.findIndex(t => t.id === this.selectedTask!.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask!;
        }
        this.snackBar.open('Tâche mise à jour avec succès!', 'Fermer', { duration: 3000 });
      } else {
        // Create new task
        const newTask = await this.taskService.createTask(taskData).toPromise();
        this.tasks.unshift(newTask!);
        this.snackBar.open('Tâche créée avec succès!', 'Fermer', { duration: 3000 });
      }
      
      this.applyFilters();
      this.closeTaskForm();
    } catch (error) {
      console.error('Error saving task:', error);
      this.snackBar.open('Erreur lors de la sauvegarde', 'Fermer', { duration: 5000 });
    }
  }

  editTask(task: Task): void {
    this.openTaskForm(task);
  }

  async deleteTask(taskId: number): Promise<void> {
    const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
    
    if (confirm) {
      try {
        await this.taskService.deleteTask(taskId).toPromise();
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.applyFilters();
        this.snackBar.open('Tâche supprimée avec succès!', 'Fermer', { duration: 3000 });
      } catch (error) {
        console.error('Error deleting task:', error);
        this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 5000 });
      }
    }
  }

  // Statistics
  get totalTasks(): number {
    return this.tasks.length;
  }

  get pendingTasks(): number {
    return this.tasks.filter(task => task.status === Status.PENDING).length;
  }

  get inProgressTasks(): number {
    return this.tasks.filter(task => task.status === Status.IN_PROGRESS).length;
  }

  get completedTasks(): number {
    return this.tasks.filter(task => task.status === Status.COMPLETED).length;
  }
}
