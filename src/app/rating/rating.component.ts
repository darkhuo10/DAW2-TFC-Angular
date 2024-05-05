import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'] // Fixed typo here
})
export class RatingComponent {
  @Input() rating: number = 0; // Initialize with default value
  
  stars: number[] = Array.from({ length: 5 }, (_, i) => i + 1);
}
