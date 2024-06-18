import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isDarkTheme!: boolean;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
  }

  toggleTheme(): void {
    this.isDarkTheme = this.themeService.toggleTheme();
    console.log(this.isDarkTheme);
  }
}
