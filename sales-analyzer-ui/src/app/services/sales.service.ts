import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../schemas/product';
import { MonthlySales } from '../schemas/monthlysales';
import { Quantity } from '../schemas/quantity';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private basePath = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getSalesDistribution(){
    return this.httpClient.get<Product[]>(this.basePath+"/sales");
  }

  getMonthlyMetrics(){
    return this.httpClient.get<MonthlySales[]>(this.basePath+"/sales/monthly");
  }

  getTotalSales(): any{
    return this.httpClient.get(this.basePath+"/sales/total");
  }

  getProductsByQuantity(){
    return this.httpClient.get<Quantity[]>(this.basePath+"/quantity");
  }
}
