import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IIsUserVerifyResponse,
  IUserProfileResponse,
  IUserOtpConfirmResponse,
  IUserRegisterRequest,
} from '../interfaces/iuser-register-request';
import { Observable, tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:8080/auth/user';
  constructor(private http: HttpClient) {}
  /*****************************for sign Up page ********************************************** */
  verifyUser(data: IUserRegisterRequest): Observable<HttpResponse<IUserProfileResponse>> {
    console.log(`${this.url}/register/init`);

    return this.http.post<IUserProfileResponse>(
      `${this.url}/register/init`,
      data, // ✅ send full object
      {
        observe: 'response',
      },
    );
  }

  /*********************for opt verification ************************************************************ */
  confirmOtp(otp: string): Observable<HttpResponse<IUserOtpConfirmResponse>> {
    return this.http.post<IUserOtpConfirmResponse>(
      `${this.url}/register/confirm`,
      { otp: String(otp) },
      { observe: 'response' },
    );
  }

  /****************************for isUser verification in login page ************************************************** */

  // isVerifyUser(email: string, password: string): Observable<IIsUserVerifyResponse> {
  //   return this.http.post<IIsUserVerifyResponse>(`${this.url}/login`, {
  //     email: email,
  //     password: password,
  //   });

  isVerifyUser(email: string, password: string): Observable<IIsUserVerifyResponse> {
    return this.http.post<IIsUserVerifyResponse>(`${this.url}/login`, {
      email,
      password,
    });
  }
}
