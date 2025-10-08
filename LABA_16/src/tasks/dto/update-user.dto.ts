import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class UpdateUserDto {
    id: number;
    username: string;  
    email: string;
}