import { HttpClient } from '@angular/common/http';
import { Injectable, INJECTOR } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products$: BehaviorSubject<IProduct[]> = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    this.fetchProduct();
    return this.products$.asObservable();
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
  }
  private fetchProduct(): void {
    this.http
      .get<IProduct[]>('https://fakestoreapi.com/products')
      .pipe(
        map((data) => {
          const newProducts: IProduct[] = JSON.parse(
            localStorage.getItem('newProducts') || '[]'
          );
          if (newProducts.length > 0) {
            return [...data, ...newProducts];
          }
          return data;
        })
      )
      .subscribe((data) => {
        this.products$.next(data);
      });
  }
  addProduct(newProduct: IProduct) {
    let prodArr = this.products$.value;
    let index = prodArr.findIndex((item) => item.id === newProduct.id);
    if (index != -1) {
      prodArr[index] = newProduct;
      this.products$.next(prodArr);
      //this will be reverted on refresh ..no reason to fix it .. DB would have worked properly.
    } else {
      let newProducts: IProduct[] = JSON.parse(
        localStorage.getItem('newProducts') || '[]'
      );
      newProducts.push(newProduct);
      localStorage.setItem('newProducts', JSON.stringify(newProducts));
      this.fetchProduct();
    }
  }
}
