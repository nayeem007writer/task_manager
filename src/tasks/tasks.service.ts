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

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]>{
        const { search, status } = filterDto;
        const query = Task.createQueryBuilder('task');

        if(status) {
            query.andWhere('task.status = :status', { status });
        }

        if(search) {
            query.andWhere('task.search LIKE :search OR task.description LIKE : search', { search: `%${search}%` });
        }

        const tasks = query.getMany();
        return tasks;
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

    async getTaskById(id: number):Promise<Task>{
        const found = await Task.findOneBy({id});
            if(!found){
            throw new NotFoundException();
        }
        return found;
    }

    async remove(id: string){
        console.log(id)
        const r = await Task.delete(id);
        if(r.affected===0){
            throw new NotFoundException();
        }
        console.log(r);
    }

    async createTask(createTaskDto: CreateTaskDto):Promise<Task>{
        const { title, description,} = createTaskDto;

        const task = new Task()

        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    async update (id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(parseInt(id));
        task.status =status;
        await task.save();
        return task;
    }
}
