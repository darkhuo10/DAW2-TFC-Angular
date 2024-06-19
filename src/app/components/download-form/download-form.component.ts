import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.services';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { Game } from '../../models/game.model';
import saveAs from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-download-form',
  templateUrl: './download-form.component.html',
  styleUrl: './download-form.component.scss'
})
export class DownloadFormComponent implements OnInit {
  gameId!: string;
  game!: Game;
  errorMessage: string = '';
  form: FormGroup;
  minDate = new Date().toISOString().split('T')[0];

  constructor(
    private router: Router,
    private http: HttpClient,
    private gameService: GameService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(99)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(99)]],
      creditCardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      expire: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
      this.getGame();
    });
  }

  completeDownload(): void {
    if (this.form.valid) {
      
      const UserDtoLogin = {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value
      };
  
      this.http.post('http://localhost:80/login', UserDtoLogin).subscribe(
        (response: any) => {
          if (response.user.id === this.authService.getCurrentUser()) {
            this.gameService.downloadGame(this.gameId, this.authService.getCurrentUser()).subscribe({
              next: (blob) => {
                saveAs(blob, `${this.game.name}`);
              },
              error: (err) => {
                this.errorMessage = 'Failed to download the game.';
                console.error('Error downloading game:', err);
              }
            });
            this.router.navigate(['/game', this.game.id]);
          }
          else {
            this.errorMessage = 'Incorrect credentials.';
          }
        },
        (error) => {
          this.errorMessage = 'Incorrect credentials.';
        }
      );
    }
    else {
      this.errorMessage = 'Invalid form.'
    }
  }

  cancelDownload(): void {
    this.router.navigate(['/game', this.game.id]);
  }

  getGame(): void {
    this.gameService.getGameById(this.gameId).subscribe((game: Game) => {
      this.game = game;
    });
  }
}
