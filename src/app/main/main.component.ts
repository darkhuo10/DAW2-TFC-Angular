import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  games: { 
    name: string, 
    description: string, 
    imageUrl: string, 
    price: number, 
    rating: number 
  }[] = [
    { 
      name: 'Game 1', 
      description: 'Description for Game 1', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 19.99, 
      rating: 4.5 
    },
    { 
      name: 'Game 2', 
      description: 'Description for Game 2', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 29.99, 
      rating: 4.8 
    },
    { 
      name: 'Game 3', 
      description: 'Description for Game 3', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 45.50, 
      rating: 2.3 
    },
    { 
      name: 'Game 4', 
      description: 'Description for Game 4', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 0.99, 
      rating: 3.8 
    },
  ];

  // Generating an array of numbers from 0 to the length of games array
  gameIndexes: number[] = Array.from({ length: this.games.length }, (_, i) => i);
}
