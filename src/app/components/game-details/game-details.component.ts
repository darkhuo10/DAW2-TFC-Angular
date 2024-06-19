import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.services';
import { Game, GameDtoUpdate } from '../../models/game.model';
import { AuthService } from '../../services/auth.services';
import { WishlistService } from '../../services/wishlist.service';
import { formatLongDate } from '../utils/utils';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameId!: string;
  game!: Game;
  errorMessage: string = '';
  isAdminUser = false;
  selectedFile!: File;
  selectedImage!: File;
  selectedShowcaseImages: File[] = [];
  isInWishlist = false;
  buttonWishlist: HTMLElement | null = null;
  fileInput: HTMLElement | null = null;
  imgInput: HTMLElement | null = null;
  imgElement: HTMLElement | null = null;
  @ViewChild('showcaseInput') showcaseInput!: ElementRef;

  gameGenresPEditElement: HTMLParagraphElement | null = null;
  gameLanguagesPEditElement: HTMLParagraphElement | null = null;
  gameGenresPElement: HTMLParagraphElement | null = null;
  gameLanguagesPElement: HTMLParagraphElement | null = null;
  gameGenresSelectElement: HTMLSelectElement | null = null;
  gameLanguagesSelectElement: HTMLSelectElement | null = null;
  gameTitleElement: HTMLHeadingElement | null = null;
  gamePriceElement: HTMLHeadingElement | null = null;
  gameDescriptionElement: HTMLParagraphElement | null = null;
  gameDeveloperElement: HTMLParagraphElement | null = null;
  gamePublisherElement: HTMLParagraphElement | null = null;
  gameTitleEditElement: HTMLInputElement | null = null;
  gamePriceEditElement: HTMLInputElement | null = null;
  gameDescriptionEditElement: HTMLTextAreaElement | null = null;
  gameDeveloperEditElement: HTMLParagraphElement | null = null;
  gamePublisherEditElement: HTMLParagraphElement | null = null;
  gameDeveloperEditInputElement: HTMLInputElement | null = null;
  gamePublisherEditInputElement: HTMLInputElement | null = null;
  buttonEditElement: HTMLElement | null = null;
  modoEdit = false;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute, 
    private gameService: GameService,
    private authService: AuthService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.authService.checkToken();
    this.buttonWishlist = document.getElementById('buttonWishlist');
    this.fileInput = document.getElementById('fileInput');
    this.imgInput = document.getElementById('imgInput');
    this.imgElement = document.getElementById('imgElement');
    this.isAdminUser = this.authService.isAdmin();
    if (this.isAdminUser) this.imgElement?.classList.add("hoverable");
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('id')!;
      this.getGame();
    });
    this.wishlistService.isInWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        this.isInWishlist = response.exists
      }
    });

    this.gameTitleElement = document.getElementById('game-title') as HTMLHeadingElement;
    this.gamePriceElement = document.getElementById('game-price') as HTMLHeadingElement;
    this.gameDescriptionElement = document.getElementById('game-description') as HTMLParagraphElement;
    this.gameDeveloperElement = document.getElementById('game-developer') as HTMLParagraphElement;
    this.gamePublisherElement = document.getElementById('game-publisher') as HTMLParagraphElement;
    this.gameTitleEditElement = document.getElementById('game-title-edit') as HTMLInputElement;
    this.gamePriceEditElement = document.getElementById('game-price-edit') as HTMLInputElement;
    this.gameDescriptionEditElement = document.getElementById('game-description-edit') as HTMLTextAreaElement;
    this.gameDeveloperEditElement = document.getElementById('game-developer-edit') as HTMLParagraphElement;
    this.gamePublisherEditElement = document.getElementById('game-publisher-edit') as HTMLParagraphElement;
    this.gameDeveloperEditInputElement = document.getElementById('game-developer-edit-input') as HTMLInputElement;
    this.gamePublisherEditInputElement = document.getElementById('game-publisher-edit-input') as HTMLInputElement;
    this.gameGenresPElement = document.getElementById('game-genres') as HTMLParagraphElement;
    this.gameLanguagesPElement = document.getElementById('game-languages') as HTMLParagraphElement;
    this.gameGenresPEditElement = document.getElementById('game-genres-edit-p') as HTMLParagraphElement;
    this.gameLanguagesPEditElement = document.getElementById('game-languages-edit-p') as HTMLParagraphElement;
    this.gameGenresSelectElement = document.getElementById('game-genres-edit-select') as HTMLSelectElement;
    this.gameLanguagesSelectElement = document.getElementById('game-languages-edit-select') as HTMLSelectElement;

    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.buttonEditElement = document.getElementById('button-edit');

    this.gameService.getGenres().subscribe({
      next: (response: string[]) => {
        response.forEach(genre => {
          let option = document.createElement('option');
          option.value = genre;
          option.textContent = genre;
          this.gameGenresSelectElement!.appendChild(option);
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
          this.gameLanguagesSelectElement!.appendChild(option);
        })
      },
      error: (err) => {
        this.errorMessage = 'Failed to get languages.';
        console.error('Error get languages:', err);
      }
    });
  }

  openFileDialog(): void {
    this.fileInput?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.upload();
    }
  }

  upload(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'No file selected.';
      console.error(this.errorMessage);
      return;
    }

    this.gameService.uploadGameFile(this.gameId, this.selectedFile).subscribe({
      next: () => {},
      error: (err) => {
        this.errorMessage = 'Failed to upload the game.';
        console.error('Error upload game:', err);
      }
    });
  }

  download(): void {
    this.router.navigate(['/download', this.game.id]);
  }

  toggleWishlist(): void {
    this.wishlistService.isInWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        // si "exists" es igual a true, lo quita de la wishlist. Si no, lo añade.
        response.exists ? 
        this.removeFromWishlist() : 
        this.addToWishlist();
      },
      error: (err) => {
        this.errorMessage = 'Failed to determine if the game is in the wishlist. '+
        'Either the user or the game do not exist.';
        console.error('Error determining if the game is in the wishlist:', err);
      }
    });
  }

  addToWishlist(): void {
    this.wishlistService.addToWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        if (this.buttonWishlist) {
          this.buttonWishlist.innerText = 'Remove from Wishlist'
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to determine if the game is in the wishlist. '+
        'Either the user or the game do not exist.';
        console.error('Error determining if the game is in the wishlist:', err);
      }
    });
  }

  removeFromWishlist(): void {
    this.wishlistService.removeFromWishlist(this.authService.getCurrentUser(), this.gameId).subscribe({
      next: (response) => {
        if (this.buttonWishlist) {
          this.buttonWishlist.innerText = 'Add to Wishlist'
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to determine if the game is in the wishlist. '+
        'Either the user or the game do not exist.';
        console.error('Error determining if the game is in the wishlist:', err);
      }
    });
  }

  getGame(): void {
    this.gameService.getGameById(this.gameId).subscribe((game: Game) => {
      this.game = game;
      this.gameService.getMainImage(game.id).subscribe((response) => {
        if (typeof response === 'string') {
          this.game.mainImage = response;
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            this.game.mainImage = reader.result as string;
          };
          reader.readAsDataURL(response);
        }
      });
    });
  }
  
  formatDate(date: string) {
    return formatLongDate(date);
  }

  formatSells(sells: number) {
    // Si es mayor a un millon de ventas, lo expresa como X.XM (ej: 1.2M o 3M)
    if (sells >= 1_000_000) {
      let millions = sells / 1_000_000
      let formatted = millions.toFixed(1)
      if (formatted.endsWith('.0')) { return `${Math.floor(millions)}M` }
      return `${formatted}M`
    }
    // Si llega hasta aquí es que es menor a 1M, por lo que lo expresará como
    // X.Xk (ej: 25.8k o 300k)
    if (sells >= 1_000) {
      let thousands = sells / 1_000
      let formatted = thousands.toFixed(1)
      if (formatted.endsWith('.0')) { return `${Math.floor(thousands)}k`}
      return `${formatted}k`
    }
    // Por último, si llega hasta aquí es que es menos de 1k, por lo que lo devuelve tal cual.
    return sells
  }

  changeImage() {
    this.imgInput?.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (!this.selectedImage) {
      this.errorMessage = 'No image selected.';
      console.error(this.errorMessage);
      return;
    }

    // Primero actualizamos la imagen
    this.gameService.uploadMainImage(this.gameId, this.selectedImage).subscribe({
      next: (response) => {
        // Y si el servidor nos responde true (que significa que la ha actualizado bien)
        if (response == true) {
          // Buscamos la imagen actualizada.
          this.gameService.getMainImage(this.gameId).subscribe({
            next: (imageResponse) => {
              // este if/else es el mismo que el de main.component.ts
              if (typeof imageResponse === 'string') {
                this.game.mainImage = imageResponse;
              } else {
                const reader = new FileReader();
                reader.onload = () => {
                  this.game.mainImage = reader.result as string;
                };
                reader.readAsDataURL(imageResponse);
              }

              // ESTA LÍNEA ES IMPORTANTÍSIMA, SIN ELLA, NO SE ACTUALIZARÁ LA IMAGEN PORQUE 
              // COGERÁ LA QUE HAY EN LA CACHÉ DEL NAVEGADOR, PESE A QUE EN EL SERVIDOR SÍ 
              // SE ACTUALICE CORRECTAMENTE.
              this.cdr.detectChanges();
            },
            error: (err) => {
              this.errorMessage = 'Failed to get image.';
              console.error('Error getting image:', err);
            }
          });
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to upload image.';
        console.error('Error uploading image:', err);
      }
    });
  }

  editar() {
    this.gameTitleElement!.hidden = true;
    this.gamePriceElement!.hidden = true;
    this.gameDescriptionElement!.hidden = true;
    this.gameDeveloperElement!.hidden = true;
    this.gamePublisherElement!.hidden = true;
    this.gameGenresPElement!.hidden = true;
    this.gameLanguagesPElement!.hidden = true;
    this.gameTitleEditElement!.hidden = false;
    this.gamePriceEditElement!.hidden = false;
    this.gameDescriptionEditElement!.hidden = false;
    this.gameDeveloperEditElement!.hidden = false;
    this.gamePublisherEditElement!.hidden = false;
    this.gameGenresPEditElement!.hidden = false;
    this.gameLanguagesPEditElement!.hidden = false;
    this.gameDeveloperEditElement!.classList.add("container-input");
    this.gamePublisherEditElement!.classList.add("container-input");
    this.gameGenresPEditElement!.classList.add("container-input");
    this.gameLanguagesPEditElement!.classList.add("container-input");

    this.modoEdit = true;
  }

  guardar() {
    let dto = new GameDtoUpdate(
      this.gameTitleEditElement!.value,
      this.gameDeveloperEditInputElement!.value,
      this.gamePublisherEditInputElement!.value,
      this.gameDescriptionEditElement!.value,
      parseFloat(this.gamePriceEditElement!.value),
      Array.from(this.gameGenresSelectElement!.selectedOptions).map(option => option.textContent || ''),
      Array.from(this.gameLanguagesSelectElement!.selectedOptions).map(option => option.textContent || '')
    )

    this.gameService.updateGame(this.gameId, dto).subscribe({
      next: () => {
        document.defaultView?.location.reload();
      },
      error: (err) => {
        this.errorMessage = 'Failed to upload the game.';
        console.error('Error upload game:', err);
      }
    });

    this.gameTitleElement!.hidden = false;
    this.gamePriceElement!.hidden = false;
    this.gameDescriptionElement!.hidden = false;
    this.gameDeveloperElement!.hidden = false;
    this.gamePublisherElement!.hidden = false;
    this.gameGenresPElement!.hidden = false;
    this.gameLanguagesPElement!.hidden = false;
    this.gameTitleEditElement!.hidden = true;
    this.gamePriceEditElement!.hidden = true;
    this.gameDescriptionEditElement!.hidden = true;
    this.gameDeveloperEditElement!.hidden = true;
    this.gamePublisherEditElement!.hidden = true;
    this.gameGenresPEditElement!.hidden = true;
    this.gameLanguagesPEditElement!.hidden = true;
    this.gameDeveloperEditElement!.classList.remove("container-input");
    this.gamePublisherEditElement!.classList.remove("container-input");
    this.gameGenresPEditElement!.classList.remove("container-input");
    this.gameLanguagesPEditElement!.classList.remove("container-input");

    this.modoEdit = false;
  }

  validatePrice(event: Event): void {
    let input = event.target as HTMLInputElement;
    let value = input.value;
    let pattern = /^(?!0\.00)\d+(\.\d{1,2})?$/;

    if (!pattern.test(value)) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
    this.checkButtonSaveValidity();
  }

  validateLength(event: Event, min: number, max: number): void {
    let input = event.target as HTMLInputElement;
    let value = input.value;
    if (value.length < min || value.length > max) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
    this.checkButtonSaveValidity();
  }

  validateLengthTextArea(event: Event, min: number, max: number): void {
    let input = event.target as HTMLTextAreaElement;
    let value = input.value;
    if (value.length < min || value.length > max) {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
    this.checkButtonSaveValidity();
  }

  checkButtonSaveValidity(): void {
    if ((this.gameTitleEditElement?.classList.contains("invalid") ||
    this.gamePriceEditElement?.classList.contains("invalid") ||
    this.gameDescriptionEditElement?.classList.contains("invalid") ||
    this.gameDeveloperEditInputElement?.classList.contains("invalid") ||
    this.gamePublisherEditInputElement?.classList.contains("invalid")) && this.modoEdit) {

      this.buttonEditElement!.setAttribute("disabled", "true");
    }
    else {
      this.buttonEditElement!.removeAttribute("disabled");
    }
  }

  isAdmin() {
    return this.isAdminUser;
  }

  openShowcaseImageSelector() {
    this.showcaseInput.nativeElement.click();
  }

  onShowcaseSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        // Se supone que el input solo acepta archivos que sean imágenes
        /*const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'avif', 'bmp', 'webp'];

        if (fileExtension && validImageExtensions.includes(fileExtension)) {*/
          // Si todo está correcto, añadimos la imagen a la lista de showcaseImages.
          this.selectedShowcaseImages.push(file);
        //}
      }

      this.gameService.uploadShowcaseImages(this.game.id, this.selectedShowcaseImages).subscribe(
        (response) => {
          this.selectedShowcaseImages = [];
          this.cdr.detectChanges();
          document.defaultView?.location.reload();
        },
        (error) => {
          this.selectedShowcaseImages = [];
        }
      );
    }
  }

  deleteShowcaseImages(): void {
    this.gameService.clearShowcaseImages(this.game.id).subscribe(
      (response) => {
        this.selectedShowcaseImages = [];
        this.cdr.detectChanges();
        document.defaultView?.location.reload();
      },
      (error) => {
        this.selectedShowcaseImages = [];
      }
    );;
  }
}
