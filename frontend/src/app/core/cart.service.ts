import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book, CartItem } from './models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private key = 'booklify_cart';
  private subject = new BehaviorSubject<CartItem[]>(this.read());
  items$ = this.subject.asObservable();

  private read(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '[]') as CartItem[];
    } catch {
      return [];
    }
  }

  private save(items: CartItem[]) {
    localStorage.setItem(this.key, JSON.stringify(items));
    this.subject.next(items);
  }

  add(book: Book) {
    const items = this.read();
    const existing = items.find(item => item.book.id === book.id);
    if (existing) {
      if (existing.quantity < book.stock) existing.quantity++;
    } else if (book.stock > 0) {
      items.push({ book, quantity: 1 });
    }
    this.save(items);
  }

  change(id: string, delta: number) {
    const items = this.read();
    const item = items.find(x => x.book.id === id);
    if (!item) return;
    item.quantity = Math.max(0, Math.min(item.book.stock, item.quantity + delta));
    if (item.quantity === 0) items.splice(items.indexOf(item), 1);
    this.save(items);
  }

  remove(id: string) {
    this.save(this.read().filter(x => x.book.id !== id));
  }

  clear() {
    this.save([]);
  }

  get snapshot() { return this.subject.value; }
  get count() { return this.snapshot.reduce((sum, item) => sum + item.quantity, 0); }
  get subtotal() { return this.snapshot.reduce((sum, item) => sum + item.book.price * item.quantity, 0); }
  get delivery() { return this.subtotal === 0 || this.subtotal >= 999 ? 0 : 49; }
  get total() { return this.subtotal + this.delivery; }
}
