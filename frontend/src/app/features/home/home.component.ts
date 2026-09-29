import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Book } from '../../core/models';
import { ApiService } from '../../core/api.service';
import { BookCardComponent } from '../../shared/book-card.component';
import { errorMessage } from '../../core/error-message';

@Component({
  selector: 'app-home', standalone: true, imports: [RouterLink, BookCardComponent, NgFor, NgIf],
  template: `
    <main>
      <section class="hero"><div class="container hero-layout"><div class="hero-content"><span class="eyebrow">Your personal bookstore</span><h1>Find your next <span>great read.</span></h1><p>Discover books across fiction, technology, finance and self-help. Search, shop and checkout through a real Angular + Spring Boot + MongoDB application.</p><div class="actions"><a class="btn" routerLink="/books">Browse Books →</a><a class="btn secondary" routerLink="/about">How it works</a></div><div class="hero-trust"><span>✓ Live MongoDB catalog</span><span>✓ Secure JWT login</span><span>✓ Real orders</span></div></div><div class="hero-art"><div class="floating-book book-one">📖</div><div class="floating-book book-two">📘</div><div class="floating-book book-three">💻</div><div class="hero-circle">📚</div></div></div></section>
      <section class="page container"><div class="section-head"><span class="eyebrow">Built as a full-stack project</span><h2>Everything works together</h2><p>Designed to demonstrate real frontend, API and database integration.</p></div><div class="features"><div class="info-card"><div class="feature-icon">📚</div><h3>Live Catalog</h3><p>Books are fetched from MongoDB through Spring Boot REST APIs.</p></div><div class="info-card"><div class="feature-icon">🛒</div><h3>Shopping Cart</h3><p>Persistent cart, quantity controls, stock limits and checkout.</p></div><div class="info-card"><div class="feature-icon">🔒</div><h3>Authentication</h3><p>BCrypt password hashing and JWT-based account sessions.</p></div></div></section>
      <section class="page white"><div class="container"><div class="section-head"><span class="eyebrow">Live from the database</span><h2>Popular Picks</h2><p *ngIf="!loading && !error">{{ books.length }} books currently available.</p></div><div class="loading" *ngIf="loading"><span class="spinner"></span> Loading the catalog...</div><div class="api-error" *ngIf="error"><strong>Catalog unavailable</strong><span>{{ error }}</span><a class="btn small" routerLink="/books">Open catalog</a></div><div class="grid" *ngIf="!loading && !error && books.length"><app-book-card *ngFor="let book of books" [book]="book"/></div></div></section>
    </main>
  `
})
export class HomeComponent implements OnInit {
  api = inject(ApiService); books: Book[] = []; loading = true; error = '';
  ngOnInit() { this.api.books().subscribe({ next: books => { this.books = books.slice(0, 4); this.loading = false; }, error: err => { this.error = errorMessage(err, 'Start Spring Boot on port 8080 to load the catalog.'); this.loading = false; } }); }
}
