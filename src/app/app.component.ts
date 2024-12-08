import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CartManagerService } from './services/cart-manager.service';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-store';
  constructor(private cartService: CartManagerService){}
  ngOnInit(): void {
    this.cartService.getFromLocalStorage();
  }
}
