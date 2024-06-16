import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private gamesSubject: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  games$: Observable<Game[]> = this.gamesSubject.asObservable();

  setGames(games: Game[]): void {
    this.gamesSubject.next(games);
  }

  getGames(): Game[] {
    return this.gamesSubject.getValue();
  }
}