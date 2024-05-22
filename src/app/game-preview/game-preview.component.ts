import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrl: './game-preview.component.scss'
})
export class GamePreviewComponent {
  @Input() game!: { 
    id: string,
    name: string, 
    description: string, 
    imageUrl: string, 
    price: number, 
    rating: number 
  };

  constructor(private router: Router){}
  redirectToDetails(){
    this.router.navigate(['/game', this.game.id]);
  }

}
