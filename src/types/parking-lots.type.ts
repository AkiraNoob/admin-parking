import { IUserInformation } from './user.type';

export interface ICreateParkingLotRequest {
  name: string;
  address: string;
  longtitude: string;
  latitude: string;
  openHour: string;
  closeHour: string;
  ownerId: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  imageFiles: File;
}

export interface IParkingLotDetail {
  id: number;
  ownerId: number;
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  wardId: string;
  wardName: string;
  name: string;
  address: string;
  capacity: string;
  latitude: number;
  longitude: number;
  openHour: string;
  closeHour: string;
  status: EParkingLotStatus;
  images: string[];
  owner?: IUserInformation;
}

export enum EParkingLotStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum EVehicleType {
  CAR = 'CAR',
}

export interface IAddVehicleTypeToParkingLot {
  parkingLotId: number;
  type: EVehicleType;
  price: number;
}

export interface IAddVehicleTypeResponse {
  id: number;
  parkingLotId: number;
  type: EVehicleType;
  price: number;
}

export interface IAddParkingSlotRequest {
  vehicleTypeId: number;
  quantity: number;
  parkingLotId: number;
}

export interface IAddParkingSlotResponse {
  id: number;
  parkingLotId: number;
  type: EVehicleType;
  price: number;
  totalSlots: number;
  activeSlots: number;
}

export interface IGetVehicleTypesResponse {
  parkingLotId: number;
  price: number;
  type: EVehicleType;
  parkingSlotId: number;
  totalSlots: number;
  activeSlots: number;
}

export interface IGetParkingLotDetailResponse {
  id: number;
  ownerId: number;
  provinceId: string;
  provinceName: string;
  districtId: string;
  districtName: string;
  wardId: string;
  wardName: string;
  name: string;
  address: string;
  capacity: number;
  latitude: number;
  longitude: number;
  openHour: string;
  closeHour: string;
  status: EParkingLotStatus;
  imageUrls: string[] | null;
  owner: {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    status: string;
  };
  vehicles: {
    parkingLotId: number;
    price: number;
    type: EVehicleType;
    parkingSlotId: number;
    totalSlots: number;
    activeSlots: number;
  }[];
}

