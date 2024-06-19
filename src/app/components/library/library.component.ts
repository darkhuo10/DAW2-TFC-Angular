import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
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

  formattedDescription() {
    let description = this.game.description
    return description.trim().length > 180 ? description.trim().substring(0, 180).trimEnd() + "..." : description;
  }

  isAdmin() {
    return this.isAdminUser;
  }
}
