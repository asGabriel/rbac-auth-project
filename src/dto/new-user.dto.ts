import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class NewUserDto {
    @IsString()
    @IsNotEmpty()
    USERNAME: string;
    
    @IsString()
    @IsNotEmpty()
    EMAIL: string;

    @IsString()
    @IsNotEmpty()
    PASSWORD: string;
    
    @IsNotEmpty()
    @IsString()
    ROLE: string;
}