import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor( private taskService: TasksService) {}

    @Get()
    getTask(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
        return this.taskService.getTasks(filterDto);
    }

    // @Get()
    // getAllTasks (): Task[]{
    //     return this.taskService.getAllTasks();
    // }

    // @Get()
    // getAllTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if(Object.keys(filterDto).length) {
    //         return this.taskService.getTasksWithFilter(filterDto);
    //     }
    //     else{
    //         return this.taskService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id: number):Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body()createTaskDto: CreateTaskDto): Promise<Task>{
       return this.taskService.createTask(createTaskDto);
    }

    @Delete('/remove/:id')
    remove(@Param('id') id: string): void{
       const result = this.taskService.remove(id);
       console.log(result);
    }

    @Patch("/:id")
    update(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
        ): Promise<Task>{
            return this.taskService.update(id, status);
    }
}
