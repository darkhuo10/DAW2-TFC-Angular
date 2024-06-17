import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.services';
import { AuthService } from '../../services/auth.services';

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
  /*= {
    id: '1',
    profilePicture: './assets/img/vgamestore_logo_blue.svg',
    username: 'darkhuo10',
    email: 'darkhuoyt@gmail.com',
    name: 'Marina',
    surname: 'Pintado',
    role: 'ADMIN',
    birthdate: '2003-12-10',
    active: true
  };*/
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getCurrentUser().subscribe(
      (userData: User) => {
        this.user = userData;
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
}
