import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    { 
      user: 'User 1', 
      review: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem alias ab iusto nemo, optio harum facilis rem esse ullam consequatur nobis, odit, similique a repudiandae labore. Iusto illo blanditiis praesentium!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem alias ab iusto nemo, optio harum facilis rem esse ullam consequatur nobis, odit, similique a repudiandae labore. Iusto illo blanditiis praesentium!', 
      rating: 2.3,
      userImageUrl: './assets/img/vgamestore_logo_white.svg'
    },
    { 
      user: 'User 2', 
      review: '', 
      rating: 5,
      userImageUrl: './assets/img/vgamestore_logo_white.svg'
    }
  ];
  
  reviewIndexes: number[] = Array.from({ length: this.reviews.length }, (_, i) => i);
}
