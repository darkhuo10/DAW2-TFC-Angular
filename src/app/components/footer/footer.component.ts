import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor (private themeService: ThemeService){}

  dark: boolean = this.themeService.isDarkTheme();
}
