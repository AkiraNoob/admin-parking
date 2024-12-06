import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
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
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { postSignUp } from 'src/api/auth/sign-up.api';
import { Iconify } from 'src/components/iconify/iconify';
import { EUserRole, ICreateUserRequest } from 'src/types/user.type';

export interface IUserAddModal {
  open: boolean;
  toggle: () => void;
  initialData?: Partial<ICreateUserRequest>;
}

const UserAddModal = ({ open, toggle, initialData }: IUserAddModal) => {
  const { control, handleSubmit } = useForm<ICreateUserRequest>({
    defaultValues: initialData,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation({
    mutationFn: postSignUp,
  });

  const onSubmit = (data: ICreateUserRequest) => mutate(data);

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
          <Typography variant="h4">Add User</Typography>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack gap={3}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => <TextField {...field} fullWidth label="Full name" />}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => <TextField {...field} fullWidth label="Email" />}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => <TextField {...field} fullWidth label="Phone number" />}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
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
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select {...field} labelId="role-select-label" id="role-select" label="Role">
                  {Object.values(EUserRole).map((item) => (
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
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default UserAddModal;
