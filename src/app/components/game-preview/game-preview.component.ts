import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.services';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrl: './game-preview.component.scss',
})
export class GamePreviewComponent {
  loading = false;
  errorMessage = '';
  isAdminUser = false;

  @Input() game!: {
    id: string,
    name: string, 
    description: string, 
    mainImage: string, 
    price: number, 
    rating: number 
  };

  constructor(
    private router: Router,
    private gameService: GameService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.isAdmin();
  }

  redirectToDetails(){
    this.router.navigate(['/game', this.game.id]);
  }

  deleteGame(){
    this.loading = true;

    if (this.isAdminUser) {
      this.gameService.deleteGame(this.game.id).subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Failed to delete the game.';
          console.error('Error deleting game:', err);
        }
      });
    }
  }

  isAdmin() {
    return this.isAdminUser;
  }

}