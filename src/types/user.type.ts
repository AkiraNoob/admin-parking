export enum EUserRole {
  ADMIN = 'ADMIN',
  MERCHANT = 'MERCHANT',
  USER = 'USER',
  STAFF = 'STAFF',
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: EUserRole; // ADMIN || MERCHANT || USER || STAFF (not restrict )
  merchantId?: string; // optional
}

export enum EUserStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export interface IUserInformation {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  status: EUserStatus;
}
