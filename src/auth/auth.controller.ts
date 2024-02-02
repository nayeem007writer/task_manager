import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dtot';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup') 
    signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):void{
        console.log(authCredentialDto);
        this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body( ValidationPipe) authCredentialDto :AuthCredentialDto):Promise<{accessToken:string}>{
        return this.authService.validatePassword(authCredentialDto);
    }

}
