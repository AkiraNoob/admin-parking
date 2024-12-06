import Button from '@mui/material/Button';
import { Iconify } from 'src/components/iconify';
import useToggle from 'src/hooks/use-toggle';
import { EUserRole } from 'src/types/user.type';
import UserAddModal from '../../content/user-add-modal';

const ParkingLotAddEmployeeButton = () => {
  const [open, toggle] = useToggle();
  return (
    <>
      <Button
        onClick={toggle}
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        New employee
      </Button>
      <UserAddModal
        open={open}
        toggle={toggle}
        initialData={{
          role: EUserRole.STAFF,
        }}
      />
    </>
  );
};

export default ParkingLotAddEmployeeButton;
