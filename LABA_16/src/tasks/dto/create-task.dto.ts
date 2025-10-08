import { IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
    title: string;
    description: string;
}