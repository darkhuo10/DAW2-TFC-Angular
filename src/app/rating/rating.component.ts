import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'] 
})
export class RatingComponent {
  @Input() rating: number = 0; 

  stars: number[] = Array.from({ length: 5 }, (_, i) => i + 1);

  
}
