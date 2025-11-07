import { Component,Input,Output,EventEmitter,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Priority, Status, Task, TaskForm } from '../../models/task.model';
@Component({
  selector: 'app-task-form',
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  standalone:true
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input() task?: Task;
  @Input() dialogRef?: MatDialogRef<any>;
  @Output() onSave = new EventEmitter<TaskForm>();
  @Output() onCancel = new EventEmitter<void>();

  isEditMode = false;
  Priority = Priority;
  Status = Status;

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.maxLength(500)]],
    priority: [Priority.MEDIUM, Validators.required],
    status: [Status.PENDING, Validators.required]
  });

  ngOnInit(): void {
    this.isEditMode = !!this.task;
    
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        priority: this.task.priority,
        status: this.task.status
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.onSave.emit(this.taskForm.value as TaskForm);
      
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }
  }
}
