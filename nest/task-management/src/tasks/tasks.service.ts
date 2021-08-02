import { Injectable } from '@nestjs/common';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { TaskInputDTO } from './dto/task-input-dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(taskInputDTO: TaskInputDTO): Task {
    const task: Task = {
      id: new Date().getTime().toString(),
      ...taskInputDTO,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id == id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => {
      return task.id != id;
    });
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    let updatedTask;
    this.tasks = this.tasks.map((task) => {
      if (task.id == id) {
        updatedTask = { ...task, status };
        return { ...updatedTask };
      }
      return task;
    });
    return updatedTask;
  }

  getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDTO;
    let localTasks = this.tasks;
    if (status) {
      localTasks = localTasks.filter((task) => task.status === status);
    }
    if (search) {
      localTasks = localTasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return localTasks;
  }
}
