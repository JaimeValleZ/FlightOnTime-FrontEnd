import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {
 constructor(private authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }
}
