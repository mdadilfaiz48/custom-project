import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { IUserRegisterRequest } from '../../interfaces/iuser-register-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp implements OnInit {
  showOtp = true;
  /**************************validation form group************************************** */
  emailValidation = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),

    // ✅ Hidden Fields
    browserName: new FormControl(''),
    ipAddress: new FormControl(''),
    deviceType: new FormControl(''),
    location: new FormControl(''),
  });
  /****************************************constructors****************************************************** */
  constructor(
    private userService: UsersService,
    private router: Router,
  ) {}
  /*********************************ngOnInit************************************************************************* */
  ngOnInit(): void {
    const userAgent = navigator.userAgent;

    // ✅ Browser & Device
    this.emailValidation.patchValue({
      browserName: this.getBrowserName(),
      deviceType: /Mobil|Android/i.test(userAgent) ? 'Mobile' : 'Desktop',
    });

    this.getPublicIP(); // ✅ Call here

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log('Lat:', latitude);
          console.log('Lng:', longitude);

          // ✅ Convert Lat/Lng to Address
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.address.city || data.address.town || data.address.village || '';

              const state = data.address.state || '';
              const country = data.address.country || '';

              const fullLocation = `${city}, ${state}, ${country}`;

              this.emailValidation.patchValue({
                location: fullLocation,
              });

              console.log('Exact Location:', fullLocation);
            })
            .catch((error) => {
              console.error('Reverse geocoding error:', error);
            });
        },
        (error) => {
          console.error('Location error:', error);
        },
      );
    }
  }
  /****************************BrowereName***************************************************** */
  getBrowserName(): string {
    const agent = navigator.userAgent;

    if (agent.includes('Chrome')) return 'Chrome';
    if (agent.includes('Firefox')) return 'Firefox';
    if (agent.includes('Safari')) return 'Safari';

    return 'Unknown';
  }
  /*********************************onSumbit method****************************************************** */
  onSubmit(): void {
    console.log('FULL FORM DATA:', this.emailValidation.value);

    const requestData = this.emailValidation.value as IUserRegisterRequest;

    this.userService.verifyUser(requestData).subscribe({
      next: (response) => {
        console.log('Status Code:', response.status);
        console.log('Response Body:', response.body);
        if (response.body) {
          alert(response.body.message);
        }
        // ✅ Navigate to OTP page after success
        this.router.navigate(['/otp']);
      },
      error: (error) => {
        alert('something went wrong');
      },
    });
  }

  getPublicIP(): void {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        this.emailValidation.patchValue({
          ipAddress: data.ip,
        });

        console.log('IP Captured:', data.ip);
      })
      .catch((error) => {
        console.error('IP fetch error:', error);
      });
  }
}
