import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class UpdateTaskDto {
    title: string
    description: string
    completed: boolean
}