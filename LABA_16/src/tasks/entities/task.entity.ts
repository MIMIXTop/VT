import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.untity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    description?: string;
    
    @Column({default: false})
    completed: boolean;

    @ManyToOne( () => User, (user) => user.tasks, {onDelete: "CASCADE"})
    user: User;
}