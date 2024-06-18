// theme.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = false;

  toggleTheme(): boolean {
    return this.darkTheme = !this.darkTheme;

  }
}
