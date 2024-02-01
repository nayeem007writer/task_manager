import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } =filterDto;

        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) || task.description.includes(search)
                );

        }
        return tasks;
    }

    getTaskById(id: string): Task {

        const task =this.tasks.find(task => task.id ===id);
        if(!task){
            throw new NotFoundException();
        }
        return task;
    }

    removeById(id: string):void{
        const found = this.getTaskById(id);
        this.tasks =this.tasks.filter(task => task.id !== found.id);

    }

    createTask(createTaskDto: CreateTaskDto): Task {
        console.log(createTaskDto);
        const {title, description } =createTaskDto

        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);

        return task;
    }

    update (id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id);
        task.status= status;
        return task;
    }
}
