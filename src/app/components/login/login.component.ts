import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(99)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(99)]]
    });
    localStorage.setItem('token', '');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const UserDtoLogin = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value
    };

    this.http.post('http://localhost:80/login', UserDtoLogin).subscribe(
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
        this.errorMessage = 'Login failed.';
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}