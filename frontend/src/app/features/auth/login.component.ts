import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/error-message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <main class="auth-page">
      <div class="page-title"><span class="eyebrow">Welcome Back</span><h1>Login to Booklify</h1><p>Access your account and place orders.</p></div>
      <section class="form-wrap">
        <div class="form-card">
          <div class="auth-icon">🔐</div>
          <form (ngSubmit)="submit()">
            <div class="form-group"><label for="email">Email</label><input id="email" type="email" name="email" [(ngModel)]="email" required autocomplete="email" placeholder="you@example.com"></div>
            <div class="form-group"><label for="password">Password</label><input id="password" type="password" name="password" [(ngModel)]="password" required minlength="6" autocomplete="current-password" placeholder="Your password"></div>
            <button class="btn full" [disabled]="loading || !email.trim() || password.length < 6">{{ loading ? 'Logging in...' : 'Login' }}</button>
            <div class="error" *ngIf="error">{{ error }}</div>
          </form>
          <div class="demo-box"><strong>Demo account</strong><span>demo@booklify.com</span><span>Booklify@123</span><button type="button" class="text-btn" (click)="fillDemo()">Use demo credentials</button></div>
          <p class="form-note">New here? <a routerLink="/register">Create an account</a></p>
        </div>
      </section>
    </main>
  `
})
export class LoginComponent {
  auth = inject(AuthService); router = inject(Router); route = inject(ActivatedRoute);
  email = ''; password = ''; loading = false; error = '';

  fillDemo() { this.email = 'demo@booklify.com'; this.password = 'Booklify@123'; }

  submit() {
    this.loading = true; this.error = '';
    this.auth.login({ email: this.email.trim(), password: this.password }).subscribe({
      next: () => this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('returnUrl') || '/'),
      error: err => { this.error = errorMessage(err, 'Login failed. Check your email and password.'); this.loading = false; }
    });
  }
}
