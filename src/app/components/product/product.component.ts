import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct, IProductInCart } from '../../models';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartManagerService } from '../../services/cart-manager.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIcon, RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private cartService: CartManagerService) {}

  @Input() product: IProduct;
  public existInCart: boolean = false;
  ngOnInit(): void {
    this.cartService
      .getCartProducts()
      .pipe(
        tap((data) => {
          this.existInCart = false;
          data.forEach((item) => {
            if (item.product.id == this.product.id) {
              this.existInCart = true;
            }
          });
        })
      )
      .subscribe();
  }
  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
