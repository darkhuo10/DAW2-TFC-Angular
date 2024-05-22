// game-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameId!: string;
  bought: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
    });
  }
  
  isBought(): boolean {
    return this.bought;
  }

  game = {
    id: this.gameId,
    name: 'Game 1', 
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem alias ab iusto nemo, optio harum facilis rem esse ullam consequatur nobis, odit, similique a repudiandae labore. Iusto illo blanditiis praesentium!', 
    imageUrl: './assets/img/vgamestore_logo_blue.svg',
    genres:['aaa', 'bbb'], 
    price: 19.99, 
    rating: 4.5, 
    developer: 'asdas',
    publisher: 'djfhasdjk',
    releaseDate: '2020-10-21',
    sellNumber: 5234590,
    languages: ['ES', 'EN']
  }
  
}
