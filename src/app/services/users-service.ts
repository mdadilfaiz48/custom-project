import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IIsUserVerifyResponse,
  IUserProfileResponse,
  IUserOtpConfirmResponse,
} from '../interfaces/iuser-register-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:8080/auth/user';
  constructor(private http: HttpClient) {}
  /*****************************for sign Up page ********************************************** */
  verifyUser(
    username: string,
    email: string,
    password: string,
  ): Observable<HttpResponse<IUserProfileResponse>> {
    console.log(`${this.url}/register/init`);
    return this.http.post<IUserProfileResponse>(
      `${this.url}/register/init`,

      {
        username: username,
        email: email,
        password: password,
      },
      {
        observe: 'response', // return full response (status + headers + body)
      },
    );
  }
  /*********************for opt verification ************************************************************ */
  confirmOtp(otp: string): Observable<HttpResponse<IUserOtpConfirmResponse>> {
    return this.http.post<IUserOtpConfirmResponse>(
      `${this.url}/register/confirm`,
      {
        otp: otp,
      },
      {
        observe: 'response',
      },
    );
  }
  /****************************for isUser verification in login page ************************************************** */
  isVerifyUser(email: string, password: string): Observable<HttpResponse<IIsUserVerifyResponse>> {
    return this.http.post<IIsUserVerifyResponse>(
      `${this.url}/login`,
      {
        email: email,
        password: password,
      },
      {
        observe: 'response',
      },
    );
  }
}
