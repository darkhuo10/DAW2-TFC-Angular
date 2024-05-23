import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-other-review',
  templateUrl: './other-review.component.html',
  styleUrl: './other-review.component.scss'
})
export class OtherReviewComponent {
  @Input() review!: { 
    user: string, 
    review: string, 
    rating: number 
    userImageUrl: string
  };
}
