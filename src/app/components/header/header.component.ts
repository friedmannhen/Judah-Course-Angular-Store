import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CartManagerService } from '../../services/cart-manager.service';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

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
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private cartService: CartManagerService,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isAuthenticated$();
  }

  public amountInCart: number;
  public isLoggedIn$: Observable<boolean>;
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

  readonly loginDialog = inject(MatDialog);
  logout() {
    this.authService.logout();
  }
  openLogin() {
    const loginDialogRef = this.loginDialog.open(LoginComponent);
    loginDialogRef.afterClosed().subscribe((result) => {
      console.log('the dialog was closed');
    });
  }
}
