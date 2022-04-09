import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/models/product';
import { ForecastService } from '../shared/services/forecast.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private readonly forecastService: ForecastService, private router: Router) { }
  products: Product[];
  ngOnInit(): void {
    this.forecastService.getAllProducts()
      .subscribe((data) => {
        this.products = data;
      })
  }

  redirectForecast(product) {
    console.log(product);
    this.router.navigate([`/forecast/${product.name}`])
  }


}
