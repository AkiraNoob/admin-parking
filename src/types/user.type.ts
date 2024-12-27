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
  merchantId?: string; // optional;
  parkingLotId?: string;
}

export enum EUserStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export interface IUserInformation {
  id: number;
  name: string;
  phoneNumber: string;
  parkingLotId: number | null;
  merchant: IUserInformation | null;
  email: string;
  status: EUserStatus;
  role: {
    id: number;
    name: EUserRole;
  };
}

export interface IShortenUserInformation {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  status: EUserStatus;
}
