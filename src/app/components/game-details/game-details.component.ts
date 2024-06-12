import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.services';
import { Game } from '../../models/game.model';
import { AuthService } from '../../services/auth.services';
import { saveAs } from 'file-saver';
import { WishlistService } from '../../services/wishlist.service';
import { formatLongDate } from '../utils/utils';

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
  isInWishlist = false;
  buttonWishlist: HTMLElement | null = null;
  fileInput: HTMLElement | null = null
  
  constructor(
    private route: ActivatedRoute, 
    private gameService: GameService,
    private authService: AuthService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.authService.checkToken();
    this.buttonWishlist = document.getElementById('buttonWishlist');
    this.fileInput = document.getElementById('fileInput');
    this.isAdminUser = this.authService.isAdmin();
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
      this.getGame();
    });
    this.wishlistService.isInWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        this.isInWishlist = response.exists
      }
    });
  }

  openFileDialog(): void {
    this.fileInput?.click();
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

    this.gameService.uploadGameFile(this.gameId, this.selectedFile).subscribe({
      next: () => {},
      error: (err) => {
        this.errorMessage = 'Failed to upload the game.';
        console.error('Error upload game:', err);
      }
    });
  }

  download(): void {
    this.gameService.downloadGame(this.gameId, this.authService.getCurrentUser()).subscribe({
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
    this.wishlistService.isInWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        // si "exists" es igual a true, lo quita de la wishlist. Si no, lo añade.
        response.exists ? 
        this.removeFromWishlist() : 
        this.addToWishlist();
      },
      error: (err) => {
        this.errorMessage = 'Failed to determine if the game is in the wishlist. '+
        'Either the user or the game do not exist.';
        console.error('Error determining if the game is in the wishlist:', err);
      }
    });
  }

  addToWishlist(): void {
    this.wishlistService.addToWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        if (this.buttonWishlist) {
          this.buttonWishlist.innerText = 'Remove from Wishlist'
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to determine if the game is in the wishlist. '+
        'Either the user or the game do not exist.';
        console.error('Error determining if the game is in the wishlist:', err);
      }
    });
  }

  removeFromWishlist(): void {
    this.wishlistService.removeFromWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        if (this.buttonWishlist) {
          this.buttonWishlist.innerText = 'Add to Wishlist'
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to determine if the game is in the wishlist. '+
        'Either the user or the game do not exist.';
        console.error('Error determining if the game is in the wishlist:', err);
      }
    });
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
  
  formatDate(date: string) {
    return formatLongDate(date);
  }

  formatSells(sells: number) {
    // Si es mayor a un millon de ventas, lo expresa como X.XM (ej: 1.2M o 3M)
    if (sells >= 1_000_000) {
      let millions = sells / 1_000_000
      let formatted = millions.toFixed(1)
      if (formatted.endsWith('.0')) { return `${Math.floor(millions)}M` }
      return `${formatted}M`
    }
    // Si llega hasta aquí es que es menor a 1M, por lo que lo expresará como
    // X.Xk (ej: 25.8k o 300k)
    if (sells >= 1_000) {
      let thousands = sells / 1_000
      let formatted = thousands.toFixed(1)
      if (formatted.endsWith('.0')) { return `${Math.floor(thousands)}k`}
      return `${formatted}k`
    }
    // Por último, si llega hasta aquí es que es menos de 1k, por lo que lo devuelve tal cual.
    return sells
  }

  isAdmin() {
    return this.isAdminUser;
  }
}
