import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component:AboutComponent
  },
  {
    path: 'product/:id',
    component:ProductPageComponent
  },
  {
    path: 'cart',
    component:CartComponent
  },
];
