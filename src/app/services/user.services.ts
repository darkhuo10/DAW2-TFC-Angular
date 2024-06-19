import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDtoUpdate } from '../models/user.model';

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

    getUsers(active: boolean): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}?active=${active}`, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }

    switchActive(userId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${userId}`, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }
    getCurrentUser(): Observable<any> {
      return this.http.get<any>('http://localhost:80/me', 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }

    updateUser(userId: string, user: UserDtoUpdate): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${userId}`, user, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }

    uploadPfp(userId: string, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.put<any>(`${this.apiUrl}/upload_pfp/${userId}`, formData, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }
  }
  