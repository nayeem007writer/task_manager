import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileTypeEnum } from './dto/profile-enum.dto';
import { ProfileDto } from './dto/profile.dto';
import { ProfileValidationPipe } from './pipe/enum.validation';
import { Profile } from './profile.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decoratot';
import { User } from 'src/auth/user.entity';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {
    constructor(private profileService: ProfileService) {}


    @Post()
    @UsePipes(ValidationPipe)
    createProfile(
        @GetUser() user: User,
        @Body('type',ProfileValidationPipe) type: ProfileTypeEnum,
        @Body() profileDto:ProfileDto ):Promise<Profile> {
            return this.profileService.createProfile(type, profileDto,user);
    }
}
