import { afterNextRender, Component, inject, OnInit } from '@angular/core';

import { ProductsListComponent } from '../../components/products-list/products-list.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  constructor() {
    afterNextRender(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log('Latitude', position.coords.latitude);
        });
      } else {
        console.error('Erro ao obter a localização');
      }
    });
  }
  ngOnInit(): void {
    this.setPageMeta();
  }

  // código omitido

  setPageMeta() {
    this.title.setTitle('Deleite - a melhor experiência em sabores');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'Descubra os melhores milkshakes, sorvetes e smoothies na Deleite. Sabor e qualidade em cada produto!',
      },
      {
        property: 'og:title',
        content: 'Deleite - a melhor experiência em sabores',
      },
      {
        property: 'og:description',
        content: 'Deleite - a melhor experiência em sabores',
      },
      {
        property: 'og:image',
        content: 'assets/images/logo.ong',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ]);
  }
}
