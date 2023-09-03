import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
  controllers: [AuthController, AdminController],
  providers: [AuthService, AdminService],
  exports: [AuthService],
})
export class AuthModule {}
