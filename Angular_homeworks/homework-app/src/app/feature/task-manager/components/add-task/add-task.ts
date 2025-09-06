import { Component, inject } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TaskService } from '../../../../core/services/task-service';

@Component({
  selector: 'app-add-task',
  imports: [Button],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  taskService = inject(TaskService);
  taskTitle = '';
  taskDetails = '';
  detailsChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.taskDetails = element.value;
  }
  titleChange(event: Event) {
    const element = event.target as HTMLInputElement;
    this.taskTitle = element.value;
  }
  addTask() {
    if (this.taskTitle === '' || this.taskDetails === '') return;
    
    this.taskService.addNewTask(this.taskTitle, this.taskDetails);
    
    const titleInput = document.getElementById('title') as HTMLInputElement;
    const detailsInput = document.getElementById('details') as HTMLInputElement;
    
    if (titleInput) titleInput.value = '';
    if (detailsInput) detailsInput.value = '';
  }
}
