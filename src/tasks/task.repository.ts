import {  Repository  } from "typeorm";
import { Task } from "./task.entity";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { Injectable } from "@nestjs/common";

// @EntityRepository(Task)
@Injectable()
export class TaskRepository extends Repository<Task> {
    // async delete(id: string) {
    //     const v = parseInt(id);
    //     this.remove
//     // }
//     async getTasks(filterDto: GetTaskFilterDto):Promise<Task[]> {

//         return tasks;
//     }
}