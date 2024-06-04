import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model'; // Adjust the import path according to your project structure

@Injectable({
    providedIn: 'root'
  })
  export class GameService {
    private apiUrl = 'http://localhost:80/games'; // Adjust the API base URL as needed
  
    constructor(private http: HttpClient) {}
  
    getAllGames(params?: any): Observable<any> {
      let httpParams = new HttpParams();
      if (params) {
        for (const key in params) {
          if (params[key]) {
            httpParams = httpParams.set(key, params[key]);
          }
        }
      }
      return this.http.get<any>(this.apiUrl, { params: httpParams });
    }
  
    getGameById(gameId: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${gameId}`);
    }
  
    createGame(game: Game): Observable<any> {
      return this.http.post<any>(this.apiUrl, game);
    }
  
    updateGame(gameId: string, game: Game): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/${gameId}`, game);
    }
  
    uploadMainImage(gameId: string, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.put<any>(`${this.apiUrl}/upload_main_img/${gameId}`, formData);
    }
  
    uploadShowcaseImages(gameId: string, files: File[]): Observable<any> {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files`, file, file.name);
      });
      return this.http.put<any>(`${this.apiUrl}/upload_showcase_imgs/${gameId}`, formData);
    }
  
    clearShowcaseImages(gameId: string): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/clear_showcase_imgs/${gameId}`, {});
    }
  
    deleteGame(gameId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${gameId}`);
    }
  
    getMainImage(gameId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/main_image/${gameId}`, { responseType: 'blob' });
    }
  
    getShowcaseImage(name: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/showcase_image/${name}`, { responseType: 'blob' });
    }
  
    downloadGame(gameId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/download/${gameId}`, {
        responseType: 'blob',
        headers: {
          'Content-Disposition': 'attachment'
        }
      });
    }
  
    uploadGameFile(gameId: string, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      return this.http.put<any>(`${this.apiUrl}/upload/${gameId}`, formData);
    }
  }
  