import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class WishlistService {
    private apiUrl = 'http://localhost:80/wishlists';
  
    constructor(private http: HttpClient) {}
  
    isInWishlist(userId: string, gameId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/exists/${userId}?game_id=${gameId}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        );
    }

    addToWishlist(userId: string, game_id_str: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/add_game/${userId}`, game_id_str, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        )
    }

    removeFromWishlist(userId: string, game_id_str: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/remove_game/${userId}`, game_id_str, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        )
    }

    getById(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${userId}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        );
    }
}