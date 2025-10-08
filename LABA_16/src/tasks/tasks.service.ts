import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.untity';

Repository<Task>

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    getAllTasks() {
        return this.taskRepository.find();
    }

    getTaskById(id: number) {
        return this.taskRepository.findOneBy( {id} );
    }

    createTask(title: string, description?: string) {
        const task = this.taskRepository.create( {title, description} );
        return this.taskRepository.save(task);
    }

    async updateTask(id: number, title: string, description: string, completed: boolean) {
        await this.taskRepository.update(id, {id, title, description, completed});
    }

    async deleteTask(id: number) {
        await this.taskRepository.delete(id);
        return { deleted: true};
    }

    getAllUser() {
        return this.userRepository.find();
    }

    getUserById(id: number) {
        return this.userRepository.findOneBy({id});
    }
    
    createUser(username: string, email: string) {
        const user = this.userRepository.create({username, email});
        return this.userRepository.save(user);
    }

    async updateUser(id: number, username: string, email: string) {
        await this.userRepository.update(id, {id, username, email})
    }

    async deleteUser(id: number) {
        await this.userRepository.delete(id);
        return {deleted: true};
    }
}
