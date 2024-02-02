import { IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class AuthCredentialDto {

    @IsString()
    @MaxLength(20)
    @MinLength(4)
    username: string;

    @IsString()
    @MaxLength(20)
    @MinLength(6)
    password: string;
}