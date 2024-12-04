import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products');
  }
  getProductById(id: string): Observable<IProduct> {
    // console.log('serviceID ', id);
    return this.http.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
  }
}
