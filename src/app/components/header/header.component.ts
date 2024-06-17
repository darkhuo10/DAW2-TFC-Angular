import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.services';
import { SharedService } from '../../services/shared.service';
import { Game } from '../../models/game.model';
import { Observable } from 'rxjs';
import { LibraryService } from '../../services/library.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

// hooks order
export class HeaderComponent {
  logo = "assets/img/vgamestore_logo_white.svg";
  @ViewChild('filterText') filter!: ElementRef;

  constructor(
    private router: Router,
    private gameService: GameService,
    private sharedService: SharedService,
    private libraryService: LibraryService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  checkUrl(): boolean {
    const url = this.router.url;
    let x = url == "/home" || url == "/wishlist" || url == "/library";
    return x;
  }

  filterGames(): void {
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
      default: {
        call = this.gameService.getAllGames({"visible": true})
      }
    }
    call.subscribe((games: Game[]) => {
      const filteredGames = games.filter(game => 
        game.name.toLowerCase().includes((this.filter.nativeElement != null) ? this.filter.nativeElement.value.toLowerCase() : ''));
      this.sharedService.setGames(filteredGames);
    });
  }
}
