import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating: number = 0; 
  @Input() disabled: boolean = false;

  stars: number[] = Array.from({ length: 5 }, (_, i) => i + 1);

  updateRating(star: number): void {
    if (!this.disabled) {
      if (this.rating === star) {
        this.rating = 0;
      } else {
        this.rating = star;
      }
    }
  }
}
