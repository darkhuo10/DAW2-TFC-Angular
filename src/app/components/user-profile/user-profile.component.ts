import { Component } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  hidePassword: boolean = true;
  togglePassword(): void {
      this.hidePassword = !this.hidePassword;
  }
  user: User = {
    id: '1',
    profilePicture: './assets/img/vgamestore_logo_blue.svg',
    username: 'darkhuo10',
    email: 'darkhuoyt@gmail.com',
    name: 'Marina',
    surname: 'Pintado',
    role: 'ADMIN',
    birthdate: '2003-12-10',
    active: true
  };
  
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
}
