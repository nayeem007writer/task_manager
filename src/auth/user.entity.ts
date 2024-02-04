import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "src/tasks/task.entity";
import { Profile } from "src/profile/profile.entity";
@Entity()
@Unique(['username','email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @OneToMany(type =>Task, task =>task.user,{eager:true})
    tasks: Task[];

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile


    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}