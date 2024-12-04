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

  addToCart(product: IProduct) {
    let prodArr = this.productsSubject$.value;
    let exists: boolean = false;
    prodArr.forEach((prod) => {
      if (prod.product.id == product.id) {
        exists = true;
      }
    });
    if (exists) return;
    const prod: IProductInCart = {
      product: product,
      amount: 1,
    };

    prodArr.push(prod);
    this.productsSubject$.next(prodArr);
    this.saveToLocalStorage();
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
    this.productsSubject$.next(JSON.parse(localStorage.getItem('cartItems') || '[]'));
  }
  saveToLocalStorage() {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(this.productsSubject$.value)
    );
  }
}
