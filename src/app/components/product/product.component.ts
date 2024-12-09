import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IProduct, IProductInCart } from '../../models';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CartManagerService } from '../../services/cart-manager.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';
import { AddFormComponent } from '../add-form/add-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIcon,
    RouterLink,
    CommonModule,
    MatTooltipModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    private cartService: CartManagerService,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isAuthenticated$();
  }
  public isLoggedIn$: Observable<boolean>;

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
  openEdit(){
    let dialogRef = this.dialog.open(AddFormComponent, {
      data: this.product,
    });
  }
}
