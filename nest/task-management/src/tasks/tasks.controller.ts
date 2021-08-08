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
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { Task as TaskEntity } from './task.entity';
import { TaskInputDTO } from './dto/task-input-dto';
import { Message } from './message.model';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
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

  @Get('/db')
  getTasksFromDB(@Query() filterDTO: GetTasksFilterDTO): Promise<TaskEntity[]> {
    return this.tasksService.getTasksFromDB(filterDTO);
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

  @Post('/db')
  createTaskInDB(@Body() taskInputDTO: TaskInputDTO): Promise<TaskEntity> {
    return this.tasksService.createTaskInDB(taskInputDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Get('/:id/db')
  async getTaskByIdFromDB(@Param('id') id: string): Promise<TaskEntity> {
    return await this.tasksService.getTaskByIdFromDB(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Message {
    this.tasksService.deleteTaskById(id);
    return { message: 'task deleted successfuly' };
  }

  @Delete('/:id/db')
  deleteTaskByIdFromDB(@Param('id') id: string): Message {
    this.tasksService.deleteTaskByIdFromDB(id);
    return { message: 'task deleted successfuly' };
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() statusDTO: UpdateTaskStatusDTO,
  ): Task {
    return this.tasksService.updateTaskById(id, statusDTO);
  }

  @Patch('/:id/status/db')
  updateTaskByIdFromDB(
    @Param('id') id: string,
    @Body() statusDTO: UpdateTaskStatusDTO,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskByIdFromDB(id, statusDTO);
  }
}
