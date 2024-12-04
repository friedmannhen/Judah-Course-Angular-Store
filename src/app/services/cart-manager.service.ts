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
  private TotalAmountSubjet$: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(product: IProduct) {
    // if()//to do !!!!! if aleady in cart
    let totAmount = this.TotalAmountSubjet$.value;
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
    this.TotalAmountSubjet$.next(++totAmount);
    this.saveToLocalStorage();
  }

  addToAmount(product: IProductInCart) {
    let totAmount = this.TotalAmountSubjet$.value;
    let prodArr = this.productsSubject$.value;
    let index = prodArr.indexOf(product);
    if (index != -1) {
      prodArr[index].amount++;
      this.productsSubject$.next(prodArr);
      this.TotalAmountSubjet$.next(++totAmount);
      this.saveToLocalStorage();
    } else {
      //TODO
    }
  }
  removeAmount(product: IProductInCart) {
    let totAmount = this.TotalAmountSubjet$.value;
    let prodArr = this.productsSubject$.value;
    let index = prodArr.indexOf(product);
    if (index != -1 && prodArr[index].amount > 1) {
      prodArr[index].amount--;
      this.productsSubject$.next(prodArr);
      this.TotalAmountSubjet$.next(--totAmount);
      this.saveToLocalStorage();
    } else {
      //TODO
    }
  }

  deleteFromCart(product: IProductInCart) {
    let totAmount = this.TotalAmountSubjet$.value;
    let prodArr = this.productsSubject$.value;
    let indexTodelete = prodArr.indexOf(product);
    if (indexTodelete != -1) {
      this.TotalAmountSubjet$.next(totAmount - prodArr[indexTodelete].amount);
      prodArr.splice(indexTodelete, 1);
      this.productsSubject$.next(prodArr);
      this.saveToLocalStorage();
    } else {
    }
  }
  getCartProducts() {
    return this.productsSubject$.asObservable();
  }
  getTotalProductsAmount() {
    return this.TotalAmountSubjet$.asObservable();
  }
  getFromLocalStorage() {
    this.productsSubject$.next(JSON.parse(localStorage.getItem('cartItems')));
    this.TotalAmountSubjet$.next(
      JSON.parse(localStorage.getItem('totalAmount'))
    );
  }
  saveToLocalStorage() {
    localStorage.setItem(
      'cartItems',
      JSON.stringify(this.productsSubject$.value)
    );
    localStorage.setItem(
      'totalAmount',
      JSON.stringify(this.TotalAmountSubjet$.value)
    );
  }
}
