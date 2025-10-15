import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class TasksService {
    constructor( private prisma: PrismaService ){}

    async getAllTasks(userId: number) {
        return this.prisma.task.findMany({
            where: { userId },
        });
    }

    async getTaskById(userId: number, taskId: number) {
        return this.prisma.task.findFirst({
            where: {id: taskId, userId},
        });
    }

    async createTask( userId: number, title: string, description?: string) {
        return this.prisma.task.create({
            data: {
                title,
                description,
                completed: false,
                userId
            },
        });
    }

    async updateTask(taskId: number, title: string, description: string, completed: boolean) {
        return this.prisma.task.update({
            where: {id: taskId},
            data: {title, description, completed},
        });
    }

    async deleteTask(taskId: number) {
        return this.prisma.task.delete({
            where: {id: taskId},
        });
    }

    getAllUser() {
        return this.prisma.user.findMany({
            include: { tasks: true},
        });
    }

    getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: {id},
            include: {tasks: true},
        });
    }
    
    createUser(username: string, email: string) {
        return this.prisma.user.create({
            data: {username, email},
        });
    }

    async updateUser(id: number, username: string, email: string) {
        return this.prisma.user.update({
            where: {id},
            data: {username, email},
        });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({
            where: {id}
        });
    }
}
