// theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = false;

  constructor() {
    // Verificar si hay un tema oscuro guardado en localStorage al iniciar
    const storedDarkTheme = localStorage.getItem('darkTheme');
    this.darkTheme = storedDarkTheme ? JSON.parse(storedDarkTheme) : false;
    this.applyTheme(); // Aplicar el tema al inicio
  }

  toggleTheme(): boolean {
    this.darkTheme = !this.darkTheme;
    this.saveThemeToLocalStorage();
    this.applyTheme();
    return this.darkTheme;
  }

  setDarkTheme(isDark: boolean): void {
    this.darkTheme = isDark;
    this.saveThemeToLocalStorage();
    this.applyTheme();
  }

  isDarkTheme(): boolean {
    return this.darkTheme;
  }

  private saveThemeToLocalStorage(): void {
    localStorage.setItem('darkTheme', JSON.stringify(this.darkTheme));
  }

  private applyTheme(): void {
    const theme = this.darkTheme ? 'dark-theme' : '';
    document.documentElement.className = theme;
  }
}
