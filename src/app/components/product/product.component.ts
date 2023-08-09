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
    description: [''],
    interestRate: [''],
    duration: [''],
    minBalance: ['']
  });
  isFormVisible: boolean = false;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.loadProducts();
  }

  onSubmit(): void {
    const productData = this.productForm.value;
    this.productService.addProduct(productData).subscribe({
      next: response => {
        this.successMessage = "Product added successfully!";
        this.errorMessage = null;
        this.loadProducts();
      },
      error: error => {
        this.errorMessage = "Failed to add product. Please try again.";
        this.successMessage = null;
      }
    });
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
      this.successMessage = "Product updated successfully!";
      this.errorMessage = null;
      this.loadProducts();
    },
    error => {
      this.errorMessage = "Failed to update product. Please try again.";
      this.successMessage = null;
    });
  }  

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.successMessage = "Product deleted successfully!";
      this.errorMessage = null;
      this.loadProducts();
    },
    error => {
      this.errorMessage = "Failed to delete product. Please try again.";
      this.successMessage = null;
    });
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }  
}

