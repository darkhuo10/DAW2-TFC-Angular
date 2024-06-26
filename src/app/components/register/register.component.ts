import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  errorMessage = '';
  maxDate!: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(99)]],
      surname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(99)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(99)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(99)]],
      rpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(99)]],
      bdate: ['', Validators.required]
    });
    
    let now = new Date();
    now.setFullYear(now.getFullYear() - 18);
    this.maxDate = now.toISOString().split('T')[0];

    localStorage.setItem('token', '');
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const UserDtoCreate = {
      name: this.registerForm.get('name')!.value,
      surname: this.registerForm.get('surname')!.value,
      username: this.registerForm.get('username')!.value,
      email: this.registerForm.get('email')!.value,
      password: this.registerForm.get('password')!.value,
      repeatPassword: this.registerForm.get('rpassword')!.value,
      birthdate: this.registerForm.get('bdate')!.value
    };

    this.http.post('http://localhost:80/register', UserDtoCreate).subscribe(
      (response: any) => {
        this.loading = false;
        // Guardamos el token
        localStorage.setItem('token', response.token);

        // Esto se asegura de que el token se actualice debidamente.
        // Sin esto, si antes habías iniciado sesión, se te carga con el token anterior la primera vez 
        // y tienes que refrescar para que te cargue el token nuevo.
        this.authService.loadCurrentUser();

        this.router.navigate(['/home']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Register failed.';
      }
    );
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}