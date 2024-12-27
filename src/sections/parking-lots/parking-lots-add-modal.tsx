import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { getCoordinateByAddress } from 'src/api/openCageGeoCodingRequest';
import { createParkingLot } from 'src/api/parking-lot/create-parking-lot';
import useAddress from 'src/hooks/use-address';
import { ICreateParkingLotRequest } from 'src/types/parking-lots.type';
import { EUserInfoKey } from 'src/utils/auth-helpers';
import { checkNullish } from 'src/utils/check-variable';

export interface IParkingLotsAddModal {
  open: boolean;
  toggle: () => void;
}

const ParkingLotsAddModal = ({ open, toggle }: IParkingLotsAddModal) => {
  const { control, handleSubmit, watch } = useForm<
    Omit<ICreateParkingLotRequest, 'longtitude' | 'latitude' | 'ownerId'>
  >({
    defaultValues: {
      openHour: dayjs('07:00:00 07/12/2024').toISOString(),
      closeHour: dayjs('23:00:00 07/12/2024').toISOString(),
    },
  });

  const { ref: provinceRef, inView: inViewProvince } = useInView();
  const { ref: districtRef, inView: inViewDistrict } = useInView();
  const { ref: wardRef, inView: inViewWard } = useInView();

  const { provinceQueryReturn, districtQueryReturn, wardQueryReturn } = useAddress({
    provinceId: watch('provinceId'),
    districtId: watch('districtId'),
  });

  useEffect(() => {
    if (inViewProvince && !provinceQueryReturn.isFetching && provinceQueryReturn.hasNextPage) {
      provinceQueryReturn.fetchNextPage();
    }
  }, [inViewProvince, provinceQueryReturn]);

  useEffect(() => {
    if (inViewDistrict && !districtQueryReturn.isFetching && districtQueryReturn.hasNextPage) {
      districtQueryReturn.fetchNextPage();
    }
  }, [inViewDistrict, districtQueryReturn]);

  useEffect(() => {
    if (inViewWard && !wardQueryReturn.isFetching && wardQueryReturn.hasNextPage) {
      wardQueryReturn.fetchNextPage();
    }
  }, [inViewWard, wardQueryReturn]);

  const { mutate, isPending } = useMutation({
    mutationFn: createParkingLot,
  });

  const queryClient = useQueryClient();
  const { mutateAsync: getCoordinate } = useMutation({
    mutationFn: getCoordinateByAddress,
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['parking_lots'],
        active: true,
      });
      toggle();
    },
  });

  const submit = async (
    data: Omit<ICreateParkingLotRequest, 'longtitude' | 'latitude' | 'ownerId'>
  ) => {
    try {
      const { lat, lng } = await getCoordinate(data.address);

      mutate({
        ...data,
        ownerId: checkNullish(localStorage.getItem(EUserInfoKey.UserId)),
        openHour: dayjs(data.openHour).format('HH:mm:ss'),
        closeHour: dayjs(data.closeHour).format('HH:mm:ss'),
        longitude: lng,
        latitude: lat,
      });
    } catch (error) {
      toast(error?.message || 'Có lỗi xảy ra', {
        type: 'error',
      });
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={toggle}>
      <form onSubmit={handleSubmit(submit)}>
        <Stack
          gap={3}
          sx={{
            padding: '20px',
            maxHeight: '760px',
            overflowY: 'auto',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h4">Thêm bãi xe</Typography>
            <IconButton onClick={toggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack gap={3}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Trường này không được để trống',
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  label="Tên bãi xe *"
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              rules={{
                required: 'Trường này không được để trống',
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  label="Địa chỉ *"
                />
              )}
            />

            <Controller
              control={control}
              name="openHour"
              rules={{
                required: 'Trường này không được để trống',
              }}
              render={({ field, fieldState: { error } }) => (
                <TimeField
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue?.toISOString())}
                  label="Giờ mở cửa *"
                  format="HH:mm:ss"
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      error: !!error,
                    },
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="closeHour"
              rules={{
                required: 'Trường này không được để trống',
              }}
              render={({ field, fieldState: { error } }) => (
                <TimeField
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(newValue) => field.onChange(newValue?.toISOString())}
                  label="Giờ đóng cửa *"
                  format="HH:mm:ss"
                  slotProps={{
                    textField: {
                      helperText: error?.message,
                      error: !!error,
                    },
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="provinceId"
              rules={{
                required: 'Trường này không được để trống',
              }}
              render={({ field, fieldState: { error } }) => (
                <FormControl fullWidth error={!!error}>
                  <InputLabel filled id="province-select-label">
                    Tỉnh / Thành phố TW *
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="province-select-label"
                    id="province-select"
                    label="Province"
                    defaultValue=""
                  >
                    {provinceQueryReturn.data?.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        {...(index === provinceQueryReturn.data.length - 1 &&
                          !provinceQueryReturn.isFetching &&
                          provinceQueryReturn.hasNextPage && {
                            ref: provinceRef,
                          })}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : <></>}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="districtId"
              rules={{
                required: 'Trường này không được để trống',
              }}
              render={({ field, fieldState: { error } }) => (
                <FormControl disabled={!watch('provinceId')} fullWidth error={!!error}>
                  <InputLabel id="district-select-label">Quận / Huyện / Thành phố *</InputLabel>
                  <Select
                    {...field}
                    labelId="district-select-label"
                    id="district-select"
                    label="district"
                    defaultValue=""
                  >
                    {districtQueryReturn.data?.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        {...(index === districtQueryReturn.data.length - 1 &&
                          !districtQueryReturn.isFetching &&
                          districtQueryReturn.hasNextPage && {
                            ref: districtRef,
                          })}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : <></>}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="wardId"
              rules={{
                required: 'Trường này không được để trống',
              }}
              render={({ field, fieldState: { error } }) => (
                <FormControl
                  disabled={!watch('districtId') || !watch('provinceId')}
                  fullWidth
                  error={!!error}
                >
                  <InputLabel id="ward-select-label">Phường / Xã *</InputLabel>
                  <Select
                    {...field}
                    labelId="ward-select-label"
                    id="ward-select"
                    label="ward"
                    defaultValue=""
                  >
                    {wardQueryReturn.data?.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        {...(index === wardQueryReturn.data.length - 1 &&
                          !wardQueryReturn.isFetching &&
                          wardQueryReturn.hasNextPage && {
                            ref: wardRef,
                          })}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {error?.message ? <FormHelperText>{error?.message}</FormHelperText> : <></>}
                </FormControl>
              )}
            />
          </Stack>
          <Box justifyContent="end" display="flex">
            <LoadingButton
              loading={isPending}
              fullWidth
              type="submit"
              color="inherit"
              variant="contained"
            >
              Tạo
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </Dialog>
  );
};

export default ParkingLotsAddModal;
