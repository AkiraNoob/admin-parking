import { IReply } from "src/types/review.type";
import { httpRequest } from '../httpRequest';

export const getReplies = (reviewId: string) =>
  httpRequest.get<IReply[]>(`/api/replies/reviews/${reviewId}`);
