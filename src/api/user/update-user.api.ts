import { EUserStatus, IShortenUserInformation } from 'src/types/user.type';
import { httpRequest } from '../httpRequest';

export const updateUser = (body: { status: EUserStatus; name: string; id: number }) => {
  const { id, ...updateData } = body;
  return httpRequest.patch<IShortenUserInformation>(`/users/${id}`, updateData);
};
