import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart_item';
import { Product } from '../interfaces/product';
import { supabase } from './supabase.client';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItem$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    from(
      supabase
        .from('cart_items')
        .select('quantity, product:product_id (id, title, price, image)')
    ).subscribe({
      next: ({ data, error }) => {
        if (error) {
          console.error('Erro ao carregar o carrinho', error.message);
        } else {
          const items = (data || []).map((item: any) => ({
            product: item.product,
            quantity: item.quantity,
          }));
          this.cartItemsSubject.next(items);
        }
      },
    });
  }
  private saveCartitem(cartItem: CartItem): Observable<void> {
    return from(
      supabase
        .from('cart_items')
        .upsert({
          product_id: cartItem.product.id,
          quantity: cartItem.quantity,
        })
        .then(({ error }) => {
          if (error) throw new Error(error.message);
        })
    );
  }
  private getCurrentItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }
  addToCart(product: Product, quantity: number = 1) {
    const currentItems = this.getCurrentItems();

    const itemIndex = currentItems.findIndex(
      (item) => item.product.id == product.id
    );

    if (itemIndex >= 0) {
      currentItems[itemIndex].quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.cartItemsSubject.next(currentItems);
    this.saveCartitem(
      currentItems[itemIndex] || { product, quantity }
    ).subscribe({});
  }

  getTotalQuantity(): number {
    return this.getCurrentItems().reduce((acc, item) => acc + item.quantity, 0);
  }
}
