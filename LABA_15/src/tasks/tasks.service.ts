import { Injectable } from '@nestjs/common';

export type Task = {
    id :number
    title: string
    completed: boolean
}

@Injectable()
export class TasksService {
    private dataStorage: Task[] = [];
    private counterId: number = 1;

    getAllTasks(): Task[] {
        return this.dataStorage;
    }

    getTaskById(id: number): Task | null {
        if (this.dataStorage.length === 0) return null  

        return this.dataStorage.find((t: Task) => { return t.id == id}) || null;
    }

    createTask(title: string): void {
        this.dataStorage.push(
            { 
                id :this.counterId++,
                title : title,
                completed :false 
            }
        );
    }

    updateTask(id: number, title: string, completed: boolean) {
        if (this.dataStorage.length === 0) return false;

        if (id > this.dataStorage.length || id <= 0) return false;

        this.dataStorage.forEach((task, _) => {
            if (task.id === id) {
                task.title = title;
                task.completed = completed;
            }
        })
        return true;
    }

    deleteTask(id: number): boolean {
        const initialLength = this.dataStorage.length;
        this.dataStorage = this.dataStorage.filter(task => task.id !== id);
        return this.dataStorage.length < initialLength;
    }

}
