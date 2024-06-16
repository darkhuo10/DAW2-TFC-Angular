import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.services';
import { GameDtoCreate } from '../../models/game.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss'
})
export class NewGameComponent {
  form: FormGroup;
  errorMessage: string = '';
  maxDate = new Date().toISOString().split('T')[0];
  @ViewChild('genres') selectGenres!: ElementRef;
  @ViewChild('languages') selectLanguages!: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private gameService: GameService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      developer: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      publisher: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      price: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d*(\.\d{0,2})?$/)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
      release: ['', Validators.required],
      languages: ['', Validators.required],
      genres: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.gameService.getGenres().subscribe({
      next: (response: string[]) => {
        response.forEach(genre => {
          let option = document.createElement('option');
          option.value = genre;
          option.textContent = genre;
          this.selectGenres.nativeElement.appendChild(option);
        })
      },
      error: (err) => {
        this.errorMessage = 'Failed to get genres.';
        console.error('Error get genres:', err);
      }
    });

    this.gameService.getLanguages().subscribe({
      next: (response: string[]) => {
        response.forEach(language => {
          let option = document.createElement('option');
          option.value = language;
          option.textContent = language;
          this.selectLanguages.nativeElement.appendChild(option);
        })
      },
      error: (err) => {
        this.errorMessage = 'Failed to get languages.';
        console.error('Error get languages:', err);
      }
    });
  }

  createGame(): void {
    if (this.form.valid) {
      console.log(this.form.get('release')?.value);
      const gameDtoCreate: GameDtoCreate = {
        name: this.form.get('name')?.value,
        developer: this.form.get('developer')?.value,
        publisher: this.form.get('publisher')?.value,
        genres: this.form.get('genres')?.value,
        languages: this.form.get('languages')?.value,
        description: this.form.get('description')?.value,
        release_date: this.form.get('release')?.value,
        price: this.form.get('price')?.value,
      }

      console.dir(gameDtoCreate)
      this.gameService.createGame(gameDtoCreate).subscribe(
        (response: any) => {
          console.log(response)
          console.dir(response)
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = `[${error.status}] - ${error.message}`;
        }
      )
    }
    else {
      this.errorMessage = "Invalid form."
    }
  }

  openImageDialog(): void {

  }

  onImageSelected(event: Event): void {

  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
