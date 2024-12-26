import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import VehicleAddModal from 'src/content/vehicle-add-modal';
import useToggle from 'src/hooks/use-toggle';

const ParkingLotAddVehicle = () => {
  const { parkingId } = useParams();
  const [open, toggle] = useToggle();

  return (
    <>
      <Box>
        <Button onClick={toggle} variant="contained">
          Thêm loại xe
        </Button>
      </Box>
      {open && (
        <VehicleAddModal open={open} toggle={toggle} parkingLotId={parseInt(parkingId as string)} />
      )}
    </>
  );
};

export default ParkingLotAddVehicle;
