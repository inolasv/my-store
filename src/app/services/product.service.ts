import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = []

  constructor(private http: HttpClient) { }
  
  getProducts() : Observable<Product[]> {  
    return this.http.get<Product[]>("assets/data.json");
  }

}
