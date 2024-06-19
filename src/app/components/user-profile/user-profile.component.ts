import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { User, UserDtoUpdate } from '../../models/user.model';
import { UserService } from '../../services/user.services';
import { AuthService } from '../../services/auth.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user!: User;
  form: FormGroup;
  maxDate!: string;
  selectedImage: File | null = null;
  @ViewChild('imgInput') imgInput!: ElementRef;
  @ViewChild('imgPreview') imgPreview!: ElementRef;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(2), Validators.maxLength(99)]],
      surname: ['', [Validators.minLength(5), Validators.maxLength(99)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(99)]],
      birthdate: [''],
    });

    let now = new Date();
    now.setFullYear(now.getFullYear() - 18);
    this.maxDate = now.toISOString().split('T')[0];

    this.getUser();
  }

  getUser(): void {
    this.userService.getCurrentUser().subscribe(
      (userData: User) => {
        this.user = userData;
        this.user.birthdate = this.formatDate(this.user.birthdate);
        
        this.form.get('birthdate')?.setValue(this.user.birthdate);
        this.form.get('name')?.setValue(this.user.name);
        this.form.get('surname')?.setValue(this.user.surname);

        this.userService.getUserPfp(this.user.id).subscribe(response => {
          // Si la respuesta contiene la url (no es el caso, pero está puesto así por escalabilidad,
          // por si en un futuro el back puede devolver imágenes de internet en vez de las que están subidas).
          if (typeof response === 'string') {
            this.imgPreview.nativeElement.src = response;
          } else {
            // Entra aquí si la imagen ha sido enviada como blob
            const reader = new FileReader();
            reader.onload = () => {
              // setea la mainImage a la url de la imagen (o su representación en base64)
              this.imgPreview.nativeElement.src = reader.result as string;
            };
            // leemos la response.
            reader.readAsDataURL(response);
          }
        });

      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
    
  }

  selectImage(): void {
    this.imgInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file;

      // Actualizamos la preview de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview.nativeElement.src = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.userService.uploadPfp(this.user.id, file).subscribe(
        (response) => {
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error updating profile picture:', error);
        }
      );
    }
  }

  // Formatea la fecha, getMonth + 1 porque obtiene números de 0 a 11
   formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${this.padZero(d.getMonth() + 1)}-${this.padZero(d.getDate())}`;
  }
  
  // Completa con 0 así el mes y el día siempre tienen 2 dígitos
  padZero(num: number): string {
    return (num < 10? '0' : '') + num;
  }

  logout(): void {
    this.authService.logout();
  }

  updateProfile(): void {
    if (this.form.invalid) {
      return;
    }

    const userDtoUpdate = new UserDtoUpdate(
      this.form.get('name')?.value,
      this.form.get('surname')?.value,
      this.form.get('password')?.value,
      this.form.get('birthdate')?.value
    );

    this.userService.updateUser(this.user.id, userDtoUpdate).subscribe(
      (response) => {
        document.defaultView?.location.reload();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}