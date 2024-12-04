import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../models';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartManagerService } from '../../services/cart-manager.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatButtonModule, MatCardModule,MatIcon,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private cartService: CartManagerService) {}


  @Input() product: IProduct;

  addToCart(){
    this.cartService.addToCart(this.product);
  }
}
