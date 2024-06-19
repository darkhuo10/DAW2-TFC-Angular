import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.services';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit{
  @Input() game!: Game;
  images: string[] = [];
  currentIndex = 0;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getImages(this.game.game_showcase_images);
  }

  getImages(showcaseImages: string[]) {
    if (showcaseImages.length > 0) {
      showcaseImages.forEach(image => {
        this.gameService.getShowcaseImage(image).subscribe(
          (blob: Blob) => {
            this.images.push(URL.createObjectURL(blob));
          },
          (error) => {
            console.error('Error fetching image:', error);
          }
        );
      });
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex === 0) ? (this.images.length - 1) : (this.currentIndex - 1);
  }
  
  next() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : (this.currentIndex + 1);
  }
  
}
