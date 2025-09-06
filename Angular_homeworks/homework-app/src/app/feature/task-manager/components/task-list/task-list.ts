import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task-service';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList implements OnInit{
  taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  ngOnInit(){
    this.taskService.loadTasks();
  }
}
