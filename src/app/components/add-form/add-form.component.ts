import { CommonModule } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IProduct } from '../../models';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
})
export class AddFormComponent {
  addForm: FormGroup;
  constructor(
    private productService: ProductService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {
    this.addForm = new FormGroup({
      title: new FormControl(!!data ? data.title : '', [Validators.required]),
      category: new FormControl(!!data ? data.category : '', [
        Validators.required,
      ]),
      description: new FormControl(!!data ? data.description : '', [
        Validators.required,
      ]),
      id: new FormControl(!!data ? data.id : '', [Validators.required]),
      image: new FormControl(
        !!data
          ? data.image
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s'
      ),
      price: new FormControl(!!data ? data.price : '', [Validators.required]),
      // rate: new FormControl(!!data ? data.rating.rate : '', [Validators.required]),
      // count: new FormControl(!!data ? data.rating.count : '', [Validators.required]),
    });
  }
  onSubmit() {
    let newProduct: IProduct = {
      title: this.addForm.value.title,
      category: this.addForm.value.category,
      description: this.addForm.value.description,
      id: this.addForm.value.id,
      image: this.addForm.value.image,
      price: this.addForm.value.price,
      rating: {
        rate: !!this.data
          ? this.data.rating.rate
          : Number((Math.random() * 5).toFixed(1)),
        count: !!this.data
          ? this.data.rating.count
          : Math.floor(Math.random() * 500),
      },
    };
    this.productService.addProduct(newProduct);
    this.router.navigate(['']);
  }
}
