import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartManagerService } from '../../services/cart-manager.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartManagerService
  ) {}
  product: IProduct; // for option 1  and 2
  // product$: Observable<IProduct>; // for option 3
  private sub: Subscription = new Subscription(); // for option 1 and 2
  public existInCart: boolean = false;
  ngOnInit(): void {
    //option 1: adding each subscription to the sub variable
    // this.sub.add(
    //   this.route.paramMap.subscribe((params) => {
    //     const productId = params.get('id') || '';
    //     // console.log('Product ID:', productId); // Log the ID
    //     this.sub.add(
    //       this.productService.getProductById(productId).subscribe((data) => {
    //         // console.log('Product by ID:', this.product); // Log the ID
    //       })
    //     );
    //   })
    // );

    //
    // option 2 adding 1 single subscription to the sub variable instead of 2
    this.sub.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            const productId = params.get('id') || '';
            return this.productService.getProductById(productId);
          }),
          tap((data) => {
            this.product = data;
          }),
          switchMap(() => this.cartService.getCartProducts())
        )
        .subscribe((cartProducts) => {
          this.existInCart = cartProducts.some(
            (item) => item.product.id === this.product.id
          );
        })
    );

    // Option 3 use async pipe in html instead of subscribing and unsbscribing
    // let obs1$ = this.route.paramMap;
    // let obs2$ = (id: string) => this.productService.getProductById(id);
    // this.product$ = obs1$.pipe(
    //   switchMap((params) => {
    //     const productId = params.get('id');
    //     return obs2$(productId)
    //   })
    // );

  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
