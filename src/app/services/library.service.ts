import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class LibraryService {
    private apiUrl = 'http://localhost:80/libraries';
  
    constructor(private http: HttpClient) {}

    getAllGames(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${userId}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        ).pipe(map(response => response.games)); // Solo nos quedamos con la lista de juegos.
    }
}