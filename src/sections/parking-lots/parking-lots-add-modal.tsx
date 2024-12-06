import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
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
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { ICreateParkingLotRequest } from 'src/types/parking-lots.type';

export interface IParkingLotsAddModal {
  open: boolean;
  toggle: () => void;
}

const ParkingLotsAddModal = ({ open, toggle }: IParkingLotsAddModal) => {
  const { control } =
    useForm<Omit<ICreateParkingLotRequest, 'longtitude' | 'latitude' | 'ownerId'>>();

  const { data } = useQuery({
    queryKey: ['province_list'],
    queryFn: () =>
      fetch('https://vapi.vnappmob.com/api/province', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        },
      }).then((res) => res.json()) as Promise<{
        results: {
          province_id: number;
          province_name: string;
          province_type: string;
        }[];
      }>,
  });

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={toggle}>
      <Stack
        gap={3}
        sx={{
          padding: '20px',
          maxHeight: '760px',
          overflowY: 'auto',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Add Parking Lot</Typography>
          <IconButton onClick={toggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form>
          <Stack gap={3}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <TextField {...field} fullWidth label="Parking name" />}
            />
            <Controller
              control={control}
              name="address"
              render={({ field }) => <TextField {...field} fullWidth label="Address" />}
            />
            <Controller
              control={control}
              name="openHour"
              render={({ field }) => <TextField {...field} fullWidth label="Opening hour" />}
            />
            <Controller
              control={control}
              name="closeHour"
              render={({ field }) => <TextField {...field} fullWidth label="Closing hour" />}
            />
            <Controller
              control={control}
              name="provinceId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="province-select-label">Province</InputLabel>
                  <Select
                    {...field}
                    labelId="province-select-label"
                    id="province-select"
                    label="Province"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="districtId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="district-select-label">District</InputLabel>
                  <Select
                    {...field}
                    labelId="district-select-label"
                    id="district-select"
                    label="District"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="wardId"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="ward-select-label">Ward</InputLabel>
                  <Select {...field} labelId="ward-select-label" id="ward-select" label="Ward">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="wardId"
              render={({ field }) => <TextField {...field} type="input" fullWidth label="File" />}
            />
          </Stack>
        </form>
        <Box justifyContent="end" display="flex">
          <Button variant="contained">Add</Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default ParkingLotsAddModal;
