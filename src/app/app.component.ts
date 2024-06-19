import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme = false;
  themeButtonText = 'Switch to Dark Mode';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme();
    this.updateThemeButtonText();
  }

  toggleTheme(): void {
    this.isDarkTheme = this.themeService.toggleTheme();
    this.updateThemeButtonText();
    console.log(this.isDarkTheme);
  }

  private updateThemeButtonText(): void {
    this.themeButtonText = this.isDarkTheme ? 'Light Mode' : 'Dark Mode';
  }
}
