import Button from '@mui/material/Button';
import { Iconify } from 'src/components/iconify';
import useToggle from 'src/hooks/use-toggle';
import ParkingLotsAddModal from './parking-lots-add-modal';

const ParkingLotsAddButton = () => {
  const [open, toggle] = useToggle();
  return (
    <>
      <Button
        onClick={toggle}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        New parking lot
      </Button>
      {open && <ParkingLotsAddModal open={open} toggle={toggle} />}
    </>
  );
};

export default ParkingLotsAddButton;
