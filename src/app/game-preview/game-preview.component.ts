import { Component } from '@angular/core';

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrl: './game-preview.component.scss'
})
export class GamePreviewComponent {
  img = 'assets/img/vgamestore_logo_blue.svg';
  name = 'Game name';
  description = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa laborum amet consequuntur. Consequuntur quidem laudantium aperiam laborum numquam, eaque odio eius. Voluptatum, nostrum dolorem. Consequatur laborum voluptatem perspiciatis adipisci repellendus?';
  price = 0.00;
  rating = 'Will be the rating';

}
