import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    { user: 'User 1', review: 'Review 1', rating: 2.3 },
    { user: 'User 2', review: 'Review 2', rating: 5 }
  ];
  
  reviewIndexes: number[] = Array.from({ length: this.reviews.length }, (_, i) => i);
}
