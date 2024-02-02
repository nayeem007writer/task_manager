import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dtot';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void>{
        const { username, password } = authCredentialDto;
        // const query = User.createQueryBuilder('user');
        const exists = User.findOneBy({username});
        console.log(exists)
        const user = new User();

        user.username = username;
        user.password = password;
        try{

            await user.save();
        }
        catch(err) {
            console.log(err);
        }
    }

}
