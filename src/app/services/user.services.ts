import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
    private apiUrl = 'http://localhost:80/users';
  
    constructor(private http: HttpClient) {}

    getUserById(userId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${userId}`);
    }

    getUserPfp(userId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/pfp/${userId}`, { responseType: 'blob' });
    }

    //Añadir mas conforme vaya necesitando.
  }
  