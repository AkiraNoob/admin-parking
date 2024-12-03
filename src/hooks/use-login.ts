import { AxiosError } from 'axios';
import { UseMutationOptions, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
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
      navigate(PATH_NAME.SignIn);
      if (props?.onSuccess) {
        props.onSuccess(data, variables, context);
      }
    },
  });

  return mutaion;
}
