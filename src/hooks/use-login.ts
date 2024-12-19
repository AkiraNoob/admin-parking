import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postAdminLogin } from 'src/api/auth/login.api';
import PATH_NAME from 'src/configs/path-name';
import { IAuthRequest, IAuthResponse } from 'src/types/auth.types';

export default function useLogin(
  props?: UseMutationOptions<IAuthResponse, AxiosError, IAuthRequest>
) {
  const navigate = useNavigate();

  const mutaion = useMutation({
    mutationFn: postAdminLogin,
    ...props,
    onSuccess(data, variables, context) {
      navigate(PATH_NAME.HomePage);
      if (props?.onSuccess) {
        props.onSuccess(data, variables, context);
      }
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
