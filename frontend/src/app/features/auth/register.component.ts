import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { errorMessage } from '../../core/error-message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <main class="auth-page">
      <div class="page-title"><span class="eyebrow">Join Booklify</span><h1>Create your account</h1><p>Save your details securely in MongoDB and checkout faster.</p></div>
      <section class="form-wrap">
        <div class="form-card">
          <div class="auth-icon">✨</div>
          <form (ngSubmit)="submit()">
            <div class="form-group"><label for="name">Name</label><input id="name" name="name" [(ngModel)]="name" required autocomplete="name" placeholder="Your full name"></div>
            <div class="form-group"><label for="email">Email</label><input id="email" type="email" name="email" [(ngModel)]="email" required autocomplete="email" placeholder="you@example.com"></div>
            <div class="form-group"><label for="password">Password</label><input id="password" type="password" name="password" [(ngModel)]="password" required minlength="6" autocomplete="new-password" placeholder="At least 6 characters"></div>
            <button class="btn full" [disabled]="loading || !name.trim() || !email.trim() || password.length < 6">{{ loading ? 'Creating account...' : 'Create Account' }}</button>
            <div class="error" *ngIf="error">{{ error }}</div>
          </form>
          <p class="form-note">Already have an account? <a routerLink="/login">Login</a></p>
        </div>
      </section>
    </main>
  `
})
export class RegisterComponent {
  name = ''; email = ''; password = ''; loading = false; error = '';
  auth = inject(AuthService); router = inject(Router);

  submit() {
    this.loading = true; this.error = '';
    this.auth.register({ name: this.name.trim(), email: this.email.trim(), password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => { this.error = errorMessage(err, 'Registration failed. Please try again.'); this.loading = false; }
    });
  }
}
