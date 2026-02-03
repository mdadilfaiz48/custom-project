import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';

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
    console.log(this.userValidation.value.email);
    console.log(this.userValidation.value.password);

    this.userService
      .isVerifyUser(this.userValidation.value.email!, this.userValidation.value.password!)
      .subscribe({
        next: (response: any) => {
          console.log('Backend Response:', response);

          // Suppose backend sends { message: "Login Success" }
          if (response.message === 'Login Success') {
            alert('Login successful!');
            this.router.navigate(['/home']); // 👈 change route as needed
          } else {
            alert(response.message || 'Invalid credentials');
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Server error. Try again.');
        },
      });
    {
    }
  }
}
