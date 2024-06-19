import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDtoCreate, GameDtoUpdate } from '../models/game.model';
import { AuthService } from './auth.services';

@Injectable({
    providedIn: 'root'
  })
  export class GameService {
    private apiUrl = 'http://localhost:80/games';
  
    constructor(private http: HttpClient, private authService: AuthService) {}
  
    getAllGames(params?: any): Observable<any> {
      let httpParams = new HttpParams();
      if (params != null) {
        for (const key in params) {
          if (params[key] != null) {
            httpParams = httpParams.set(key, params[key]);
          }
        }
      }
      return this.http.get<any>(this.apiUrl, 
        { params: httpParams, headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }
  
    getGameById(gameId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${gameId}`, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }
  
    createGame(game: GameDtoCreate): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/`, game, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }
  
    updateGame(gameId: string, game: GameDtoUpdate): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${gameId}`, game, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }
  
    uploadMainImage(gameId: string, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.put<any>(`${this.apiUrl}/upload_main_img/${gameId}`, formData, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }
  
    uploadShowcaseImages(gameId: string, files: File[]): Observable<any> {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files`, file, file.name);
      });
      return this.http.put<any>(`${this.apiUrl}/upload_showcase_imgs/${gameId}`, formData, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }
  
    clearShowcaseImages(gameId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/clear_showcase_imgs/${gameId}`, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }
  
    deleteGame(gameId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${gameId}`, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }
  
    getMainImage(gameId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/main_image/${gameId}`, 
        { responseType: 'blob', headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }
  
    getShowcaseImage(name: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/showcase_image/${name}`, 
        { responseType: 'blob', headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }

    downloadGame(gameId: string, userId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/download/${gameId}?user_id=${userId}`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Disposition': 'attachment'
        }
      });
    }
  
    uploadGameFile(gameId: string, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.put<any>(`${this.apiUrl}/upload/${gameId}`, formData, 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} });
    }

    getGenres(): Observable<any> {
      return this.http.get<any>('http://localhost:80/genres', 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }

    getLanguages(): Observable<any> {
      return this.http.get<any>('http://localhost:80/languages', 
        { headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`} }
      );
    }
  }
  