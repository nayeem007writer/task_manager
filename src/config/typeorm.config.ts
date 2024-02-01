import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions ={
    type:'postgres',
    host:'localhost',
    port: 5432,
    username:"nayeem",
    password:"nayeem",
    database:'taskmanagement',
    entities:[Task],
    synchronize: true,
}