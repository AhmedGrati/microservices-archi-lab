import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private readonly httpClient: HttpClient) { }

  BACKEND_BASE_URL = "http://localhost:3000";
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.BACKEND_BASE_URL}/api/forecast/all-products`);
  }
  forecast(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.BACKEND_BASE_URL}/api/forecast`);
  }
}
