import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  username: string;
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
