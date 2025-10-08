import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get('user/:id/tasks')
    getAllTasks(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.getAllTasks(id);
    }

    @Get('user')
    getAllUsers() {
        return this.taskService.getAllUser();
    }

    @Get('user/:userId/tasks/:taskId')
    getTaskById(@Param('userId', ParseIntPipe) userId: number, @Param('taskId', ParseIntPipe) taskId: number) {
        let result = this.taskService.getTaskById(userId, taskId);
        if (!result) {
            throw new NotFoundException(`Task with id ${taskId} or User with id ${userId} not found`);
        }

        return result;
    }

    @Get('/user/:userId')
    getUserById(@Param('userId', ParseIntPipe) userId: number) {
        return this.taskService.getUserById(userId);
    }

    @Post('user/:userId/tasks')
    create(@Body() task: CreateTaskDto, @Param('userId', ParseIntPipe) userId: number) {
        this.taskService.createTask( userId, task.title, task.description);
    }

    @Post('user')
    createUser(@Body() user: CreateUserDto) {
        this.taskService.createUser(user.username, user.email);
    }

    @Put('tasks/:taskId') 
    updataTask(@Body() task: UpdateTaskDto, @Param('taskId', ParseIntPipe) taskId: number){
        let result = this.taskService.updateTask(taskId, task.title, task.description, task.completed);
        if (!result) {
            throw new NotFoundException(`Task with id ${taskId} not found`);
        }

        return { success: result };
    }

    @Put('user/:userId')
    updateUser(@Body() user: UpdateUserDto, @Param('userId', ParseIntPipe) userId: number) {
        let result = this.taskService.updateUser(userId, user.username, user.email);
        if (!result) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        return { success: result };
    }

    @Delete('tasks/:taskId') 
    deleteTask(@Param('taskId', ParseIntPipe) id: number) {
        let result = this.taskService.deleteTask(id);
        if (!result) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return { success: result };
    }

    @Delete('user/:userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: number) {
        let result = this.taskService.deleteUser(userId);
        if (!result) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        return { success: result };
    }
}
