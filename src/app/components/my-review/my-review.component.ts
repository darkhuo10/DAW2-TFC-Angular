import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewDtoCreate } from '../../models/review.model';
import { AuthService } from '../../services/auth.services';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.scss']
})
export class MyReviewComponent implements OnInit {
  @ViewChild('satisfaction') ratingElement!: ElementRef<HTMLInputElement>;
  @ViewChild('comment') commentElement!: ElementRef<HTMLTextAreaElement>;
  gameId!: string
  errorMessage: string = '';
  rating = "2.0";

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
    });
  }
  
  onRatingChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = parseFloat(inputElement.value);
    this.rating = parsedValue === Math.floor(parsedValue) ? parsedValue + ".0" : parsedValue.toString();
  }

  saveData() {
    if (this.ratingElement.nativeElement.value && this.commentElement.nativeElement.value) {
      const review = new ReviewDtoCreate(
        this.gameId, 
        this.authService.getCurrentUser(),
        parseInt(this.ratingElement.nativeElement.value),
        this.commentElement.nativeElement.value
      );

      this.reviewService.createReview(review).subscribe({
        next: () => {
          document.defaultView?.location.reload();
        },
        error: (err) => {
          this.commentElement.nativeElement.value = '';
          this.commentElement.nativeElement.placeholder = 'You cannot leave a review of a game you have not downloaded.'
          this.errorMessage = 'Failed to upload the game.';
          console.error('Error upload game:', err);
        }
      });
    }
  }
}
