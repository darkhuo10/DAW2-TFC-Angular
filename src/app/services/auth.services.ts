import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  private router: Router = new Router();

  constructor() {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    console.log("entra")
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.currentUser = {
        role: decodedToken.role,
        id: decodedToken.id
      };
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  checkToken(): void {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const nowInTimestamp = Math.floor(Date.now() / 1000)
      if (parseInt(decodedToken.exp) <= nowInTimestamp) {
        this.router.navigate(['/login']);
      }
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  getCurrentUser(): string {
    return this.currentUser.id.toString();
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }
}