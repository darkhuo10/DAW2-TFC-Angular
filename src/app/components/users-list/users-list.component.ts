import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.services';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.authService.checkToken();
    if (!this.authService.isAdmin()) {
      // Si no somos administradores, como no podemos acceder 
      // a esta página, nos redireccionará a home.
      this.router.navigate(['/home']);
    }

    this.getUsers();

    this.sharedService.users$.subscribe((users: User[]) => {
      this.users = users;
      this.users.forEach((user: User) => {
        this.userService.getUserPfp(user.id).subscribe(response => {
          // Si la respuesta contiene la url (no es el caso, pero está puesto así por escalabilidad,
          // por si en un futuro el back puede devolver imágenes de internet en vez de las que están subidas).
          if (typeof response === 'string') {
            user.profilePicture = response;
          } else {
            // Entra aquí si la imagen ha sido enviada como blob
            const reader = new FileReader();
            reader.onload = () => {
              // setea la mainImage a la url de la imagen (o su representación en base64)
              user.profilePicture = reader.result as string;
            };
            // leemos la response.
            reader.readAsDataURL(response);
            this.cdr.detectChanges();
          }
        })
      })
    })
  }

  getUsers(): void {
    this.userService.getUsers(true).subscribe((data: User[]) => {
      this.sharedService.setUsers(data);
    })
  }

  switchActive(user: User): void {
    this.userService.switchActive(user.id).subscribe({
      next: () => {
        document.defaultView?.location.reload();
      },
      error: (err) => {
        console.error(`Error switching activity of ${user.username}: `, err);
      }
    })
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString()
  }
}