import { computed, inject, Injectable, signal } from '@angular/core';
import { LoggerService } from './logger-service';
import { Task } from '../../feature/task-manager/models/task.model';
import { mockTasks } from '../../feature/task-manager/task-manager.mock';
import { TaskStatus } from '../../feature/task-manager/models/task.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks = signal<Task[]>([]);
  loggerService = inject(LoggerService);
  loadTasks() {
    this.tasks.set(mockTasks);
  }
  pendingTasks = computed(
    () => this.tasks().filter((task) => task.status === TaskStatus.PENDING).length
  );
  completedTasks = computed(
    () => this.tasks().filter((task) => task.status === TaskStatus.COMPLETED).length
  );
  clearAllTasks() {
    this.tasks.set([]);
    this.loggerService.logAction('All Tasks have been deleted successfully');
  }
  updateTaskStatus(taskId: number, taskStatus: string) {
    this.tasks.update((prev) => prev.map((task) => {
      if(task.id !== taskId) return task;
      if(taskStatus === "PENDING"){
        return {...task, status: TaskStatus.PENDING};
      }
      else if(taskStatus === "COMPLETED"){
        return {...task, status: TaskStatus.COMPLETED};
      }
      return task;
    }));
  }
  addNewTask(taskTitle: string, taskDetails: string){
    const taskList = this.tasks();
    const nextId = taskList ? taskList.length + 1 : 1;
    const newTask: Task = {
      id: nextId,
      title: taskTitle,
      details: taskDetails,
      status: TaskStatus.PENDING
    }
    this.tasks.update((prev) => [...prev, newTask]);
    this.loggerService.logAction(`New Task has been added Successfully, task's title: ${newTask.title}`)
  }
}
