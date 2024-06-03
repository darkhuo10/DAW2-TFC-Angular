import { Component } from '@angular/core';

@Component({
  selector: 'app-my-review',
  templateUrl: './my-review.component.html',
  styleUrls: ['./my-review.component.scss']
})
export class MyReviewComponent {
  rating: string = "1.0"; // Initialize with string "1.0"
  
  onRatingChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = parseFloat(inputElement.value);
    this.rating = parsedValue === Math.floor(parsedValue) ? parsedValue + ".0" : parsedValue.toString();
  }
}
