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
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

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
  getTasksFromDB(
    @Query() filterDTO: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getTasksFromDB(filterDTO, user);
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
  createTaskInDB(
    @Body() taskInputDTO: TaskInputDTO,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.tasksService.createTaskInDB(taskInputDTO, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Get('/:id/db')
  async getTaskByIdFromDB(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return await this.tasksService.getTaskByIdFromDB(id, user);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Message {
    this.tasksService.deleteTaskById(id);
    return { message: 'task deleted successfuly' };
  }

  @Delete('/:id/db')
  deleteTaskByIdFromDB(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Message {
    this.tasksService.deleteTaskByIdFromDB(id, user);
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
    @GetUser() user: User,
  ): Promise<TaskEntity> {
    return this.tasksService.updateTaskByIdFromDB(id, statusDTO, user);
  }
}
