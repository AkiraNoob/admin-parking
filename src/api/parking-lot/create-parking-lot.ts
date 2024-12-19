import { httpRequest } from '../httpRequest';

export const createParkingLot = (data: FormData) =>
  httpRequest.post(`/api/parking-lots`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
