import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {

        const task =this.tasks.find(task => task.id ===id);
        console.log(task);
        return task;
    }

    removeById(id: string):void{
        this.tasks =this.tasks.filter(task => task.id !== id);

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
