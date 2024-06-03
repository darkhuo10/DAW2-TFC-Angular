import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrl: './game-preview.component.scss'
})
export class GamePreviewComponent {
  @Input() game!: Game;

  constructor(private router: Router){}
  redirectToDetails(){
    this.router.navigate(['/game', this.game.id]);
  }

}
