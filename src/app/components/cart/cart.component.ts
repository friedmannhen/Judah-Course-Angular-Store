import { Component } from '@angular/core';
import { CartManagerService } from '../../services/cart-manager.service';
import { CommonModule } from '@angular/common';
import { IProductInCart } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartManagerService) {}
  public products: IProductInCart[];
  // public totalPrice$: number;
  public totalPrice: number;

  ngOnInit(): void {
    this.cartService.getFromLocalStorage();
    this.cartService
      .getCartProducts()
      .pipe(
        tap((data) => {
          this.totalPrice = 0;
          data.forEach((item) => {
            this.totalPrice =
              this.totalPrice + item.product.price * item.amount;
          });
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }
  ngOnDestroy(): void {}

  Delete(prod: IProductInCart) {
    this.cartService.deleteFromCart(prod);
  }
  addAmount(prod: IProductInCart) {
    this.cartService.addToAmount(prod);
  }
  removeAmount(prod: IProductInCart) {
    this.cartService.removeAmount(prod);
  }
}
