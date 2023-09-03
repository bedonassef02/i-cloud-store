import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsService } from '../products.service';

@Injectable()
export class IsSameUserGuard implements CanActivate {
  constructor(private readonly productsService: ProductsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const user = request.user.id;
    const product = await this.productsService.findOne(id);

    if (product.user === user) {
      return true;
    }

    throw new UnauthorizedException(
      `You are not allowed to alter this product`,
    );
  }
}
