import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { CartService } from './core/cart.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root', standalone: true, imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  template: `
    <header>
      <div class="header-inner"><a class="logo" routerLink="/" (click)="closeMenu()">Book<span>lify</span></a><button class="menu-btn" (click)="open=!open" [attr.aria-expanded]="open">☰</button>
        <nav [class.open]="open">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">Home</a><a routerLink="/books" routerLinkActive="active" (click)="closeMenu()">Books</a><a routerLink="/about" routerLinkActive="active" (click)="closeMenu()">About</a><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a><a class="cart-link" routerLink="/cart" routerLinkActive="active" (click)="closeMenu()">Cart <span class="cart-count">{{ cart.count }}</span></a><ng-container *ngIf="auth.user$|async as user; else guest"><span class="welcome">Hi, {{ user.name }}</span><button class="nav-btn" (click)="logout()">Logout</button></ng-container><ng-template #guest><a routerLink="/login" routerLinkActive="active" (click)="closeMenu()">Login</a></ng-template>
        </nav>
      </div>
    </header>
    <router-outlet></router-outlet>
    <footer><div class="footer-grid"><div><a class="footer-logo" routerLink="/">Booklify</a><p>A full-stack bookstore built with Angular, Spring Boot and MongoDB.</p></div><div><h3>Explore</h3><a routerLink="/books">All Books</a><a routerLink="/about">About Us</a><a routerLink="/contact">Contact</a></div><div><h3>Account</h3><a routerLink="/login">Login</a><a routerLink="/register">Create Account</a><a routerLink="/cart">Cart</a></div></div><div class="copyright">© 2026 Booklify · Built as a full-stack portfolio project</div></footer>
  `
})
export class AppComponent {
  open = false; cart = inject(CartService); auth = inject(AuthService);
  closeMenu() { this.open = false; }
  logout() { this.auth.logout(); this.closeMenu(); }
}
