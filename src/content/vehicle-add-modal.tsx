import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { addParkingSlot } from 'src/api/parking-lot/add-parking-slot';
import { addVehicleType } from 'src/api/parking-lot/add-vehicle-type';
import {
  EVehicleType,
  IAddParkingSlotRequest,
  IAddVehicleTypeToParkingLot,
} from 'src/types/parking-lots.type';

export interface IVehicalAddModal {
  open: boolean;
  toggle: () => void;
  parkingLotId: number;
}

interface IForm
  extends Omit<IAddVehicleTypeToParkingLot, 'parkingLotId'>,
    Omit<IAddParkingSlotRequest, 'vehicleTypeId' | 'parkingLotId'> {}

const VehicleAddModal = ({ open, toggle, parkingLotId }: IVehicalAddModal) => {
  const { control, handleSubmit } = useForm<IForm>({
    defaultValues: {
      type: EVehicleType.BICYCLE,
    },
  });

  const { mutate, isPending } = useMutation<void, AxiosError, IForm>({
    mutationFn: async (data: IForm) => {
      const res = await addVehicleType({
        parkingLotId,
        type: data.type,
        price: data.price,
      });

      await addParkingSlot({
        vehicleTypeId: res.id,
        parkingLotId,
        quantity: data.quantity,
      });
    },
    onSuccess() {
      toggle();
    },
    onError() {
      toast('Có lỗi xảy ra, vui lòng kiểm ra lại thông tin và thử lại.', {
        type: 'error',
      });
    },
  });

  const onSubmit = (data: IForm) => mutate(data);

  return (
    <Dialog open={open} onClose={toggle} fullWidth maxWidth="md">
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
          <Typography variant="h4">Thêm loại xe mới</Typography>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack gap={3}>
          <Controller
            control={control}
            name="quantity"
            render={({ field }) => <TextField {...field} fullWidth label="Số lượng" />}
          />
          <Controller
            control={control}
            name="price"
            render={({ field }) => <TextField {...field} fullWidth label="Giá tiền" />}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Loại xe</InputLabel>
                <Select {...field} labelId="role-select-label" id="role-select" label="Role">
                  {Object.values(EVehicleType).map((item) => (
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

export default VehicleAddModal;
