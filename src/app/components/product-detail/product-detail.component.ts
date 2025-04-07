import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { catchError, Observable, of, tap } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { AppShellRenderDirective } from '../../directives/app-shell-render.directive';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AppShellNoRenderDirective } from '../../directives/app-shell-no-render.directibe';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    AppShellRenderDirective,
    AppShellNoRenderDirective,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  quantities: number[] = [1, 2, 3, 4, 5];
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
    if (this.product) {
      this.setPageMeta(this.product);
    }
  }

  setPageMeta(product: Product) {
    this.title.setTitle(`${product.title} - Detalhes do produto`);
    this.meta.addTags([
      {
        name: 'description',
        content: product.ingredients,
      },
      {
        property: 'og:title',
        content: product.title,
      },
      {
        property: 'og:description',
        content: product.ingredients,
      },
      {
        property: 'og:image',
        content: product.imageDetails,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ]);
  }
}
