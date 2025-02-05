import { Observable } from '@nativescript/core';
import { AuthService } from '../../core/services/auth.service';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  async onLogin() {
    try {
      if (!this.email || !this.password) {
        this.set('errorMessage', 'Please fill in all fields');
        return;
      }

      const success = await this.authService.login(this.email, this.password);
      if (success) {
        // Navigate to home page
      } else {
        this.set('errorMessage', 'Invalid credentials');
      }
    } catch (error) {
      this.set('errorMessage', 'An error occurred during login');
    }
  }

  onRegister() {
    // Navigate to registration page
  }
}