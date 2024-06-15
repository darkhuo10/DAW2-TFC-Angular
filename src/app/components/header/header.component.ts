import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

// hooks order
export class HeaderComponent {
  logo = "assets/img/vgamestore_logo_white.svg";

  constructor(
    private router: Router
  ) {}  

  checkUrl(): boolean {
    const url = this.router.url;
    let x = url == "/home" || url == "/wishlist" || url == "/library";
    return x;
  }
}
