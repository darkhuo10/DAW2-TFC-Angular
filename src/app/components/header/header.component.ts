import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.services';
import { SharedService } from '../../services/shared.service';
import { Game } from '../../models/game.model';
import { Observable } from 'rxjs';
import { LibraryService } from '../../services/library.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.services';
import { UserService } from '../../services/user.services';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

// hooks order
export class HeaderComponent {
  logo = "assets/img/vgamestore_logo_white.svg";
  usersActive = true;
  @ViewChild('filterText') filterText!: ElementRef;

  constructor(
    private router: Router,
    private gameService: GameService,
    private sharedService: SharedService,
    private libraryService: LibraryService,
    private wishlistService: WishlistService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  checkUrl(): boolean {
    const url = this.router.url;
    return url == "/home" || url == "/wishlist" || url == "/library";
  }

  isUserUrl(): boolean {
    return this.router.url == "/users";
  }

  switchUserActivity(): void {
    this.usersActive = !this.usersActive;
    this.filter();
  }

  filter(): void {
    let call: Observable<any>
    switch (this.router.url) {
      case "/library": {
        call = this.libraryService.getAllGames(this.authService.getCurrentUser());
        break;
      }
      case "/wishlist": {
        call = this.wishlistService.getAllGames(this.authService.getCurrentUser());
        break;
      }
      case "/users": {
        call = this.userService.getUsers(this.usersActive);
        break;
      }
      default: {
        call = this.gameService.getAllGames({"visible": true})
      }
    }

    if (this.router.url != '/users') {
      call.subscribe((games: Game[]) => {
        const filteredGames = games.filter(game => 
          game.name.toLowerCase().includes((this.filterText.nativeElement != null) 
          ? this.filterText.nativeElement.value.toLowerCase() : ''));
        this.sharedService.setGames(filteredGames);
      });
    }
    else {
      call.subscribe((users: User[]) => {
        const filteredUsers = users.filter(user => 
          user.username.toLowerCase().includes((this.filterText.nativeElement != null)
          ? this.filterText.nativeElement.value.toLowerCase() : ''));
        this.sharedService.setUsers(filteredUsers);
      });
    }
  }
}
