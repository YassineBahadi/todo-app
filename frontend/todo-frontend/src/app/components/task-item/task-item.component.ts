import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Priority, Status, Task } from '../../models/task.model';
@Component({
  selector: 'app-task-item',
  imports: [   CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  standalone:true
})
export class TaskItemComponent {
  @Input() task!:Task;
  @Output() onEdit=new EventEmitter<Task>();
  @Output() onDelete=new EventEmitter<number>();

  getPriorityClass(priority: Priority):string{
    return `priority-${priority.toLowerCase()}`;
  }

  getPriorityLabel(priority:Priority):string{
    const labels={
      [Priority.HIGH]:'Haute',
      [Priority.MEDIUM]:'Moyenne',
      [Priority.LOW]:'Basse'
    };
    return labels[priority];
  }

  getStatusClass(status:Status):string{
    return `status-${status.toLowerCase().replace('_','-')}`;
  }

  getStatusLabel(status:Status):string{
    const labels={
      [Status.PENDING]:'En attente',
      [Status.IN_PROGRESS]:'En cours',
      [Status.COMPLETED]:'Terminée'
    };
    return labels[status];
  }

  getStatusIcon(status:Status):string{
    const icons={
      [Status.PENDING]:'schedule',
      [Status.IN_PROGRESS]:'play_arrow',
      [Status.COMPLETED]:'check_circle'
    };
    return icons[status];
  }
}
