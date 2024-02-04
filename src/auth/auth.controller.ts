import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dtot';
import { AuthLoginCredentialDto } from './dto/auth-credential.signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup') 
    signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):void{
        this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body( ValidationPipe) authLoginCredentialDto  :AuthLoginCredentialDto ):Promise<{accessToken:string}>{
        return this.authService.validatePassword(authLoginCredentialDto );
    }

}
