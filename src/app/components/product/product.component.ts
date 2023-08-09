import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  product: Product = new Product();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.loadProducts();
  }

  onSubmit(): void {
    const productData = this.productForm.value;
    this.productService.addProduct(productData).subscribe(
      response => {
        // Handle success
      },
      error => {
        // Handle error
      }
    );
  }  

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  getProductById(id: number): Product {
    return this.products.find(p => p.id === id) || new Product();
  }

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(data => {
      this.loadProducts();
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe(() => {
      this.loadProducts();
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    },
    error => {
      // Handle error
    }
  );
  }  
}

