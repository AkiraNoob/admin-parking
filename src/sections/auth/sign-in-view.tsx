import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Controller, useForm } from 'react-hook-form';
import { Iconify } from 'src/components/iconify';
import useLogin from 'src/hooks/use-login';
import { IAuthRequest } from 'src/types/auth.types';

// ----------------------------------------------------------------------

export function SignInView() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();

  const { handleSubmit, control } = useForm<IAuthRequest>({
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit = (data: IAuthRequest) => mutate(data);

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                InputLabelProps={{ shrink: true }}
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
                sx={{ mb: 3 }}
              />
            )}
          />

          <LoadingButton
            loading={isPending}
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
          >
            Sign in
          </LoadingButton>
        </Box>
      </form>
    </>
  );
}
