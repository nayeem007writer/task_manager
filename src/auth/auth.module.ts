import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports:[  TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
