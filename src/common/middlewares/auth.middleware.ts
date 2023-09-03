import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  use(req: any, res: any, next: () => void) {
    const token = req.cookies['token'];
    if (!token) {
      throw new UnauthorizedException('token is required for this request');
    }
    const decodedToken = this.authService.verifyToken(token);
    req.user = decodedToken;
    next();
  }
}
