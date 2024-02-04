import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Profile } from "src/profile/profile.entity";
import { Task } from "src/tasks/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "nayeem",
    password: "nayeem",
    database: 'taskmanagement',
    entities: [Task,User,Profile],
    synchronize: true,
}