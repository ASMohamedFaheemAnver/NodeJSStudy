import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Response } from 'express';
import { Task, TaskStatus } from './task.model';
import { TaskInputDTO } from './dto/task-input-dto';
import { Message } from './message.model';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    /*@Res() res: Response*/ @Query() filterDTO: GetTasksFilterDTO,
  ): Task[] {
    // return res.status(HttpStatus.OK).send(this.tasksService.getAllTasks());
    if (Object.values(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    }
    return this.tasksService.getAllTasks();
  }

  /*@Post()
  createTask(@Body() body): Task {
    return this.tasksService.createTask({
      title: body.title,
      description: body.description,
    });
  }*/

  @Post()
  createTask(@Body() taskInputDTO: TaskInputDTO): Task {
    return this.tasksService.createTask(taskInputDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Message {
    this.tasksService.deleteTaskById(id);
    return { message: 'task deleted successfuly' };
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() statusDTO: UpdateTaskStatusDTO,
  ): Task {
    return this.tasksService.updateTaskById(id, statusDTO);
  }
}
