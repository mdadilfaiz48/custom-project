import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UsersService } from '../../services/users-service';
import {
  IUserOtpConfirmRequest,
  IUserRegisterRequest,
} from '../../interfaces/iuser-register-request';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  showOtp = true;

  emailValidation = new FormGroup({
    username: new FormControl('', Validators.required), // no validation
    password: new FormControl('', Validators.required), // no validation

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
  });

  userOtpConfirm: IUserOtpConfirmRequest = {
    otp: '',
  };
  /*************constructor ************************ */
  constructor(
    private userService: UsersService,
    private router: Router,
  ) {}

  /**********************************************************otp Jumb logic******************************************************* */
  handleOtp(event: any, prevInput: HTMLInputElement | null, nextInput: HTMLInputElement | null) {
    const input = event.target;

    // Allow only numbers
    input.value = input.value.replace(/[^0-9]/g, '');

    // Move forward
    if (input.value.length === 1 && nextInput) {
      nextInput.focus();
    }

    // Move backward on backspace
    if (event.key === 'Backspace' && !input.value && prevInput) {
      prevInput.focus();
    }
  }

  /****************************************send Data On onSubmitMethod for signUp page*************************************************** */
  onSubmit() {
    console.log('=============>' + this.emailValidation.value.email);
    console.log('Form submitted');

    console.log(this.emailValidation.value.username);
    console.log(this.emailValidation.value.password);

    this.userService
      .verifyUser(
        this.emailValidation.value.username!,
        this.emailValidation.value.email!,
        this.emailValidation.value.password!,
      )
      .subscribe({
        next: (response) => {
          console.log('Status Code:', response.status);
          console.log('Response Body:', response.body);

          if (response.body) {
            alert(response.body.message); // example field
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Something went wrong');
        },
      });
  }
  /*************************************confirmOtp method call for otp confirm api */
  otpSubmit() {
    this.userService.confirmOtp(this.userOtpConfirm.otp).subscribe({
      next: (response: any) => {
        console.log('OTP Verify Response:', response);

        if (response.message === 'OTP verified successfully. User registered') {
          alert('OTP Verified ✅');

          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      },
      error: (error: any) => {
        console.error('OTP Error:', error);
        alert('Invalid OTP or server error ❌');
      },
    });
  }
}
