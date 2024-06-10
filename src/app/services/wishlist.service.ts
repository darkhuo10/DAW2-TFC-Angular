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
        return this.http.get<any>(`${this.apiUrl}/exists/${userId}?game_id=${gameId}`);
    }

    addToWishlist(userId: string, game_id_str: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/add_game/${userId}`, game_id_str)
    }

    removeFromWishlist(userId: string, game_id_str: string): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/remove_game/${userId}`, game_id_str)
    }

    getById(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${userId}`);
    }
}