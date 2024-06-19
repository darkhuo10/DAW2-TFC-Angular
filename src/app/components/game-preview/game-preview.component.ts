import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.services';
import { AuthService } from '../../services/auth.services';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrl: './game-preview.component.scss'
})
export class GamePreviewComponent {
  
  loading = false;
  errorMessage = '';
  isAdminUser = false;

  @Input() game!: Game;

  constructor(
    private router: Router,
    private gameService: GameService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.checkToken();
    this.isAdminUser = this.authService.isAdmin();
  }
  @ViewChild('card')
  card!: ElementRef;
  @ViewChild('scrollIndicator')
  scrollIndicator!: ElementRef;

  ngAfterViewInit() {
    // Add a scroll event listener to the card
    this.card.nativeElement.addEventListener('scroll', () => {
      // Check if the card is scrolled
      if (this.card.nativeElement.scrollTop > 0) {
        // If scrolled, hide the scroll indicator
        this.scrollIndicator.nativeElement.style.display = 'none';
      } else {
        // If not scrolled, show the scroll indicator
        this.scrollIndicator.nativeElement.style.display = 'block';
      }
    });
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
          document.defaultView?.location.reload();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = 'Failed to delete the game.';
          console.error('Error deleting game:', err);
        }
      });
    }
  }

  formattedDescription() {
    let description = this.game.description
    return description.trim().length > 180 ? description.trim().substring(0, 180).trimEnd() + "..." : description;
  }

  isAdmin() {
    return this.isAdminUser;
  }

  checkVisible() {
    return this.game.visible;
  }
}