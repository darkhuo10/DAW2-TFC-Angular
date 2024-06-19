import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.services';
import { GameDtoCreate } from '../../models/game.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrl: './new-game.component.scss'
})
export class NewGameComponent {
  form: FormGroup;
  errorMessage: string = '';
  maxDate = new Date().toISOString().split('T')[0];
  selectedImage: File | null = null;
  showcaseImages: File[] = [];
  @ViewChild('genres') selectGenres!: ElementRef;
  @ViewChild('languages') selectLanguages!: ElementRef;
  @ViewChild('imgInput') imgInput!: ElementRef;
  @ViewChild('showcaseInput') showcaseInput!: ElementRef;
  @ViewChild('imgPreview', { static: false }) imgPreview!: ElementRef<HTMLImageElement>;

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

      this.gameService.createGame(gameDtoCreate).subscribe(
        (response: any) => {
          if (this.selectedImage != null) {
            this.gameService.uploadMainImage(response.id, this.selectedImage).subscribe(
              (response: any) => {},
              (error: HttpErrorResponse) => {
                this.errorMessage = `[${error.status}] - ${error.message}`;
              }
            )

            this.gameService.uploadShowcaseImages(response.id, this.showcaseImages).subscribe(
              (response: any) => {},
              (error: HttpErrorResponse) => {
                this.errorMessage = `[${error.status}] - ${error.message}`;
              }
            )
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = `[${error.status}] - ${error.message}`;
        }
      );
    }
    else {
      this.errorMessage = "Invalid form."
    }
  }

  openImageDialog(): void {
    this.imgInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Si hay un archivo seleccionado, nos aseguramos que su extensión sea la de una imagen.
      const file = input.files[0];
      /*const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

      if (fileExtension && validImageExtensions.includes(fileExtension)) {*/
        // Si todo está correcto, añadimos la imagen a nuestra selectedImage
        this.selectedImage = file;

        // Y actualizamos la preview de la imagen
        const reader = new FileReader();
        reader.onload = () => {
          this.imgPreview.nativeElement.src = reader.result as string;
        };
        reader.readAsDataURL(file);
      //}
    }
  }

  openShowcaseDialog(): void {
    this.showcaseInput.nativeElement.click();
  }

  onShowcaseSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];

        if (fileExtension && validImageExtensions.includes(fileExtension)) {
          // Si todo está correcto, añadimos la imagen a la lista de showcaseImages.
          this.showcaseImages.push(file);
        }
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
