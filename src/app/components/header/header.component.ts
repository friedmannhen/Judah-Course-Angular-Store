import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CartManagerService } from '../../services/cart-manager.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private cartService: CartManagerService) {}

  public amountInCart: number;
  ngOnInit(): void {
    this.cartService
      .getCartProducts()
      .pipe(
        tap((data) => {
          this.amountInCart = 0;
          data.forEach((item) => {
            this.amountInCart = this.amountInCart + item.amount;
          });
        })
      )
      .subscribe();
  }
}
