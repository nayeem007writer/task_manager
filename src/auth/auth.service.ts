import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { AuthCredentialDto } from './dto/auth-credential.dtot';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void>{
        const { username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        try{

            await user.save();
        }
        catch(err) {
            console.log(err);
        }
    }

    async validatePassword(authCredentialDto: AuthCredentialDto):Promise<{accessToken:string}>{
        const { username, password } = authCredentialDto;
        const user = await User.findOneBy({username});

        if(user && user.validatePassword(password)){
            const payload: JwtPayload = { username}
            const accessToken = this.jwtService.sign(payload);
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
