import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class UpdateTaskDto {
    @IsInt()
    @Min(1)
    id: number

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    description: string

    @IsBoolean()
    completed: boolean
}