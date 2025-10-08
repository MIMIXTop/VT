import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class UpdateTaskDto {
    @IsInt()
    @Min(1)
    id: number

    @IsString()
    @IsNotEmpty()
    title: string

    @IsBoolean()
    completed: boolean
}