import { Component, signal } from '@angular/core';
import { Header } from './core/components/header/header';
import { TaskList } from './feature/task-manager/components/task-list/task-list';
import { AddTask } from './feature/task-manager/components/add-task/add-task';

@Component({
  selector: 'app-root',
  imports: [Header, TaskList, AddTask],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('homework-app');
}
