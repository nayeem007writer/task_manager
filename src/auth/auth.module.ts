import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[ 
    PassportModule.register({ defaultStrategy: "jwt" })
    ,JwtModule.register({
    secret: "topSecret5133k",
    signOptions: {
      expiresIn:3660,
    },
  }) ,TypeOrmModule.forFeature([User,UserRepository])],
  controllers: [AuthController],
  providers: [JwtStrategy ,AuthService,],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
