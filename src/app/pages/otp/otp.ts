import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users-service';

import { Router } from '@angular/router';
import {
  IUserOtpConfirmRequest,
  IUserOtpConfirmResponse,
} from '../../interfaces/iuser-register-request';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {
  otpForm: FormGroup;
  userOtpConfirm: IUserOtpConfirmRequest = {
    otp: '',
  };

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
  ) {
    this.otpForm = this.fb.group({
      d1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      d4: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  /**********************************************************otp Jumb logic******************************************************* */

  moveFocus(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (input.value && index < 4) {
      const next = document.querySelector<HTMLInputElement>(`input[formControlName=d${index + 1}]`);
      next?.focus();
    }

    if (event.key === 'Backspace' && index > 1 && !input.value) {
      const prev = document.querySelector<HTMLInputElement>(`input[formControlName=d${index - 1}]`);
      prev?.focus();
    }
  }
  /*************************************confirmOtp method call for otp confirm api */
  onSubmit() {
    console.log('Form Values:', this.otpForm.value.otp);

    // Combine 4 digits into one OTP string
    const otp =
      this.otpForm.value.d1 + this.otpForm.value.d2 + this.otpForm.value.d3 + this.otpForm.value.d4;

    console.log('otp======', otp);

    this.userService.confirmOtp(otp).subscribe({
      next: (response) => {
        console.log('OTP Verify Response:', response);
        const message = response.body?.message;

        if (message === 'OTP verified successfully. User registered.') {
          alert('OTP Verified ✅');
          this.router.navigate(['/login']);
        } else {
          alert(message);
        }
      },
      error: (error: any) => {
        console.error('OTP Error:', error);
        alert('Invalid OTP or server error ❌');
      },
    });
  }
}
