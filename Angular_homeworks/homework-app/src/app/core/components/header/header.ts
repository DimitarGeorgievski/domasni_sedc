import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  taskService = inject(TaskService);

  pendingTasks = this.taskService.pendingTasks;
  completedTasks = this.taskService.completedTasks;
  clearTasks(){
    this.taskService.clearAllTasks();
  }
}
