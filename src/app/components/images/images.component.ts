import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.services';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit{
  @Input() gameId! :string;
  images: string[] = [];
  currentIndex = 0;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    const name = `${this.gameId}-showcase1.jpg`; // Replace with actual name or identifier
    this.getImages(name);
  }

  getImages(name: string) {
    this.images.push("./assets/img/vgamestore_logo_blue.svg", "./assets/img/vgamestore_logo_white.svg");
    this.gameService.getShowcaseImage(name).subscribe(
      (blob: Blob) => {
        const imageUrl = URL.createObjectURL(blob);
        this.images.push(imageUrl);
      },
      (error) => {
        console.error('Error fetching images:', error);
      }
    );
  }

  prev() {
    this.currentIndex = (this.currentIndex === 0) ? (this.images.length - 1) : (this.currentIndex - 1);
  }
  
  next() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : (this.currentIndex + 1);
  }
  
}
