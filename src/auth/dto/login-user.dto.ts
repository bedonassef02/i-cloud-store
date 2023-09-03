import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
}
