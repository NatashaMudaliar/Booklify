import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Book } from '../core/models';
import { CartService } from '../core/cart.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CurrencyPipe, NgIf],
  template: `
    <article class="book-card">
      <div class="cover"><span>{{ book.emoji }}</span></div>
      <div class="book-body">
        <div class="book-meta"><span>{{ book.genre }}</span><span>{{ book.stock }} left</span></div>
        <h3>{{ book.title }}</h3>
        <div class="author">by {{ book.author }}</div>
        <p class="desc">{{ book.description }}</p>
        <div class="book-footer">
          <div class="price">{{ book.price | currency:'INR':'symbol':'1.0-0' }}</div>
          <button class="btn small" [disabled]="book.stock < 1" (click)="add()">
            {{ added ? 'Added ✓' : (book.stock < 1 ? 'Out of stock' : 'Add to Cart') }}
          </button>
        </div>
      </div>
    </article>
  `
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  cart = inject(CartService);
  added = false;

  add() {
    this.cart.add(this.book);
    this.added = true;
    window.setTimeout(() => this.added = false, 1200);
  }
}
