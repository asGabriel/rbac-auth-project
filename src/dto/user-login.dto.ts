import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  EMAIL: string;

  @IsNotEmpty()
  @IsString()
  PASSWORD: string;
}