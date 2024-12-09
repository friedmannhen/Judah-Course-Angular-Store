import { Component, viewChild } from '@angular/core';
import { CartManagerService } from '../../services/cart-manager.service';
import { CommonModule } from '@angular/common';
import { IProductInCart } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  accordion = viewChild.required(MatAccordion);
  constructor(private cartService: CartManagerService) {}
  public products: IProductInCart[];
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

  
  sort(sortBy: string) {
    this.accordion().closeAll()
    this.cartService.sort(sortBy);
  }
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
