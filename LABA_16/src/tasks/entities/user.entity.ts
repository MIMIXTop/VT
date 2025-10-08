import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    

    @Column()
    @IsNotEmpty()
    @IsString()
    username: string

    @Column()
    @IsNotEmpty()
    @IsString()
    email: string

    @OneToMany(() => Task, (task) => task.user, {cascade: true} )
    tasks: Task[]
}