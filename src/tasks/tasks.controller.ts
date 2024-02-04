import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetUser } from 'src/auth/get-user.decoratot';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('Task controller');
    constructor( private taskService: TasksService) {}

    @Get()
    getTask(
        @GetUser() user: User,
        @Query(ValidationPipe) filterDto: GetTaskFilterDto) {
        this.logger.verbose(`User ${user.username} retriewing all tasks. Filters: ${JSON.stringify(filterDto)}`)
        return this.taskService.getTasks(filterDto,user);
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
    getTaskById(
        @GetUser() user: User,
        @Param('id',ParseIntPipe) id: number):Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body()createTaskDto: CreateTaskDto,
        @GetUser() user: User
        ): Promise<Task>{
            this.logger.verbose(`User ${user.username} creating a task. CreateUserDto: ${JSON.stringify(createTaskDto)}`)    
        return this.taskService.createTask(createTaskDto, user);
    }

    @Delete('/remove/:id')
    remove(
        @GetUser() user: User,
        @Param('id',new ParseIntPipe()) id: number
        ): void { 
       const result = this.taskService.remove(id, user);
       console.log(result);
    }

    @Patch("/:id")
    update(
        @GetUser() user: User,
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
        ): Promise<Task> {

            return this.taskService.update(id, status, user);

    }
}
