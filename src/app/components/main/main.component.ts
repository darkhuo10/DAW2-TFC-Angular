import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  games: Array <Game> = [
    { 
      id:'1',
      name: 'Game 1', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'2',
      name: 'Game 2', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'3',
      name: 'Game 3', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'4',
      name: 'Game 4', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'5',
      name: 'Game 5', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'6',
      name: 'Game 6', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'7',
      name: 'Game 7', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'8',
      name: 'Game 8', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'9',
      name: 'Game 9', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'10',
      name: 'Game 10', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'11',
      name: 'Game 12', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'12',
      name: 'Game 13', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'13',
      name: 'Game 14', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'14',
      name: 'Game 15', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'15',
      name: 'Game 16', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'16',
      name: 'Game 17', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'17',
      name: 'Game 18', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'18',
      name: 'Game 19', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
    { 
      id:'19',
      name: 'Game 20', 
      developer: '',
      publisher: '',
      genres: ['', ''],
      languages: ['', ''],
      description: 'Description for Game', 
      date: '',
      price: 19.99, 
      rating: 4.5,
      sellNumber: 10000,
      mainImage: './assets/img/vgamestore_logo_blue.svg',
      showcaseImages: ['', ''],
      file: '',
      visible: true
    },
  ];

  // Generating an array of numbers from 0 to the length of games array
  gameIndexes: number[] = Array.from({ length: this.games.length }, (_, i) => i);
}
