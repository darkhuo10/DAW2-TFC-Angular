import { Component, OnInit } from '@angular/core';
import { User, UserDtoUpdate } from '../../models/user.model';
import { UserService } from '../../services/user.services';
import { AuthService } from '../../services/auth.services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  hidePassword: boolean = true;
  togglePassword(): void {
      this.hidePassword = !this.hidePassword;
  }
  user!: User; 
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getCurrentUser().subscribe(
      (userData: User) => {
        this.user = userData;
        this.user.birthdate = this.formatDate(this.user.birthdate);
        this.userService.getUserPfp(this.user.id).subscribe(response => {
          // Si la respuesta contiene la url (no es el caso, pero está puesto así por escalabilidad,
          // por si en un futuro el back puede devolver imágenes de internet en vez de las que están subidas).
          if (typeof response === 'string') {
            this.user.profilePicture = response;
          } else {
            // Entra aquí si la imagen ha sido enviada como blob
            const reader = new FileReader();
            reader.onload = () => {
              // setea la mainImage a la url de la imagen (o su representación en base64)
              this.user.profilePicture = reader.result as string;
            };
            // leemos la response.
            reader.readAsDataURL(response);
          }
        });
        console.log(this.user);

      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
    
  }

  selectImage(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.user.profilePicture = e.target.result;
      };

      reader.readAsDataURL(file);
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
  }
}
