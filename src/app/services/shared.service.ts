import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private gamesSubject: BehaviorSubject<Game[]> = new BehaviorSubject<Game[]>([]);
  games$: Observable<Game[]> = this.gamesSubject.asObservable();

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  setGames(games: Game[]): void {
    this.gamesSubject.next(games);
  }

  getGames(): Game[] {
    return this.gamesSubject.getValue();
  }

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): User[] {
    return this.usersSubject.getValue();
  }
}