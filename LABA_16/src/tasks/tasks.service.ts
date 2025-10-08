import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Repository } from 'typeorm';


@Injectable()
export class TasksService {
    constructor( private prisma: PrismaService ){}

    async getAllTasks(userId: number) {
        return this.taskRepository.find({
            where: { user: {id: userId}  },
            relations: ['user'],
        });
    }

    async getTaskById(userId: number, taskId: number) {
        return this.taskRepository.findOne({
            where: { id: taskId, user: {id: userId} },
            relations: ['user'],
        });
    }

    async createTask( userId: number, title: string, description?: string) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) throw new Error('Пользователь не найден');

        const task = this.taskRepository.create({title, description, user});
        return this.taskRepository.save(task);
    }

    async updateTask(taskId: number, title: string, description: string, completed: boolean) {
        await this.taskRepository.update(taskId, {title, description, completed});
        return this.taskRepository.findOneBy( { id: taskId } );
    }

    async deleteTask(taskId: number) {
        await this.taskRepository.delete(taskId);
        return {deleted: true};
    }

    getAllUser() {
        return this.userRepository.find({relations: ['tasks']});
    }

    getUserById(id: number) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });
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
