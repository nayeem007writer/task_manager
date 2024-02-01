import { Injectable, NotFoundException } from '@nestjs/common';

// import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}

    // private tasks: Task[] = []

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

    async getTaskById(id: number):Promise<Task>{
        const found = await this.taskRepository.findOneBy({id});
            if(!found){
            throw new NotFoundException();
        }
        return found;
    }

    // removeById(id: string):void{
    //     const found = this.getTaskById(id);
    //     this.tasks =this.tasks.filter(task => task.id !== found.id);

    // }

    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        const { title, description,} = createTaskDto;

        const task = new Task()

        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    // update (id: string, status: TaskStatus): Task {
    //     let task = this.getTaskById(id);
    //     task.status= status;
    //     return task;
    // }
}
