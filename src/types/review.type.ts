import { IParkingLotDetail } from "./parking-lots.type";
import { IShortenUserInformation } from "./user.type";

export interface IReview {
    id: string;
    user: IShortenUserInformation;
    parkingLot: IParkingLotDetail;
    rating: number;
    comment: string;
    created: string;
    updated: string;
    imagesUrls: string | null;
  }
  export interface IReply {
    id: string;
    user: IShortenUserInformation;
    parkingLot: IParkingLotDetail;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    imageUrls: string | null;
  }
  export interface ICreateReplyRequest {
    userId: string;
    reviewId: string;
    imageUrls: string | null;
    comment: string;
  }