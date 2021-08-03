import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { TaskInputDTO } from './dto/task-input-dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status-dto';
import { Task as TaskEntity } from './task.entity';
import { Task, TaskStatus } from './task.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksFromDB(filterDTO: GetTasksFilterDTO): Promise<TaskEntity[]> {
    return this.tasksRepository.getTasksFromDB(filterDTO);
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

  async createTaskInDB(taskInputDTO: TaskInputDTO): Promise<TaskEntity> {
    const task = this.tasksRepository.create({
      ...taskInputDTO,
      status: TaskStatus.OPEN,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id == id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async getTaskByIdFromDB(id: string): Promise<TaskEntity> {
    const task: TaskEntity = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  deleteTaskById(id: string): void {
    let notFound = true;
    this.tasks = this.tasks.filter((task) => {
      if (task.id != id) {
        return true;
      }
      notFound = true;
      return false;
    });
    if (notFound) {
      throw new NotFoundException();
    }
  }

  async deleteTaskByIdFromDB(id: string): Promise<void> {
    let task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    await this.tasksRepository.delete({ id });
  }

  updateTaskById(id: string, statusDTO: UpdateTaskStatusDTO): Task {
    let updatedTask;
    this.tasks = this.tasks.map((task) => {
      if (task.id == id) {
        updatedTask = { ...task, ...statusDTO };
        return { ...updatedTask };
      }
      return task;
    });

    if (!updatedTask) {
      throw new NotAcceptableException();
    }

    return updatedTask;
  }

  async updateTaskByIdFromDB(
    id: string,
    statusDTO: UpdateTaskStatusDTO,
  ): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    task.status = statusDTO.status;
    await this.tasksRepository.save(task);
    return task;
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
