import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfigService } from './config/DBConfigService';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, 
    TypeOrmModule.forRoot(databaseConfigService),
    ConfigModule.forRoot({ isGlobal: true }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
