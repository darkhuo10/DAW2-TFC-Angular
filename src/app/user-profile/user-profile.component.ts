import { Component } from '@angular/core';

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
  user = {
    id: '1',
    imageUrl: './assets/img/vgamestore_logo_blue.svg',
    username: 'darkhuo10',
    email: 'darkhuoyt@gmail.com',
    firstName: 'Marina',
    lastName: 'Pintado',
    role: 'ADMIN',
    birthday: '12/12/2003',
    password: '123456'
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
        this.user.imageUrl = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
  /*formatDate(date: string): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }*/

}
