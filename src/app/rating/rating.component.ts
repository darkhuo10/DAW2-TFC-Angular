import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  rating: number = 3.5; // Será sacado de la base de datos
  starRating = Math.round(this.rating);
  stars: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
}