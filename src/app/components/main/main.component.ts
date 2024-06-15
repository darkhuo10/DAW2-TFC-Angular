import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.services';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  games: Game[] = [];
  gameIndexes: number[] = [];
  isAdminUser = false;
  currentUrl!: string;
  typeOfPreview = 'home';

  constructor(
    private gameService: GameService, 
    private wishlistService: WishlistService,
    private libraryService: LibraryService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkToken();
    this.isAdminUser = this.authService.isAdmin();
    this.currentUrl = this.router.url;
    this.getGames();
  }

  getGames(): void {
    let call: Observable<any>
    switch (this.currentUrl) {
      case "/library": {
        call = this.libraryService.getAllGames(this.authService.getCurrentUser());
        this.typeOfPreview = "library";
        break;
      }
      case "/wishlist": {
        call = this.wishlistService.getAllGames(this.authService.getCurrentUser());
        this.typeOfPreview = "wishlist";
        break;
      }
      default: {
        call = this.gameService.getAllGames({"visible": true})
      }
    }
    call.subscribe((data) => {
      this.games = data;
      this.gameIndexes = Array.from({ length: this.games.length }, (_, i) => i);
      this.games.forEach((game, index) => {
        this.gameService.getMainImage(game.id).subscribe((response) => {
          // Si la respuesta contiene la url (no es el caso, pero está puesto así por escalabilidad,
          // por si en un futuro el back puede devolver imágenes de internet en vez de las que están subidas).
          if (typeof response === 'string') {
            this.games[index].mainImage = response;
          } else {
            // Entra aquí si la imagen ha sido enviada como blob
            const reader = new FileReader();
            reader.onload = () => {
              // setea la mainImage a la url de la imagen (o su representación en base64)
              this.games[index].mainImage = reader.result as string;
            };
            // leemos la response.
            reader.readAsDataURL(response);
          }
        });
      });
    });
  }
}