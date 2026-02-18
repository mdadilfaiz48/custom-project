export interface IUserRegisterRequest {
  username: string;
  email: string;
  password: string;
  browserName: string;
  ipAddress: string;
  deviceType: string;
  location: string;
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
  expireTime: number;
  jwtToken: string;
}
