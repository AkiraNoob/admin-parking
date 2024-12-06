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
