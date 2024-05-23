import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'] 
})
export class RatingComponent {
  @Input() rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit(): void { }

  getStarType(index: number): string {
    if (this.rating >= index + 1) {
      return 'filled';
    } else if (this.rating > index && this.rating < index + 1) {
      return 'half';
    } else {
      return 'label';
    }
  }

  
}
