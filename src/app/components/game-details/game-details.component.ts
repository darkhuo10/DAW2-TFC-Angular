import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.services';
import { Game } from '../../models/game.model';
import { AuthService } from '../../services/auth.services';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameId!: string;
  game!: Game;
  errorMessage: string = '';
  isAdminUser = false;
  selectedFile!: File;
  
  constructor(
    private route: ActivatedRoute, 
    private gameService: GameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin();
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
      this.getGame();
    });
  }

  openFileDialog(): void {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.upload();
    }
  }

  upload(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'No file selected.';
      console.error(this.errorMessage);
      return;
    }

    this.gameService.uploadGameFile(this.game.id, this.selectedFile).subscribe({
      next: () => {},
      error: (err) => {
        this.errorMessage = 'Failed to upload the game.';
        console.error('Error upload game:', err);
      }
    });
  }

  download(): void {
      this.gameService.downloadGame(this.game.id).subscribe({
        next: (blob) => {
          saveAs(blob, `${this.game.name}`)
        },
        error: (err) => {
          this.errorMessage = 'Failed to download the game.';
          console.error('Error downloading game:', err);
        }
      });
  }

  toggleWishlist(): void {
    if (this.isInWishlist()) {
      // Remove from wishlist
      this.removeFromWishlist();
    } else {
      // Add to wishlist
      this.addToWishlist();
    }
  }

  isInWishlist(): boolean {
    // Logic to check if game is in wishlist (you need to implement this)
    // For example, you can check if the game's id is in an array of wishlist game ids
    return false; // Placeholder, replace with your logic
  }

  addToWishlist(): void {
    // Logic to add the game to the wishlist (you need to implement this)
    // For example, you can push the game's id into an array of wishlist game ids

  }

  removeFromWishlist(): void {
    // Logic to remove the game from the wishlist (you need to implement this)
    // For example, you can remove the game's id from an array of wishlist game ids
  }

  getGame(): void {
    this.gameService.getGameById(this.gameId).subscribe((game: Game) => {
      this.game = game;
      this.gameService.getMainImage(game.id).subscribe((response) => {
        // Assuming response contains the URL of the main image
        if (typeof response === 'string') {
          this.game.mainImage = response;
        } else {
          // Handle the case where response is a Blob (image data), convert it to a URL or base64 string
          const reader = new FileReader();
          reader.onload = () => {
            // Assuming reader.result contains the data URL or base64 string
            this.game.mainImage = reader.result as string;
          };
          reader.readAsDataURL(response);
        }
      });
    });
  } 

  isAdmin() {
    //return this.isAdminUser;
    return true;
  }
}
