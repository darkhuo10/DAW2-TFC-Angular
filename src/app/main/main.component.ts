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
    { 
      name: 'Game 5', 
      description: 'Description for Game 5', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 19.99, 
      rating: 4.5 
    },
    { 
      name: 'Game 6', 
      description: 'Description for Game 6', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 29.99, 
      rating: 4.8 
    },
    { 
      name: 'Game 7', 
      description: 'Description for Game 7', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 45.50, 
      rating: 2.3 
    },
    { 
      name: 'Game 8', 
      description: 'Description for Game 8', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 0.99, 
      rating: 3.8 
    },{ 
      name: 'Game 9', 
      description: 'Description for Game 9', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 19.99, 
      rating: 4.5 
    },
    { 
      name: 'Game 10', 
      description: 'Description for Game 10', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 29.99, 
      rating: 4.8 
    },
    { 
      name: 'Game 12', 
      description: 'Description for Game 12', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 45.50, 
      rating: 2.3 
    },
    { 
      name: 'Game 13', 
      description: 'Description for Game 13', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 0.99, 
      rating: 3.8 
    },{ 
      name: 'Game 14', 
      description: 'Description for Game 14', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 19.99, 
      rating: 4.5 
    },
    { 
      name: 'Game 15', 
      description: 'Description for Game 15', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 29.99, 
      rating: 4.8 
    },
    { 
      name: 'Game 16', 
      description: 'Description for Game 16', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 45.50, 
      rating: 2.3 
    },
    { 
      name: 'Game 17', 
      description: 'Description for Game 17', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 0.99, 
      rating: 3.8 
    },
    { 
      name: 'Game 18', 
      description: 'Description for Game 18', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 29.99, 
      rating: 4.8 
    },
    { 
      name: 'Game 19', 
      description: 'Description for Game 19', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 45.50, 
      rating: 2.3 
    },
    { 
      name: 'Game 20', 
      description: 'Description for Game 20', 
      imageUrl: './assets/img/vgamestore_logo_blue.svg', 
      price: 0.99, 
      rating: 3.8 
    }
  ];

  // Generating an array of numbers from 0 to the length of games array
  gameIndexes: number[] = Array.from({ length: this.games.length }, (_, i) => i);
}
