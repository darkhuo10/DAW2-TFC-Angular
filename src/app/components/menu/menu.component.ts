import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  isAdminUser = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
  }

  toggleMenu(state: boolean) {
    this.isMenuOpen = state;
  }

  isAdmin() {
    return this.isAdminUser;
  }
}