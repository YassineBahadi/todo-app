import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskItemComponent } from '../task-item/task-item.component';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [ CommonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone:true
})
export class TaskListComponent {
 @Input() tasks: Task[] = [];
  @Input() isLoading = false;
  @Input() searchTerm = '';
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<number>();
}
