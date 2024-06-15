import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(99)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(99)]]
    });
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

        this.router.navigate(['/home']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Login failed.';
      }
    );
  }

  goToRegister(): void {
    localStorage.setItem('token', '');
    this.router.navigate(['/register']);
  }
}