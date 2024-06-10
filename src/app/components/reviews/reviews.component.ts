import { Component, OnInit } from '@angular/core';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { ActivatedRoute } from '@angular/router';

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
    private reviewService: ReviewService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
    });
    this.reviewService.getAllFromGame(this.gameId).subscribe({
      next: (response) => {
        this.reviews = response
      },
      error: (err) => {
        console.error('Error fetching reviews', err);
      }
    });
  }
}
