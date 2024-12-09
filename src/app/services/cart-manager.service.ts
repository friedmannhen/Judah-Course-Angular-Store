import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct, IProductInCart } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CartManagerService {
  constructor() {}

  private productsSubject$: BehaviorSubject<IProductInCart[]> =
    new BehaviorSubject([]);

  addToCart(product: IProduct): boolean {
    let prodArr = this.productsSubject$.value;
    if (this.checkIfInCart(product)) return false;

    const prod: IProductInCart = {
      product: product,
      amount: 1,
    };

    prodArr.push(prod);
    this.productsSubject$.next(prodArr);
    this.saveToLocalStorage();
    return true;
  }

  addToAmount(product: IProductInCart) {
    let prodArr = this.productsSubject$.value;
    let index = prodArr.indexOf(product);
    if (index != -1) {
      prodArr[index].amount++;
      this.productsSubject$.next(prodArr);
      this.saveToLocalStorage();
    } else {
      //TODO
    }
  }
  removeAmount(product: IProductInCart) {
    let prodArr = this.productsSubject$.value;
    let index = prodArr.indexOf(product);
    if (index != -1 && prodArr[index].amount > 1) {
      prodArr[index].amount--;
      this.productsSubject$.next(prodArr);
      this.saveToLocalStorage();
    } else {
      //TODO
    }
  }

  deleteFromCart(product: IProductInCart) {
    let prodArr = this.productsSubject$.value;
    let indexTodelete = prodArr.indexOf(product);
    if (indexTodelete != -1) {
      prodArr.splice(indexTodelete, 1);
      this.productsSubject$.next(prodArr);
      this.saveToLocalStorage();
    } else {
    }
  }
  getCartProducts() {
    return this.productsSubject$.asObservable();
  }
  getFromLocalStorage() {
    this.productsSubject$.next(
      JSON.parse(localStorage.getItem('cartItems') || '[]')
    );
  }
  saveToLocalStorage() {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(this.productsSubject$.value)
    );
  }

  checkIfInCart(product: any): boolean {
    let prodArr = this.productsSubject$.value;
    let exists: boolean = false;
    if (product.id) {
      exists = prodArr.some((item) => item.product.id === product.id);
    } else {
      exists = prodArr.some((item) => item.product.id === product.product.id);
    }
    return exists;
  }
  sort(sortBy: string) {
    let prodArr = this.productsSubject$.value;
    switch (sortBy) {
      case 'categories':
        prodArr.sort((a, b) => {
          if (a.product.category < b.product.category) return -1;
          if (a.product.category > b.product.category) return 1;
          return 0; // Equal categories
        });
        break;
      case 'id':
        prodArr.sort((a, b) => {
          if (a.product.id < b.product.id) return -1;
          if (a.product.id > b.product.id) return 1;
          return 0; // Equal categories
        });
        break;
      case 'price':
        prodArr.sort((a, b) => {
          if (a.product.price < b.product.price) return -1;
          if (a.product.price > b.product.price) return 1;
          return 0; // Equal categories
        });
        break;
      case 'rating':
        prodArr.sort((a, b) => {
          if (a.product.rating.rate < b.product.rating.rate ) return -1;
          if (a.product.rating.rate  > b.product.rating.rate ) return 1;
          return 0; // Equal categories
        });
        break;
      }
    this.productsSubject$.next(prodArr);
    this.saveToLocalStorage();
  }
}
