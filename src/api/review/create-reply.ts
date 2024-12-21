
import { ICreateReplyRequest, IReply } from 'src/types/review.type';
import { httpRequest } from '../httpRequest';

export const createReply = (payload: ICreateReplyRequest) =>
  httpRequest.post<IReply[]>(`/api/replies`, payload);
