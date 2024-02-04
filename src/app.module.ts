import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
    AuthModule,
    ProfileModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
