import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postSignUp } from 'src/api/auth/sign-up.api';
import { Iconify } from 'src/components/iconify/iconify';
import { EUserRole, ICreateUserRequest, IUserInformation } from 'src/types/user.type';
import { EUserInfoKey } from 'src/utils/auth-helpers';
import { checkNullish } from 'src/utils/check-variable';

export interface IUserAddModal {
  open: boolean;
  toggle: () => void;
  initialData?: Partial<ICreateUserRequest>;
  title: string;
  onSuccess?: () => void;
}

const UserAddModal = ({
  open,
  toggle,
  initialData,
  title = 'Thêm nhân viên',
  onSuccess,
}: IUserAddModal) => {
  const { control, handleSubmit } = useForm<ICreateUserRequest>({
    defaultValues: initialData,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { parkingId } = useParams();

  const { mutate, isPending } = useMutation<IUserInformation, AxiosError, ICreateUserRequest>({
    mutationFn: postSignUp,
    onSuccess() {
      if (onSuccess) {
        onSuccess();
      }
      toggle();
    },
    onError(error) {
      toast((error.response?.data as string) || 'Có lỗi xảy ra', {
        type: 'error',
      });
    },
  });

  const availableRoles =
    checkNullish(localStorage.getItem(EUserInfoKey.Role)) === EUserRole.ADMIN
      ? [EUserRole.STAFF, EUserRole.MERCHANT]
      : [EUserRole.STAFF];

  const onSubmit = (data: ICreateUserRequest) => {
    if (data.role === EUserRole.STAFF) {
      mutate({
        ...data,
        merchantId: checkNullish(localStorage.getItem(EUserInfoKey.UserId)),
        parkingLotId: parkingId as string,
      });
      return;
    }
    mutate(data);
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={toggle}>
      <Stack
        gap={3}
        sx={{
          padding: '20px',
          maxHeight: '760px',
          overflowY: 'auto',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">{title}</Typography>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack gap={3}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => <TextField {...field} fullWidth label="Họ và tên" />}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => <TextField {...field} fullWidth label="Email" />}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => <TextField {...field} fullWidth label="Số điện thoại" />}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Phân quyền</InputLabel>
                <Select {...field} labelId="role-select-label" id="role-select" label="Role">
                  {availableRoles.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Stack>
        <Box justifyContent="end" display="flex">
          <LoadingButton loading={isPending} type="submit" variant="contained">
            Thêm
          </LoadingButton>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default UserAddModal;
