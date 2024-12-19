import { EUserRole } from './user.type';

export interface IAuthResponse {
  userId: string;
  refreshToken: string;
  accessToken: string;
  role: EUserRole;
}

export interface IAuthRequest {
  phoneNumber: string;
  password: string;
}
