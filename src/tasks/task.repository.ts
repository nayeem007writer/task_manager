import {  Repository  } from "typeorm";
import { Task } from "./task.entity";

// @EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
//    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
//         // const { title, description,} = createTaskDto;

//         // const task = new Task()

//         // task.description = description;
//         // task.title = title;
//         // task.status = TaskStatus.OPEN;
//         // await task.save();
//         // return task;
//     }
}