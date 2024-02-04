import { IsEmail, IsString,MaxLength, MinLength } from "class-validator";

export class AuthLoginCredentialDto {
    @IsString()
    @MaxLength(20)
    @MinLength(6)
    password: string;


    @IsEmail()
    email: string;
}