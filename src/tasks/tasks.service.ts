import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

// import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { error } from 'console';

@Injectable()
export class TasksService {
    private logger = new Logger('Task service')
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    async getTasks(filterDto: GetTaskFilterDto,user:User): Promise<Task[]>{
        const { search, status } = filterDto;
        const query = Task.createQueryBuilder('task');

        if(status) {
            query.andWhere('task.status = :status', { status });
        }

        if(search) {
            query.andWhere('task.search LIKE :search OR task.description LIKE : search', { search: `%${search}%` });
        }

        try {
           const tasks = query.getMany();
           return tasks;
        }
        catch(err) {
            this.logger.error(`User ${user.username} faild to get for some issue . DTO:${filterDto}`,err.stack());
            throw new InternalServerErrorException();
        }
    }


    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } =filterDto;

    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if(search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) || task.description.includes(search)
    //             );

    //     }
    //     return tasks;
    // }

    async getTaskById(id: number, user: User):Promise<Task>{
        const ID = user.id;
        const found = await Task.findOne({
            where: {
                id,
                userId:user.id
            },
        });
            if(!found){
            throw new NotFoundException();
        }
        return found;
    }


    async remove(
        id: number,
        user: User
        ){
        console.log(id)

        const result = await Task.delete({id, userId: user.id})
        if(result.affected===0){
            throw new NotFoundException();
        }
        console.log(result);
    }


    async createTask(createTaskDto: CreateTaskDto,user: User):Promise<Task>{
        const { title, description,} = createTaskDto;        

        const task = new Task()

        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        task.user =user;
        
        try {
            await task.save();
        }
        catch(err) {
            this.logger.error(`failed to create a task for User:${user.username} and CreateUserDto:${JSON.stringify(CreateTaskDto)}`,err.stack());
            throw new InternalServerErrorException();
        }

        delete task.user;
        return task;
    }


    async update (
        id: string,
        status: TaskStatus,
        user: User
        ): Promise<Task> {
        const task = await this.getTaskById(parseInt(id),user);
        task.status =status;
        await task.save();
        return task;
    }
}
