import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { Book } from '../../core/models';
import { BookCardComponent } from '../../shared/book-card.component';
import { errorMessage } from '../../core/error-message';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, BookCardComponent],
  template: `
    <main>
      <div class="page-title">
        <div class="container narrow">
          <span class="eyebrow">Booklify Collection</span>
          <h1>Find your next book</h1>
          <p>Search the live catalog stored in MongoDB.</p>
        </div>
      </div>

      <section class="container page">
        <div class="toolbar">
          <div class="search-box">
            <span>⌕</span>
            <input [(ngModel)]="q" (ngModelChange)="load()" placeholder="Search by title or author..." aria-label="Search books">
          </div>
          <select [(ngModel)]="genre" (ngModelChange)="load()" aria-label="Filter by genre">
            <option>All</option>
            <option *ngFor="let g of genres">{{ g }}</option>
          </select>
        </div>

        <div class="loading" *ngIf="loading"><span class="spinner"></span> Loading books from MongoDB...</div>
        <div class="api-error" *ngIf="error && !loading">
          <strong>We couldn't load the catalog.</strong>
          <span>{{ error }}</span>
          <button class="btn small" (click)="load()">Try again</button>
        </div>

        <div class="results-bar" *ngIf="!loading && !error">
          <span>{{ books.length }} {{ books.length === 1 ? 'book' : 'books' }} found</span>
          <button *ngIf="q || genre !== 'All'" class="text-btn" (click)="clearFilters()">Clear filters</button>
        </div>

        <div class="grid" *ngIf="!loading && !error && books.length">
          <app-book-card *ngFor="let book of books" [book]="book" />
        </div>

        <div class="empty" *ngIf="!loading && !error && !books.length">
          <div class="empty-icon">📚</div>
          <h2>No books found</h2>
          <p>Try another title, author, or genre.</p>
          <button class="btn secondary" (click)="clearFilters()">Show all books</button>
        </div>
      </section>
    </main>
  `
})
export class BooksComponent implements OnInit {
  api = inject(ApiService);
  books: Book[] = [];
  q = '';
  genre = 'All';
  loading = false;
  error = '';
  genres = ['Fiction', 'Self Help', 'Technology', 'Finance', 'Fantasy'];
  private timer?: number;

  ngOnInit() { this.load(); }

  load() {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.loading = true;
      this.error = '';
      this.api.books(this.q, this.genre).subscribe({
        next: books => { this.books = books; this.loading = false; },
        error: err => { this.error = errorMessage(err, 'Make sure Spring Boot is running on port 8080.'); this.loading = false; }
      });
    }, this.q ? 250 : 0);
  }

  clearFilters() {
    this.q = '';
    this.genre = 'All';
    this.load();
  }
}
