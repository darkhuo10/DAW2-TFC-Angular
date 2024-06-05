import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

// hooks order
export class HeaderComponent {
  logo = "assets/img/vgamestore_logo_white.svg";
}
