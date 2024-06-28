import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() task: TaskDto) {
    this.taskService.create(task);
    return 'Rota post task ' + task.title;
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Get()
  findAll(@Query() query: FindAllParameters): TaskDto[] {
    return this.taskService.findAll(query);
  }

  @Put()
  update(@Body() task: TaskDto) {
    this.taskService.taskUpdate(task);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
