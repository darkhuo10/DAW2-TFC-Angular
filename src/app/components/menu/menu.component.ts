import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  isAdminUser = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
  }

  toggleMenu(state: boolean) {
    this.isMenuOpen = state;
  }

  cerrarSesion(): void {
    this.toggleMenu(false);
    localStorage.setItem('token', '');
  }

  shouldBeVisible(): boolean {
    switch (this.router.url) {
      case "/register": { return false; }
      case "/login": { return false; }
      default: { return true; }
    }
  }

  isAdmin() {
    return this.isAdminUser;
  }
}