import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = 'http://localhost:80/users';
  
    constructor(private http: HttpClient) {}

    getUserById(userId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${userId}`, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }

    getUserPfp(userId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/pfp/${userId}`, 
        { responseType: 'blob' , headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }

    getCurrentUser(): Observable<any> {
      return this.http.get<any>('http://localhost:80/me', 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }
  }
  