import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { subscribe } from 'node:diagnostics_channel';
import { IIsUserVerifyResponse } from '../../interfaces/iuser-register-request';
import { IIsUerVerifyRequest } from '../../interfaces/iuser-register-request';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userValidation = new FormGroup({
    password: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
  });

  constructor(
    private userService: UsersService,
    private router: Router,
  ) {}

  onSubmit() {
    const email = this.userValidation.controls.email.value!;
    const password = this.userValidation.controls.password.value!;

    this.userService.isVerifyUser(email, password).subscribe({
      next: (response: IIsUserVerifyResponse) => {
        if (response.message === 'Login successful') {
          alert('login successful');
          // Store JWT
          sessionStorage.setItem('token', response.jwtToken);

          // Redirect to Home page
          this.router.navigate(['/home']);
        } else {
          alert(response.message || 'Invalid credentials');
        }
      },
      error: (error) => {
        console.error('Login error', error);
        alert('Server error. Try again.');
      },
    });
  }
}
