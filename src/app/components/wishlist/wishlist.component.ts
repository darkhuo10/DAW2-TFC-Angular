import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
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
    private wishlistService: WishlistService,
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
    this.card.nativeElement.addEventListener('scroll', () => {
      if (this.card.nativeElement.scrollTop > 0) {
        this.scrollIndicator.nativeElement.style.display = 'none';
      } else {
        this.scrollIndicator.nativeElement.style.display = 'block';
      }
    });
  }

  redirectToDetails(){
    this.router.navigate(['/game', this.game.id]);
  }

  removeFromWishlist(){
    this.loading = true;

    this.wishlistService.removeFromWishlist(this.authService.getCurrentUser(), this.game.id).subscribe({
      next: () => {
        this.loading = false;
        document.defaultView?.location.reload();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to remove the game from the wishlist.';
        console.error('Error removing game:', err);
      }
    });
  }

  formattedDescription() {
    let description = this.game.description
    return description.trim().length > 180 ? description.trim().substring(0, 180).trimEnd() + "..." : description;
  }

  isAdmin() {
    return this.isAdminUser;
  }
}
