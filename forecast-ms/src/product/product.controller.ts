import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern("get_all_products")
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @EventPattern("forecast")
  forecast() {
    return this.productService.forecastOnOneYear();
  }
  
  
}
