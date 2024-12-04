import { Component } from '@angular/core';
import { CartManagerService } from '../../services/cart-manager.service';
import { CommonModule } from '@angular/common';
import { IProductInCart } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private cartService: CartManagerService) {}
  public products: IProductInCart[];
  public totalPrice$: number;

  ngOnInit(): void {
    this.cartService.getFromLocalStorage();
    this.cartService.getTotalPriceAmount().subscribe((data) => {
      this.totalPrice$ = data;
    });
    this.cartService.getCartProducts().subscribe((data) => {
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
