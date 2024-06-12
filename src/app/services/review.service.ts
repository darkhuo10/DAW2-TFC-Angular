import { Review, ReviewDtoCreate } from '../models/review.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ReviewService {
    private apiUrl = 'http://localhost:80/reviews';
  
    constructor(private http: HttpClient) {}

    private transformToReview(dto: any): Review {
        return new Review(
            dto.user.username,
            dto.user.id,
            dto.publish_date,
            dto.rating,
            dto.description
        );
    }

    getAllFromGame(gameId: string): Observable<Review[]> {
        return this.http.get<any>(`${this.apiUrl}/game/${gameId}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        ).pipe(
            map((response: any[]) => response.map(dto => this.transformToReview(dto))));
    }

    getAllFromUser(userId: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user/${userId}`, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        );
    }

    createReview(review: ReviewDtoCreate): Observable<any> {
        return this.http.post<any>(this.apiUrl, review, 
            { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
        );
      }
  }
  