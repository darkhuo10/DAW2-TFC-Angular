import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.services';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  games: Game[] = [];
  gameIndexes: number[] = [];
  isAdminUser = false;

  constructor(private gameService: GameService, private authService: AuthService) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('token'))
    this.authService.checkToken();
    this.isAdminUser = this.authService.isAdmin();
    this.getGames();
  }

  getGames(): void {
    this.gameService.getAllGames({"visible": true}).subscribe((data) => {
      this.games = data;
      this.gameIndexes = Array.from({ length: this.games.length }, (_, i) => i);
      this.games.forEach((game, index) => {
        this.gameService.getMainImage(game.id).subscribe((response) => {
          // Si la respuesta contiene la url (no es el caso, pero está puesto así por escalabilidad,
          // por si en un futuro el back puede devolver imágenes de internet en vez de las que están subidas).
          if (typeof response === 'string') {
            console.log("entra en main.component if")
            this.games[index].mainImage = response;
          } else {
            console.log("entra en main.component else")
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