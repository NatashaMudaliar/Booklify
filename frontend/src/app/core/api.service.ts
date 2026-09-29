import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book, Order } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  books(q = '', genre = '') {
    let params = new HttpParams();
    if (q.trim()) params = params.set('q', q.trim());
    if (genre && genre !== 'All') params = params.set('genre', genre);
    return this.http.get<Book[]>('/api/books', { params });
  }

  createOrder(data: unknown) {
    return this.http.post<Order>('/api/orders', data);
  }

  orders() {
    return this.http.get<Order[]>('/api/orders');
  }

  contact(data: unknown) {
    return this.http.post<{ message: string }>('/api/contact', data);
  }

  health() {
    return this.http.get<{ status: string; books: number }>('/api/health');
  }
}
