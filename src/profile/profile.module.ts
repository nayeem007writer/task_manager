import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ProfileRepository]),AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
