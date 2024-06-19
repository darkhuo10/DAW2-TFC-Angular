import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  gameId!: string;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
    });
    this.reviewService.getAllFromGame(this.gameId).subscribe({
      next: (response) => {
        const currentUser = this.authService.getCurrentUser();
        this.reviews = response.sort((a, b) => {
          if (a.userId === currentUser) return -1;
          else if (b.userId === currentUser) return 1;
          else return 0;
        });
      },
      error: (err) => {
        console.error('Error fetching reviews', err);
      }
    });
  }
}
