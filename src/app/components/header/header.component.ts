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

export class HeaderComponent {
  logo = "assets/img/vgamestore_logo_white.svg";
  active = true;
  @ViewChild('filterText') filterText!: ElementRef;
  @ViewChild('logoElement') logoElement!: ElementRef;

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
    return url == "/wishlist" || url == "/library";
  }

  isUserUrl(): boolean {
    const url = this.router.url;
    if (this.logoElement) {
      if ((url == "/home" && this.authService.isAdmin()) || url == "/users") { this.logoElement.nativeElement.classList.add("move-up"); }
      else { this.logoElement.nativeElement.classList.remove("move-up"); }
    }
    return url == "/home" || url == "/users";
  }

  checkAdmin() {
    return this.authService.isAdmin();
  }

  switchActivity(): void {
    this.active = !this.active;
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
        call = this.userService.getUsers(this.active);
        break;
      }
      default: {
        call = this.gameService.getAllGames({"visible": this.active})
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
