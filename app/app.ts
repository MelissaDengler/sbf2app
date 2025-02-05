import { Application } from '@nativescript/core';
import { AuthService } from './core/services/auth.service';

// Initialize services
AuthService.getInstance();

Application.run({ moduleName: 'app-root' });