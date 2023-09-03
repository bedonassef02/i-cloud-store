import { Product } from '../entities/product.entity';
import { PaginationInfo } from '../../common/types/pagination.info';

export type ProductsResponse = {
  info: PaginationInfo;
  products: Product[]; // Assuming you want an array of products here
};
