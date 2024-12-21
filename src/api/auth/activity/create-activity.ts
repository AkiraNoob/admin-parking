import { httpRequest } from "src/api/httpRequest";
import { ICreateActivityRequest } from "src/types/activity";

export const createActivity = (data: ICreateActivityRequest) =>
  httpRequest.post(`/activities`, data);
