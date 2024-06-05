import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class GameService {
    private apiUrl = 'http://localhost:80/users';
  
    constructor(private http: HttpClient) {}
  }
  