import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  starRating: number = 3; // Será sacado de la base de datos
  stars: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
}