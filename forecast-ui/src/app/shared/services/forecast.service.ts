import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private readonly httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiURL}/api/forecast/all-products`);
  }
  forecast(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${environment.apiURL}/api/forecast`);
  }
}
