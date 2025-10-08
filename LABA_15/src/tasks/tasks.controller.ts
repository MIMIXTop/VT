import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Get()
    getAll() {
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getId(@Param('id', ParseIntPipe) id: number) {
        let result = this.taskService.getTaskById(id);
        if (!result) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return result;
    }

    @Post()
    create(@Body() task: CreateTaskDto) {
        this.taskService.createTask(task.title)
    }

    @Put() 
    updata(@Body() task: UpdateTaskDto){
        let result = this.taskService.updateTask(task.id, task.title, task.completed);

        if (!result) {
            throw new NotFoundException(`Task with id ${task.id} not found`);
        }
    }

    @Delete('/:id') 
    delete(@Param('id', ParseIntPipe) id: number) {
        const result = this.taskService.deleteTask(id);
        if (!result) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return { success: result };
    }

}
