import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileTypeEnum } from "./dto/profile-enum.dto";
import { User } from "src/auth/user.entity";


@Entity()
export class Profile extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    type: ProfileTypeEnum;

    @OneToOne(type =>User, user => user.tasks,{eager:false})
    user: User;

    


}