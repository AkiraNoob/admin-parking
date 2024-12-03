export interface IAuthResponse {
  userId: string;
  refreshToken: string;
  accessToken: string;
}

export interface IAuthRequest {
  phoneNumber: string;
  password: string;
}
