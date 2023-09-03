import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class IsEmailExistPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}
  async transform(value: any) {
    const { email } = value;
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new ConflictException(`this email is already in use`);
    }
    return value;
  }
}
