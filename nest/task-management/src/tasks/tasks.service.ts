import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(taskData: { title: string; description: string }): Task {
    const task: Task = {
      id: new Date().getTime().toString(),
      ...taskData,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
