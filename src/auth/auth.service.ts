import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { AuthCredentialDto } from './dto/auth-credential.dtot';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthLoginCredentialDto } from './dto/auth-credential.signin.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void>{
        const { username, password, email, firstName, lastName } = authCredentialDto;

        const user = new User();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.username =username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        try{

            await user.save();
        }
        catch(err) {
            console.log(err);
        }
    }

    async validatePassword(authLoginCredentialDto: AuthLoginCredentialDto):Promise<{accessToken:string}>{
        const { email, password } = authLoginCredentialDto;
        const user = await User.findOneBy({email});

        if(user && user.validatePassword(password)){
            const payload: JwtPayload = { email}
            const accessToken = this.jwtService.sign(payload);
            this.logger.debug(`Generated JWT Token with payload: ${JSON.stringify(payload)}`,)
            return {accessToken };
        }
        else{
            throw new UnauthorizedException('invalid credential');
        }
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}
