import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input() review!: { 
    user: string, 
    review: string, 
    rating: number 
    userImageUrl: string
  };
}
