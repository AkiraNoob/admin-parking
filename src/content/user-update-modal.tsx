import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, Dialog, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { updateUser } from 'src/api/user/update-user.api';
import { IShortenUserInformation } from 'src/types/user.type';

export interface IUserUpdateModal {
  open: boolean;
  toggle: () => void;
  initialData: Partial<IShortenUserInformation>;
  title: string;
}

const UserUpdateModal = ({
  open,
  toggle,
  initialData,
  title = 'Sửa thông tin nhân viên',
}: IUserUpdateModal) => {
  const { control, handleSubmit } = useForm<IShortenUserInformation>({
    defaultValues: initialData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess() {
      toggle();
    },
  });

  const onSubmit = (data: IShortenUserInformation) => mutate(data);

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
            disabled
            name="phoneNumber"
            render={({ field }) => (
              <TextField {...field} disabled fullWidth label="Số điện thoại" />
            )}
          />
        </Stack>
        <Box justifyContent="end" display="flex">
          <LoadingButton loading={isPending} type="submit" variant="contained">
            Lưu
          </LoadingButton>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default UserUpdateModal;
