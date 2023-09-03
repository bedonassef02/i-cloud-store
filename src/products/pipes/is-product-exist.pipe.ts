import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { ProductsService } from '../products.service';

@Injectable()
export class IsProductExistPipe implements PipeTransform {
  constructor(private readonly productsService: ProductsService) {}

  async transform(id: string, metadata: ArgumentMetadata) {
    const isProductExist = await this.productsService.findOne(id);
    if (!isProductExist)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return id;
  }
}
