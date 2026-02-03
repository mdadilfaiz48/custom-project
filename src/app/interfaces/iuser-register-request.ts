export interface IUserRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface IUserProfileResponse {
  message: string;
}

export interface IUserOtpConfirmRequest {
  otp: string;
}

export interface IUserOtpConfirmResponse {
  message: string;
}
export interface IIsUerVerifyRequest {
  email: string;
  password: string;
}

export interface IIsUserVerifyResponse {
  message: string;
}
