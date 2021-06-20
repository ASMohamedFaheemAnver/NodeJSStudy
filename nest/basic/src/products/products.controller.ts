import { Body, Controller, Post } from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  addProducts(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { id: string } {
    const id = this.productsService.insertProduct(title, description, price);
    return { id };
  }
}
