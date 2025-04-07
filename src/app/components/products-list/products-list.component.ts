import { ProductService } from './../../services/product.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Product } from '../../interfaces/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppShellRenderDirective } from '../../directives/app-shell-render.directive';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatProgressSpinnerModule,
    AppShellRenderDirective,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  productsByCategory: { category: string; products: Product[] }[] = [];
  product$!: Observable<Product[]>;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.loadproducts();
  }

  loadproducts() {
    this.product$ = this.productService.getProducts();

    this.product$.subscribe((products) => {
      this.groupProductsByCategory(products);
    });
  }

  groupProductsByCategory(products: Product[]) {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    this.productsByCategory = categories.map((category) => ({
      category,
      products: products.filter((product) => product.category === category),
    }));
  }
}
