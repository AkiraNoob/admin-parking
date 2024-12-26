import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createActivity } from 'src/api/auth/activity/create-activity';
import { postAdminLogin } from 'src/api/auth/login.api';
import PATH_NAME from 'src/configs/path-name';
import { IAuthRequest, IAuthResponse } from 'src/types/auth.types';
import { EUserRole } from 'src/types/user.type';
import { clearCookiesAndLocalStorage } from 'src/utils/auth-helpers';

export default function useLogin(
  props?: UseMutationOptions<IAuthResponse, AxiosError, IAuthRequest>
) {
  const navigate = useNavigate();

  const mutaion = useMutation({
    mutationFn: postAdminLogin,
    ...props,
    onSuccess(data, variables, context) {
      if (data.role !== EUserRole.ADMIN && data.role !== EUserRole.MERCHANT) {
        toast('Tài khoản không có quyền vào trang web này.', {
          type: 'error',
        });
        clearCookiesAndLocalStorage();
        return;
      }

      navigate(PATH_NAME.HomePage);
      if (props?.onSuccess) {
        props.onSuccess(data, variables, context);
      }
      // TODO: temporary do this on fe
      createActivity({
        userId: data.userId,
        content: 'Bạn đã đăng nhập vào hệ thống',
      });
    },
    onError(error) {
      if (error.message === 'Not eligible row.') {
        toast('Tài khoản không có quyền vào trang web này.', {
          type: 'error',
        });
        return;
      }
      toast('Thông tin đăng nhập không đúng.', {
        type: 'error',
      });
    },
  });

  return mutaion;
}
