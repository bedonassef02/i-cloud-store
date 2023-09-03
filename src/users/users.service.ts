import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    registerUserDto.password = await this.hashPassword(
      registerUserDto.password,
    );
    const user = await this.userModel.create(registerUserDto);
    return this.plainIntoUserResponse(user);
  }

  async check(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    const user = await this.findOne(loginUserDto.email);
    if (
      user &&
      (await this.comparePasswords(loginUserDto.password, user.password))
    ) {
      return this.plainIntoUserResponse(user);
    } else {
      throw new BadRequestException('email or password mismatch our records');
    }
  }

  async findOne(email: string) {
    return this.userModel.findOne({ email });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private plainIntoUserResponse(user: any): UserResponseDto {
    const userResponse: UserResponseDto = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return userResponse;
  }
}
