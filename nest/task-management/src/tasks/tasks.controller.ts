import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Response } from 'express';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(/*@Res() res: Response*/): Task[] {
    // return res.status(HttpStatus.OK).send(this.tasksService.getAllTasks());
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
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTask({
      title: title,
      description: description,
    });
  }
}
