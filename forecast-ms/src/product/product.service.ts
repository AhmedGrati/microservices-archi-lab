import { Injectable } from '@nestjs/common';
import { description } from 'casual';
import { Product } from './entities/product.entity';
const { faker } = require('@faker-js/faker');
const casual  = require('casual');

@Injectable()
export class ProductService {

    async getAllProducts() {
        const products = Array.from({length: 20}).map<Product | void> (
            (_,i) => {
                return {
                    id: i + 1 as number,
                    name: faker.commerce.productName() as string,
                    description: casual.short_description as string,
                    storeName: faker.company.companyName() as string
                }
            }
        );
        return Promise.all(products);
    }

    async forecastOnOneYear() {
        const results = Array.from({length: 12}).map<Number> (
            (_, i) => {
                return faker.random.number({min: 100, max: 500});
            }
        )
        return Promise.all(results);
    }
  
}
