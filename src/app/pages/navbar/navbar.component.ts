import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserInfo, UsuarioService } from '../../service/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  scrolled = false;
  user?: UserInfo;
  constructor(private router: Router, private authService: AuthService, private userService: UsuarioService) { }


  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: user => this.user = user
    });
  }


  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
  }

  logout(): void {
    this.authService.logout(); // o AuthService.logout()
    this.router.navigate(['/login']);
  }
}
