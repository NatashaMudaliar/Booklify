import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/cart.service';
import { AuthService } from '../../core/auth.service';
import { ApiService } from '../../core/api.service';
import { errorMessage } from '../../core/error-message';

@Component({
  selector: 'app-cart', standalone: true, imports: [CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <main><div class="page-title"><span class="eyebrow">Your selection</span><h1>Shopping Cart</h1><p>Review your books and place your order when you're ready.</p></div><section class="container page">
      <div *ngIf="cart.snapshot.length; else empty">
        <div class="cart-panel"><div class="cart-item" *ngFor="let item of cart.snapshot"><div class="cart-cover">{{ item.book.emoji }}</div><div class="cart-info"><h3>{{ item.book.title }}</h3><p class="author">{{ item.book.author }}</p><span class="stock-note">{{ item.book.stock }} available</span></div><div class="qty"><button (click)="cart.change(item.book.id,-1)" aria-label="Decrease quantity">−</button><strong>{{ item.quantity }}</strong><button (click)="cart.change(item.book.id,1)" [disabled]="item.quantity >= item.book.stock" aria-label="Increase quantity">+</button></div><div class="line-total"><strong>{{ item.book.price * item.quantity | currency:'INR':'symbol':'1.0-0' }}</strong></div><button class="remove-btn" (click)="cart.remove(item.book.id)">Remove</button></div></div>
        <div class="cart-bottom"><div class="cart-summary"><div class="summary-row"><span>Subtotal</span><strong>{{ cart.subtotal | currency:'INR':'symbol':'1.0-0' }}</strong></div><div class="summary-row"><span>Delivery</span><strong>{{ cart.delivery === 0 ? 'Free' : (cart.delivery | currency:'INR':'symbol':'1.0-0') }}</strong></div><p class="delivery-note" *ngIf="cart.subtotal < 999">Add {{ 999 - cart.subtotal | currency:'INR':'symbol':'1.0-0' }} more for free delivery.</p><div class="summary-row total"><span>Total</span><strong>{{ cart.total | currency:'INR':'symbol':'1.0-0' }}</strong></div><button class="btn full" (click)="checkout()" [disabled]="loading">{{ loading ? 'Placing order...' : 'Proceed to Checkout' }}</button><div class="error" *ngIf="error">{{ error }}</div></div></div>
      </div><ng-template #empty><div class="empty"><div class="empty-icon">🛒</div><h2>Your cart is empty</h2><p>Find a book you love and it will appear here.</p><a class="btn" routerLink="/books">Browse Books</a></div></ng-template>
    </section></main>
  `
})
export class CartComponent {
  cart = inject(CartService); auth = inject(AuthService); api = inject(ApiService); router = inject(Router); loading = false; error = '';
  checkout() {
    if (!this.auth.isLoggedIn) { this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } }); return; }
    const user = this.auth.user!; this.loading = true; this.error = '';
    this.api.createOrder({ customerName: user.name, email: user.email, items: this.cart.snapshot.map(x => ({ bookId: x.book.id, quantity: x.quantity })) }).subscribe({
      next: () => { this.cart.clear(); this.loading = false; this.router.navigate(['/']); },
      error: err => { this.error = errorMessage(err, 'Unable to place the order. Please try again.'); this.loading = false; }
    });
  }
}
