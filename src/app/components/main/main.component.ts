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
    this.authService.checkToken();
    this.isAdminUser = this.authService.isAdmin();
    this.getGames();
  }

  getGames(): void {
    this.gameService.getAllGames(true).subscribe((data) => {
      this.games = data;
      this.gameIndexes = Array.from({ length: this.games.length }, (_, i) => i);
      this.games.forEach((game, index) => {
        this.gameService.getMainImage(game.id).subscribe((response) => {
          // Assuming response contains the URL of the main image
          if (typeof response === 'string') {
            this.games[index].mainImage = response;
          } else {
            // Handle the case where response is a Blob (image data), convert it to a URL or base64 string
            const reader = new FileReader();
            reader.onload = () => {
              // Assuming reader.result contains the data URL or base64 string
              this.games[index].mainImage = reader.result as string;
            };
            reader.readAsDataURL(response);
          }
        });
      });
    });
  }
}