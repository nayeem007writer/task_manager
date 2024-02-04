import { Injectable } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { ProfileTypeEnum } from './dto/profile-enum.dto';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProfileService {

    async createProfile(type: ProfileTypeEnum,profileDto:ProfileDto,user:User):Promise<Profile> {
        const { name, description} = profileDto;
        const profile = new Profile();

        profile.description = description;
        profile.type = type;
        profile.name = name;
        profile.user = user;

        await profile.save();

        return profile;
    }
}
