import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { IsEmailExistPipe } from '../common/pipes/is-email-exist.pipe';
import { UserResponse } from './types/user-response';
import { LoginUserDto } from './dto/login-user.dto';
import { CookieTokenInterceptor } from './interceptors/cookie-token.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(IsEmailExistPipe)
  @UseInterceptors(CookieTokenInterceptor)
  create(@Body() registerUserDto: RegisterUserDto): Promise<UserResponse> {
    return this.authService.create(registerUserDto);
  }

  @Post('login')
  @UseInterceptors(CookieTokenInterceptor)
  login(@Body() loginUserDto: LoginUserDto): Promise<UserResponse> {
    return this.authService.login(loginUserDto);
  }
}
